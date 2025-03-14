document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.querySelector(".search-bar");
    const searchButton = document.querySelector(".event-text");
    const tableBody = document.getElementById("orgTable");

    if (!searchInput || !searchButton || !tableBody) {
        console.error("One or more elements not found. Check your HTML IDs.");
        return;
    }

    let organizationsData = []; // Store fetched data for filtering

    // ✅ Fetch organizations from the API
    function fetchOrganizations() {
        fetch("http://localhost:3002/organization/organizations")
            .then(response => response.json())
            .then(organizations => {
                organizationsData = organizations; // Store data for search filtering
                displayOrganizations(organizations); // Show organizations initially
            })
            .catch(error => console.error("Error loading organizations:", error));
    }

    // ✅ Display filtered organizations
    function displayOrganizations(organizations) {
        tableBody.innerHTML = ""; // Clear previous rows

        if (organizations.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="4" style="text-align: center;">No matching organizations found.</td></tr>`;
            return;
        }

        organizations.forEach(org => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${org.OrgNo}</td>
                <td>${org.Name}</td>
                <td>${org.Representative || "N/A"}</td>
                <td>${org.OrganizationStatus}</td>
            `;

            // ✅ Make row clickable to view organization profile
            row.addEventListener("click", function () {
                window.location.href = `../pages/orgProfile.html?id=${org.OrgNo}`;
            });

            tableBody.appendChild(row);
        });
    }

    // ✅ Filter organizations based on input
    function filterOrganizations() {
        let input = searchInput.value.toLowerCase();

        let filteredOrganizations = organizationsData.filter(org => {
            return (
                org.OrgNo.toString().includes(input) ||
                org.Name.toLowerCase().includes(input) ||
                (org.Representative && org.Representative.toLowerCase().includes(input)) ||
                org.OrganizationStatus.toLowerCase().includes(input)
            );
        });

        displayOrganizations(filteredOrganizations);
    }

    // ✅ Load organizations initially
    fetchOrganizations();

    // ✅ Attach search event listeners
    searchInput.addEventListener("keyup", filterOrganizations);
    searchButton.addEventListener("click", filterOrganizations);
});
