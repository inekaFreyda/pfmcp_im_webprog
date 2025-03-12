document.addEventListener("DOMContentLoaded", function () {
    fetch("http://localhost:3002/organization/organizations")
        .then(response => response.json())
        .then(organizations => {
            const tableBody = document.getElementById("orgTable");

            tableBody.innerHTML = ""; // Clear existing data

            organizations.forEach(org => {
                const row = document.createElement("tr");

                row.innerHTML = `
                    <td>${org.OrgNo}</td>
                    <td>${org.Name}</td>
                    <td>${org.Representative}</td>
                    <td>
                        <select class="status-dropdown" data-org-id="${org.OrgNo}">
                            <option value="4" ${org.OrganizationStatus === "Pending Organization" ? "selected" : ""}>Pending</option>
                            <option value="5" ${org.OrganizationStatus === "Approved Organization" ? "selected" : ""}>Approved</option>
                            <option value="6" ${org.OrganizationStatus === "Rejected Organization" ? "selected" : ""}>Rejected</option>
                        </select>
                    </td>
                `;
                tableBody.appendChild(row);
            });

            // ✅ Attach event listener to all dropdowns
            document.querySelectorAll(".status-dropdown").forEach(dropdown => {
                dropdown.addEventListener("change", function () {
                    const orgID = this.getAttribute("data-org-id");
                    const newStatusID = this.value;
                    updateOrgStatus(orgID, newStatusID);
                });
            });
        })
        .catch(error => console.error("Error loading organizations:", error));
});

// ✅ Update Organization Status
function updateOrgStatus(orgID, newStatusID) {
    fetch(`http://localhost:3002/organization/update-status/${orgID}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ statusID: newStatusID }), // ✅ Ensure correct key
    })
    .then(response => response.json())
    .then(data => {
        console.log("Status updated successfully:", data);
        alert("Organization status updated!");
    })
    .catch(error => {
        console.error("Error updating status:", error);
        alert("Failed to update status.");
    });
}
