const express = require('express');
const router = express.Router();
const organizationController = require('../controllers/organizationController');

router.post('/register', organizationController.registerOrganization);
router.get('/organizations', organizationController.getOrganizations);
router.put('/update-status/:orgID', organizationController.updateOrganizationStatus); 

module.exports = router;
