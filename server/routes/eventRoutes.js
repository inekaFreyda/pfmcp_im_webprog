const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

router.get("/events", eventController.getAllEvents); 
router.put('/update-status/:eventID', eventController.updateEventStatus); // Ensure this line exists
router.post('/add-event', eventController.addEvent);
router.get('/:id', eventController.getEventById);

module.exports = router;
