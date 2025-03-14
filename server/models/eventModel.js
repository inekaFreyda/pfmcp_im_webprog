const db = require('../config/db');

const Event = {
    getAllEvents: (callback) => {
        const query = `
            SELECT 
                e.EventID AS EventID,
                e.EventName AS EventName,
                e.eventLocation AS eventLocation,
                e.eventDate AS eventDate,
                s.Status AS Status
            FROM event e
            JOIN status s ON e.event_statusID = s.StatusID
            WHERE s.StatusType = 'Event';
        `;
        db.query(query, (err, results) => {
            if (err) return callback(err, null);
            callback(null, results);
        });
    },

    getEventById: (eventID, callback) => {
        const query = `
            SELECT 
                e.EventID AS EventID,
                e.EventName AS EventName,
                e.description AS Description,  -- ✅ Fixed column name
                i.Island_Name AS Island,
                e.eventLocation AS eventLocation,
                e.eventDate AS eventDate,
                e.eventTime AS eventTime,
                s.Status AS Status,
                s.StatusID AS StatusID
            FROM event e
            JOIN island i ON e.Island_ID = i.Island_ID
            JOIN status s ON e.event_statusID = s.StatusID
            WHERE e.EventID = ?;
        `;
        db.query(query, [eventID], (err, results) => {
            if (err) return callback(err, null);
            callback(null, results.length ? results[0] : null);
        });
    },

    updateStatus: (eventID, statusID, callback) => {
        const query = `
            UPDATE event 
            SET event_statusID = ? 
            WHERE EventID = ?;
        `;

        db.query(query, [statusID, eventID], (err, result) => {
            if (err) {
                console.error("SQL Error:", err); // ✅ Log SQL errors
                return callback(err, null);
            }
            callback(null, result);
        });
    },

    addEvent: (eventData, callback) => {
        const { Island_ID, event_statusID, eventLocation, EventName, description, eventDate, eventTime } = eventData;
        
        const query = `
            INSERT INTO event (Island_ID, event_statusID, eventLocation, EventName, description, eventDate, eventTime)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        db.query(query, [Island_ID, event_statusID, eventLocation, EventName, description, eventDate, eventTime], (err, result) => {
            if (err) return callback(err, null);
            callback(null, { message: "Event registered successfully!", eventID: result.insertId });
        });
    }
};

module.exports = Event;
