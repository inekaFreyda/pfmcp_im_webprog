const express = require('express');
const router = express.Router();
const memberController = require('../controllers/memberController');

router.get('/members', memberController.getMembers);
router.post('/add-member', memberController.addMember); // New route for registration
router.get('/barangays', memberController.getBarangays);
router.put("/update-status/:id", memberController.updateMemberStatus);
router.get("/organizations", memberController.getOrganizations);
router.get('/:id', memberController.getMemberById);

module.exports = router;
