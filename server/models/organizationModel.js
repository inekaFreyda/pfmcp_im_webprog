const db = require('../config/db');

const Organization = {
    // ✅ Retrieve All Organizations
    getAllOrganizations: (callback) => {
        const query = `
            SELECT 
                o.org_ID AS OrgNo,
                o.org_name AS Name,
                r.rep_name AS Representative,  
                r.rep_contactNo AS Contact,  -- ✅ Added contact
                r.rep_email AS Email,        -- ✅ Added email
                s.Status AS OrganizationStatus
            FROM organization o
            JOIN representative r ON o.Rep_ID = r.rep_ID  
            JOIN status s ON o.org_statusID = s.StatusID
            WHERE s.StatusType = 'Organization';
        `;
        db.query(query, (err, results) => {
            if (err) return callback(err, null);
            callback(null, results);
        });
    },

    getOrganizationById: (orgID, callback) => {
        const query = `
            SELECT 
                o.org_ID AS OrgNo,
                o.org_name AS Name,
                r.rep_name AS Representative,
                i.Island_Name AS Island,
                o.org_establishedOn AS EstablishedOn,
                r.rep_contactNo AS Contact,
                r.rep_email AS Email,
                s.Status AS OrganizationStatus,
                (SELECT COUNT(m.mem_ID) FROM member m WHERE m.org_ID = o.org_ID) AS NumberOfMembers
            FROM organization o
            JOIN representative r ON o.Rep_ID = r.rep_ID
            JOIN island i ON o.Island_ID = i.Island_ID
            JOIN status s ON o.org_statusID = s.StatusID
            WHERE o.org_ID = ?;
        `;

        db.query(query, [orgID], (err, results) => {
            if (err) {
                console.error("Database error:", err);
                return callback(err, null);
            }

            callback(null, results.length ? results[0] : null);
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

    // ✅ Register a New Organization (With Contact & Email)
    addOrganization: (orgData, callback) => {
        const { orgName, repName, repContact, repEmail, islandID, establishedOn } = orgData;
        const statusID = 4; // ✅ Default to "Pending Organization"

        db.beginTransaction((err) => {
            if (err) return callback(err, null);

            // ✅ Insert Representative with Contact & Email
            const repQuery = `INSERT INTO representative (rep_name, rep_contactNo, rep_email, effectiveDate) VALUES (?, ?, ?, NOW())`;
            db.query(repQuery, [repName, repContact, repEmail], (err, result) => {
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
