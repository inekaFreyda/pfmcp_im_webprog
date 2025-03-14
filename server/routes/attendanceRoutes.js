const express = require("express");
const router = express.Router();
const AttendanceController = require("../controllers/attendanceController");

// Get attendance for a specific event
router.get("/:eventID", AttendanceController.getAttendanceByEvent);

// Record attendance (Time In)
router.post("/time-in", AttendanceController.recordTimeIn);

// Record attendance (Time Out)
router.post("/time-out", AttendanceController.recordTimeOut);

module.exports = router;
