const db = require('../config/db');

const Member = {
    getAllMembers: (callback) => {
        const query = `
            SELECT 
                m.mem_ID AS MemberNo,
                CONCAT(p.person_firstname, ' ', p.person_middlename, ' ', p.person_surname) AS Name,
                COALESCE(o.org_name, 'N/A') AS Organization,  -- ✅ Show 'N/A' if no organization
                c.contactNo AS ContactNo,
                c.email AS Email,
                s.Status AS MemberStatus
            FROM member m
            JOIN person p ON m.person_ID = p.person_ID
            LEFT JOIN organization o ON m.org_ID = o.org_ID -- ✅ Allow members with no org
            JOIN contact c ON p.person_ID = c.person_ID
            JOIN status s ON m.mem_statusID = s.StatusID
            WHERE s.StatusType = 'Member';
        `;
        db.query(query, (err, results) => {
            if (err) return callback(err, null);
            callback(null, results);
        });
    },

    addMember: (memberData, callback) => {
        const { firstname, middlename, surname, birthdate, barangay, address, contact, email, occupation, priesthood, organization, memberStatus } = memberData;
    
        db.beginTransaction((err) => {
            if (err) return callback(err, null);
    
            const personQuery = `INSERT INTO person (person_firstname, person_middlename, person_surname, birthdate) VALUES (?, ?, ?, ?)`;
            console.log("Executing Query:", personQuery, [firstname, middlename, surname, birthdate]);
    
            db.query(personQuery, [firstname, middlename, surname, birthdate], (err, result) => {
                if (err) {
                    console.error("Error inserting into person:", err);
                    return db.rollback(() => callback(err, null));
                }
    
                const personID = result.insertId;
                console.log("Inserted Person ID:", personID);
    
                const addressQuery = `INSERT INTO address (Barangay_ID, Description, person_ID) VALUES (?, ?, ?)`;
                console.log("Executing Query:", addressQuery, [barangay, address, personID]);
    
                db.query(addressQuery, [barangay, address, personID], (err) => {
                    if (err) return db.rollback(() => callback(err, null));
    
                    const contactQuery = `INSERT INTO contact (contactNo, email, person_ID) VALUES (?, ?, ?)`;
                    console.log("Executing Query:", contactQuery, [contact, email, personID]);
    
                    db.query(contactQuery, [contact, email, personID], (err) => {
                        if (err) return db.rollback(() => callback(err, null));
    
                        const occupationQuery = `INSERT INTO occupation (Person_ID, OccupationName) VALUES (?, ?)`;
                        console.log("Executing Query:", occupationQuery, [personID, occupation]);
    
                        db.query(occupationQuery, [personID, occupation], (err) => {
                            if (err) return db.rollback(() => callback(err, null));
    
                            const priesthoodQuery = `INSERT INTO priesthood (Person_ID, priesthood_name) VALUES (?, ?)`;
                            console.log("Executing Query:", priesthoodQuery, [personID, priesthood]);
    
                            db.query(priesthoodQuery, [personID, priesthood], (err) => {
                                if (err) return db.rollback(() => callback(err, null));
    
                                const orgQuery = `SELECT org_ID FROM organization WHERE org_ID = ?`;
                                console.log("Executing Query:", orgQuery, [organization]);
    
                                db.query(orgQuery, [organization], (err, orgResult) => {
                                    if (err) return db.rollback(() => callback(err, null));
    
                                    const orgID = orgResult.length ? orgResult[0].org_ID : null;
                                    console.log("Found Organization ID:", orgID);
    
                                    const memberQuery = `INSERT INTO member (person_ID, org_ID, mem_statusID, Mem_registerDate) VALUES (?, ?, ?, NOW())`;
                                    console.log("Executing Query:", memberQuery, [personID, orgID, memberStatus]);
    
                                    db.query(memberQuery, [personID, orgID, memberStatus], (err, finalResult) => {
                                        if (err) return db.rollback(() => callback(err, null));
    
                                        db.commit((err) => {
                                            if (err) return db.rollback(() => callback(err, null));
    
                                            console.log("✅ Member registered successfully!");
                                            callback(null, { message: "Member registered successfully", memberID: finalResult.insertId });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    },
    
    // ✅ NEW FUNCTION: Get Barangays
    getBarangays: (callback) => {
        const query = "SELECT Barangay_ID, Barangay_Name FROM barangay";
        db.query(query, (err, results) => {
            if (err) return callback(err, null);
            callback(null, results);
        });
    },
    updateStatus: (memberID, statusID, callback) => {
        const query = "UPDATE member SET mem_statusID = ? WHERE mem_ID = ?";
        db.query(query, [statusID, memberID], (err, result) => {
            if (err) return callback(err, null);
            callback(null, result);
        });
    },

    getOrganizations: (callback) => {
        const query = "SELECT org_ID, org_name FROM organization ORDER BY org_name";
        db.query(query, (err, results) => {
            if (err) return callback(err, null);
            callback(null, results);
        });
    }
};

module.exports = Member;
