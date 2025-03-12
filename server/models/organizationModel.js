const db = require('../config/db');

const Organization = {
    // ✅ Retrieve All Organizations
    getAllOrganizations: (callback) => {
        const query = `
            SELECT 
                o.org_ID AS OrgNo,
                o.org_name AS Name,
                r.rep_name AS Representative,  -- ✅ Now using rep_name directly
                s.Status AS OrganizationStatus
            FROM organization o
            JOIN representative r ON o.Rep_ID = r.rep_ID  -- ✅ Link to representative
            JOIN status s ON o.org_statusID = s.StatusID
            WHERE s.StatusType = 'Organization';
        `;
        db.query(query, (err, results) => {
            if (err) return callback(err, null);
            callback(null, results);
        });
    },

    // ✅ Update Organization Status
    updateStatus: (orgID, statusID, callback) => {
        const query = "UPDATE organization SET org_statusID = ? WHERE org_ID = ?";
        db.query(query, [statusID, orgID], (err, result) => {
            if (err) return callback(err, null);
            callback(null, result);
        });
    },

    // ✅ Register a New Organization (Without Contact & Email)
    addOrganization: (orgData, callback) => {
        const { orgName, repName, islandID, establishedOn } = orgData;
        const statusID = 4; // ✅ Default to "Pending Organization"

        db.beginTransaction((err) => {
            if (err) return callback(err, null);

            // ✅ Insert Representative Directly
            const repQuery = `INSERT INTO representative (rep_name, effectiveDate) VALUES (?, NOW())`;
            db.query(repQuery, [repName], (err, result) => {
                if (err) return db.rollback(() => callback(err, null));

                const repID = result.insertId; // ✅ Get new representative ID

                // ✅ Insert Organization
                const orgQuery = `
                    INSERT INTO organization (org_name, Rep_ID, Island_ID, org_statusID, org_establishedOn, Org_registerDate)
                    VALUES (?, ?, ?, ?, ?, NOW());
                `;
                db.query(orgQuery, [orgName, repID, islandID, statusID, establishedOn], (err, result) => {
                    if (err) return db.rollback(() => callback(err, null));

                    db.commit((err) => {
                        if (err) return db.rollback(() => callback(err, null));

                        callback(null, { message: "Organization registered successfully", orgID: result.insertId });
                    });
                });
            });
        });
    }
};

module.exports = Organization;
