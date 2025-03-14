const db = require("../config/db");

const Attendance = {
    // Get attendance records for a specific event
    getAttendanceByEvent: (eventID, callback) => {
        const query = `
            SELECT 
                a.attend_ID AS AttendanceNo,
                m.mem_ID AS MemberNo,
                CONCAT(p.person_firstname, ' ', p.person_middlename, ' ', p.person_surname) AS Name,
                COALESCE(o.org_name, 'N/A') AS Organization,
                a.attend_in AS TimeIn,
                a.attend_out AS TimeOut,
                IF(a.attend_in IS NOT NULL, 'Present', 'Absent') AS Attendance
            FROM attendance a
            JOIN member m ON a.mem_ID = m.mem_ID
            JOIN person p ON m.person_ID = p.person_ID
            LEFT JOIN organization o ON m.org_ID = o.org_ID
            WHERE a.EventID = ?;
        `;

        db.query(query, [eventID], (err, results) => {
            if (err) return callback(err, null);
            callback(null, results);
        });
    },

    // Check if member exists by ID or Name
    getMemberByIdOrName: (memberInput, callback) => {
        let query;
        let values;

        if (!isNaN(memberInput)) {
            // If input is a number, search by Member ID
            query = `SELECT mem_ID FROM member WHERE mem_ID = ?`;
            values = [memberInput];
        } else {
            // If input is text, search by full name
            query = `
                SELECT m.mem_ID 
                FROM member m
                JOIN person p ON m.person_ID = p.person_ID
                WHERE CONCAT(p.person_firstname, ' ', p.person_middlename, ' ', p.person_surname) = ?
            `;
            values = [memberInput];
        }

        db.query(query, values, (err, results) => {
            if (err) return callback(err, null);
            if (results.length === 0) return callback({ message: "Member not found" }, null);
            callback(null, results[0]);
        });
    },

    // Record Time In
    recordTimeIn: (memberID, eventID, callback) => {
        const query = `
            INSERT INTO attendance (EventID, mem_ID, dateActual, attend_in)
            VALUES (?, ?, CURDATE(), NOW());
        `;
        db.query(query, [eventID, memberID], (err, result) => {
            if (err) return callback(err, null);
            callback(null, result);
        });
    },

    // Record Time Out
    recordTimeOut: (memberID, eventID, callback) => {
        const query = `
            UPDATE attendance 
            SET attend_out = NOW()
            WHERE EventID = ? AND mem_ID = ?;
        `;

        db.query(query, [eventID, memberID], (err, result) => {
            if (err) return callback(err, null);
            callback(null, result);
        });
    }
};

module.exports = Attendance;
