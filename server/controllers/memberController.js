const Member = require('../models/memberModel');

exports.getMembers = (req, res) => {
    Member.getAllMembers((err, members) => {
        if (err) return res.status(500).json({ message: 'Error fetching members', error: err });
        res.json(members);
    });
};

exports.getMemberById = (req, res) => {
    const memberID = req.params.id;

    Member.getMemberById(memberID, (err, member) => {
        if (err) return res.status(500).json({ message: "Error fetching member", error: err });
        if (!member) return res.status(404).json({ message: "Member not found" });
        res.json(member);
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

exports.updateMemberStatus = (req, res) => {
    const memberID = req.params.id;
    const { statusID } = req.body;

    Member.updateStatus(memberID, statusID, (err, result) => {
        if (err) return res.status(500).json({ message: "Error updating status", error: err });
        res.json({ message: "Status updated successfully", result });
    });
};

exports.getBarangays = (req, res) => {
    Member.getBarangays((err, barangays) => {
        if (err) return res.status(500).json({ message: "Error fetching barangays", error: err });
        res.json(barangays);
    });
};


exports.getOrganizations = (req, res) => {
    Member.getOrganizations((err, organizations) => {
        if (err) return res.status(500).json({ message: "Error fetching organizations", error: err });
        res.json(organizations);
    });
};
