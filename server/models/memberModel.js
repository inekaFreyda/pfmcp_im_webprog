const db = require('../config/db');

const Member = {
    getAllMembers: (callback) => {
        const query = `
            SELECT 
                m.mem_ID AS MemberNo,
                CONCAT(p.person_firstname, ' ', p.person_middlename, ' ', p.person_surname) AS Name,
                COALESCE(o.org_name, 'N/A') AS Organization,
                c.contactNo AS ContactNo,
                c.email AS Email,
                s.Status AS MemberStatus
            FROM member m
            JOIN person p ON m.person_ID = p.person_ID
            LEFT JOIN organization o ON m.org_ID = o.org_ID
            LEFT JOIN contact c ON p.person_ID = c.person_ID
            JOIN status s ON m.mem_statusID = s.StatusID
            WHERE s.StatusType = 'Member';
        `;
        db.query(query, (err, results) => {
            if (err) return callback(err, null);
            callback(null, results);
        });
    },

    getMemberById: (memberID, callback) => {
        const query = `
           SELECT 
            m.mem_ID AS MemberNo,
            CONCAT(p.person_firstname, ' ', p.person_middlename, ' ', p.person_surname) AS Name,
            a.Description AS Address,
            b.Barangay_Name AS Barangay,
            mu.Municipality_Name AS City,
            pr.Province_Name AS Province,
            r.Region_Name AS Region,
            i.Island_Name AS Island,
            c.contactNo AS Contact,
            c.email AS Email, 
            o.OccupationName AS Occupation,
            org.org_name AS Organization,
            s.Status AS MemberStatus,
            prsh.priesthood_name AS Priesthood
        FROM member m
        JOIN person p ON m.person_ID = p.person_ID
        JOIN address a ON p.person_ID = a.person_ID
        JOIN barangay b ON a.Barangay_ID = b.Barangay_ID
        JOIN municipality mu ON b.Municipality_ID = mu.Municipality_id
        JOIN province pr ON mu.Province_ID = pr.Province_ID
        JOIN region r ON pr.Region_ID = r.Region_ID
        JOIN island i ON r.Island_ID = i.Island_ID
        LEFT JOIN contact c ON p.person_ID = c.person_ID
        LEFT JOIN occupation o ON p.person_ID = o.Person_ID
        LEFT JOIN organization org ON m.org_ID = org.org_ID
        LEFT JOIN priesthood prsh ON p.person_ID = prsh.Person_ID 
        JOIN status s ON m.mem_statusID = s.StatusID
        WHERE m.mem_ID = ?;
        `;
        db.query(query, [memberID], (err, results) => {
            if (err) return callback(err, null);
            callback(null, results.length ? results[0] : null);
        });
    },

    updateStatus: (memberID, statusID, callback) => {
        const query = "UPDATE member SET mem_statusID = ? WHERE mem_ID = ?";
        db.query(query, [statusID, memberID], (err, result) => {
            if (err) return callback(err, null);
            callback(null, result);
        });
    },
    
    addMember: (memberData, callback) => {
        let { firstname, middlename, surname, birthdate, barangay, address, contact, email, occupation, priesthood, organization, memberStatus } = memberData;
        organization = parseInt(organization, 10) || null;
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

    getOrganizations: (callback) => {
        const query = "SELECT org_ID, org_name FROM organization ORDER BY org_name";
        db.query(query, (err, results) => {
            if (err) return callback(err, null);
            callback(null, results);
        });
    }
};

module.exports = Member;
