const express = require('express');
const router = express.Router();
const addressController = require('../controllers/addressController');

router.get('/islands', addressController.getIslands);
router.get('/regions/:islandID', addressController.getRegions);
router.get('/provinces/:regionID', addressController.getProvinces);
router.get('/municipalities/:provinceID', addressController.getMunicipalities);
router.get('/barangays/:municipalityID', addressController.getBarangays);

module.exports = router;
