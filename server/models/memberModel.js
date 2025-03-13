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

        const query = `CALL RegisterMember(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        db.query(query, [firstname, middlename, surname, birthdate, barangay, address, contact, email, occupation, priesthood, organization, memberStatus], 
        (err, results) => {
            if (err) return callback(err, null);

            console.log("✅ Member registered successfully!", results);
            callback(null, { message: "Member registered successfully", memberID: results[0][0].MemberID });
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
