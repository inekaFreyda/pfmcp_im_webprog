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
                    <td>${org.OrganizationStatus}</td>
                `;

                // ✅ Make the row clickable
                row.addEventListener("click", function () {
                    window.location.href = `../pages/orgProfile.html?id=${org.OrgNo}`;
                });

                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error("Error loading organizations:", error));
});
