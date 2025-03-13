const Member = require('../models/memberModel');

exports.getMembers = (req, res) => {
    Member.getAllMembers((err, members) => {
        if (err) return res.status(500).json({ message: 'Error fetching members', error: err });
        res.json(members);
    });
};

exports.addMember = (req, res) => {
    console.log("Received Data:", req.body); // ✅ Debugging

    const memberData = req.body;

    Member.addMember(memberData, (err, result) => {
        if (err) return res.status(500).json({ message: 'Error registering member', error: err });
        res.json(result);
    });
};

// ✅ Get Barangays
exports.getBarangays = (req, res) => {
    Member.getBarangays((err, barangays) => {
        if (err) return res.status(500).json({ message: "Error fetching barangays", error: err });
        res.json(barangays);
    });
};

// ✅ Update Member Status
exports.updateMemberStatus = (req, res) => {
    const memberID = req.params.id;
    const { statusID } = req.body;

    Member.updateStatus(memberID, statusID, (err, result) => {
        if (err) return res.status(500).json({ message: "Error updating status", error: err });
        res.json({ message: "Status updated successfully", result });
    });
};

// ✅ Get Organizations for Dropdown
exports.getOrganizations = (req, res) => {
    Member.getOrganizations((err, organizations) => {
        if (err) return res.status(500).json({ message: "Error fetching organizations", error: err });
        res.json(organizations);
    });
};
