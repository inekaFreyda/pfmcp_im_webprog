const db = require('../config/db');

const Event = {
    getAllEvents: (callback) => {
        const query = `
            SELECT 
                e.EventID, 
                e.EventName, 
                e.eventLocation, 
                e.eventDate, 
                s.Status
            FROM Event e
            JOIN Status s ON e.event_statusID = s.StatusID
            WHERE s.StatusType = 'Event'
        `;
        db.query(query, (err, results) => {
            if (err) return callback(err, null);
            callback(null, results);
        });
    },

    updateStatus: (eventID, newStatus, callback) => {
        const query = `
            UPDATE Event 
            SET event_statusID = (SELECT StatusID FROM Status WHERE Status = ? AND StatusType = 'Event') 
            WHERE EventID = ?
        `;
        db.query(query, [newStatus, eventID], (err, result) => {
            if (err) return callback(err, null);
            callback(null, result);
        });
    },

    addEvent: (eventData, callback) => {
        const { Island_ID, event_statusID, eventLocation, EventName, description, eventDate, eventTime } = eventData;
        
        const query = `
            INSERT INTO Event (Island_ID, event_statusID, eventLocation, EventName, description, eventDate, eventTime)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        db.query(query, [Island_ID, event_statusID, eventLocation, EventName, description, eventDate, eventTime], (err, result) => {
            if (err) return callback(err, null);
            callback(null, result);
        });
    }
};

module.exports = Event;
