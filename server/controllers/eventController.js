const Event = require('../models/eventModel');

exports.getEvents = (req, res) => {
    Event.getAllEvents((err, events) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching events', error: err });
        }
        res.json(events);
    });
};

exports.updateEventStatus = (req, res) => {
    const eventID = req.params.eventID;
    const newStatus = req.body.status;

    Event.updateStatus(eventID, newStatus, (err, result) => {
        if (err) return res.status(500).json({ message: 'Error updating event status', error: err });
        res.json({ message: 'Event status updated successfully', result });
    });
};

exports.addEvent = (req, res) => {
    const eventData = req.body;

    Event.addEvent(eventData, (err, result) => {
        if (err) return res.status(500).json({ message: 'Error adding event', error: err });
        res.json({ message: 'Event added successfully', eventID: result.insertId });
    });
};