const db = require('../config/db');

exports.getIslands = (req, res) => {
    db.query("SELECT Island_ID, Island_Name FROM island", (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
};

exports.getRegions = (req, res) => {
    const islandID = req.params.islandID;
    db.query("SELECT Region_ID, Region_Name FROM region WHERE Island_ID = ?", [islandID], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
};

exports.getProvinces = (req, res) => {
    const regionID = req.params.regionID;
    db.query("SELECT Province_ID, Province_Name FROM province WHERE Region_ID = ?", [regionID], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
};

exports.getMunicipalities = (req, res) => {
    const provinceID = req.params.provinceID;
    db.query("SELECT Municipality_ID, Municipality_Name FROM municipality WHERE Province_ID = ?", [provinceID], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
};

exports.getBarangays = (req, res) => {
    const municipalityID = req.params.municipalityID;
    db.query("SELECT Barangay_ID, Barangay_Name FROM barangay WHERE Municipality_ID = ?", [municipalityID], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
};
