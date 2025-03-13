document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const orgID = urlParams.get("id");

    if (!orgID) {
        console.error("No organization ID found in URL");
        return;
    }

    fetch(`http://localhost:3002/organization/${orgID}`)
    .then(response => response.json())
    .then(org => {
        console.log("Fetched Organization:", org);

        document.getElementById("org-name").textContent = org.Name || "N/A";
        document.getElementById("rep-name").textContent = org.Representative || "N/A";
        document.getElementById("org-island").textContent = org.Island || "N/A";
        document.getElementById("rep-contact").textContent = org.Contact || "N/A";
        document.getElementById("rep-email").textContent = org.Email || "N/A";
        document.getElementById("numberOfMembers").textContent = org.NumberOfMembers || "0";

        // ✅ Format the EstablishedOn Date
        if (org.EstablishedOn) {
            const dateObj = new Date(org.EstablishedOn);
            const formattedDate = dateObj.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric"
            });

            document.getElementById("org-established").textContent = formattedDate;
        } else {
            document.getElementById("org-established").textContent = "N/A";
        }

        // ✅ Set Status Dropdown Value
        const statusDropdown = document.getElementById("organization-status");
        if (statusDropdown) {
            statusDropdown.value = org.OrganizationStatus || "";
        }
    })
    .catch(error => console.error("Error loading organization:", error));
});

// ✅ Update Organization Status (Ensures Button is Ready)
document.addEventListener("DOMContentLoaded", function () {
    const updateBtn = document.querySelector(".update-btn");
    if (updateBtn) {
        updateBtn.addEventListener("click", function () {
            const orgID = new URLSearchParams(window.location.search).get("id");
            const newStatus = document.getElementById("organization-status").value;

            fetch(`http://localhost:3002/organization/update-status/${orgID}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ statusID: newStatus })
            })
            .then(response => response.json())
            .then(data => {
                alert("Organization status updated!");
                console.log("Updated Organization:", data);
            })
            .catch(error => {
                console.error("Error updating organization status:", error);
                alert("Failed to update organization status.");
            });
        });
    }
});
