const Organization = require('../models/organizationModel');

exports.getOrganizations = (req, res) => {
    Organization.getAllOrganizations((err, organizations) => {
        if (err) {
            console.error("Error fetching organizations:", err);
            return res.status(500).json({ message: "Error fetching organizations", error: err });
        }

        console.log("Returning Organizations:", organizations); // ✅ Debugging
        res.json(organizations);
    });
};

exports.getOrganizationById = (req, res) => {
    const orgID = req.params.id;
    console.log(`Fetching organization with ID: ${orgID}`);

    Organization.getOrganizationById(orgID, (err, organization) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Error fetching organization", error: err });
        }

        if (!organization) {
            console.error(`No organization found with ID: ${orgID}`);
            return res.status(404).json({ message: "Organization not found" });
        }

        res.json(organization);
    });
};

// ✅ UPDATED: Register organization without checking if representative is a member
exports.registerOrganization = (req, res) => {
    console.log("Received Data:", req.body); // ✅ Debugging

    const { orgName, repName, islandID, establishedOn } = req.body;

    if (!orgName || !repName || !islandID || !establishedOn) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // ✅ Directly Save Organization and Representative
    const orgData = { orgName, repName, islandID, establishedOn };
    Organization.addOrganization(orgData, (err, result) => {
        if (err) {
            console.error("Error registering organization:", err); // ✅ Debugging
            return res.status(500).json({ message: "Error registering organization", error: err });
        }
        res.json(result);
    });
};

// ✅ UPDATED: Update organization status
exports.updateOrganizationStatus = (req, res) => {
    const { statusID } = req.body;
    const { orgID } = req.params; // Get orgID from URL

    if (!statusID) return res.status(400).json({ message: "Status ID is required" });

    console.log(`Updating orgID ${orgID} to status ${statusID}`); // ✅ Debugging

    Organization.updateStatus(orgID, statusID, (err, result) => {
        if (err) {
            console.error("Error updating status:", err); // ✅ Debugging
            return res.status(500).json({ message: "Error updating organization status", error: err });
        }
        res.json({ message: "Organization status updated successfully", result });
    });
};
