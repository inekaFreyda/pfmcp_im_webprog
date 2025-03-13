document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("memberSearch");
    const searchButton = document.getElementById("memberSearchBtn");
    const tableBody = document.getElementById("memberTableBody");

    // ✅ Check if elements exist before running the script
    if (!searchInput || !searchButton || !tableBody) {
        console.error("One or more elements not found. Check your HTML IDs.");
        return;
    }

    let membersData = []; // Store fetched data for filtering

    // ✅ Fetch members from the API
    function fetchMembers() {
        fetch("http://localhost:3002/member/members")
            .then(response => response.json())
            .then(members => {
                membersData = members; // Store data for search filtering
                displayMembers(members); // Show members initially
            })
            .catch(error => console.error("Error loading members:", error));
    }

    // ✅ Display filtered members
    function displayMembers(members) {
        tableBody.innerHTML = ""; // Clear previous rows

        if (members.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="6" style="text-align: center;">No matching members found.</td></tr>`;
            return;
        }

        members.forEach(member => {
            const row = document.createElement("tr");

            row.setAttribute("data-member-id", member.MemberNo);
            row.innerHTML = `
                <td>${member.MemberNo}</td>
                <td>${member.Name}</td>
                <td>${member.Organization}</td>
                <td>${member.ContactNo}</td>
                <td>${member.Email}</td>
                <td>${member.MemberStatus}</td>
            `;
            tableBody.appendChild(row);

            // ✅ Make row clickable to view member profile
            row.addEventListener("click", function () {
                window.location.href = `../pages/memberProfile.html?id=${member.MemberNo}`;
            });
        });
    }

    // ✅ Filter members based on input
    function filterMembers() {
        let input = searchInput.value.toLowerCase();

        let filteredMembers = membersData.filter(member => {
            return (
                member.MemberNo.toString().includes(input) ||
                member.Name.toLowerCase().includes(input) ||
                member.Organization.toLowerCase().includes(input) ||
                member.ContactNo.toLowerCase().includes(input) ||
                member.Email.toLowerCase().includes(input) ||
                member.MemberStatus.toLowerCase().includes(input)
            );
        });

        displayMembers(filteredMembers);
    }

    // ✅ Load members initially
    fetchMembers();

    // ✅ Attach search event listeners
    searchInput.addEventListener("keyup", filterMembers);
    searchButton.addEventListener("click", filterMembers);
});
