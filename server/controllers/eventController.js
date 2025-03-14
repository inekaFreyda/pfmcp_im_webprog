const Event = require('../models/eventModel');

exports.getAllEvents = (req, res) => {
    Event.getAllEvents((err, events) => {
        if (err) return res.status(500).json({ message: "Error fetching events", error: err });
        res.json(events);
    });
};

exports.getEventById = (req, res) => {
    const eventID = req.params.id;

    Event.getEventById(eventID, (err, event) => {
        if (err) return res.status(500).json({ message: "Error fetching event", error: err });
        if (!event) return res.status(404).json({ message: "Event not found" });
        res.json(event);
    });
};

exports.updateStatus = (req, res) => {
    const eventID = req.params.id;
    const { statusID } = req.body;

    if (!eventID || !statusID) {
        return res.status(400).json({ message: "Missing event ID or status ID" });
    }

    Event.updateStatus(eventID, statusID, (err, result) => {
        if (err) {
            console.error("Error updating event status:", err);
            return res.status(500).json({ message: "Internal Server Error", error: err });
        }
        res.json({ message: "Event status updated successfully", result });
    });
};

exports.addEvent = (req, res) => {
    const eventData = req.body;

    Event.addEvent(eventData, (err, result) => {
        if (err) return res.status(500).json({ message: 'Error adding event', error: err });
        res.json({ message: 'Event added successfully', eventID: result.insertId });
    });
};