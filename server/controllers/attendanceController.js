const Attendance = require("../models/attendanceModel");

// Get attendance for a specific event
exports.getAttendanceByEvent = (req, res) => {
    const eventID = req.params.eventID;

    Attendance.getAttendanceByEvent(eventID, (err, results) => {
        if (err) return res.status(500).json({ message: "Error fetching attendance", error: err });
        res.json(results);
    });
};

// Record Time In with member validation
exports.recordTimeIn = (req, res) => {
    const { memberInput, eventID } = req.body;

    Attendance.getMemberByIdOrName(memberInput, (err, member) => {
        if (err) return res.status(404).json({ message: "Member not found" });

        Attendance.recordTimeIn(member.mem_ID, eventID, (err, result) => {
            if (err) return res.status(500).json({ message: "Error recording time in", error: err });
            res.json({ message: "Time In recorded successfully", result });
        });
    });
};

// Record Time Out with member validation
exports.recordTimeOut = (req, res) => {
    const { memberInput, eventID } = req.body;

    Attendance.getMemberByIdOrName(memberInput, (err, member) => {
        if (err) return res.status(404).json({ message: "Member not found" });

        Attendance.recordTimeOut(member.mem_ID, eventID, (err, result) => {
            if (err) return res.status(500).json({ message: "Error recording time out", error: err });
            res.json({ message: "Time Out recorded successfully", result });
        });
    });
};
