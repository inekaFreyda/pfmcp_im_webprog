document.addEventListener("DOMContentLoaded", function () {
    fetch("http://localhost:3002/member/members")
        .then(response => response.json())
        .then(members => {
            console.log("Members Data:", members); // ✅ Debugging step
            const tableBody = document.getElementById("memberTableBody");
           tableBody.innerHTML = "";

            members.forEach(member => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${member.MemberNo}</td>
                    <td>${member.Name}</td>
                    <td>${member.Organization}</td>
                    <td>${member.ContactNo}</td>
                    <td>${member.Email}</td>
                    <td>
                        <select class="status-dropdown" data-member-id="${member.MemberNo}">
                            <option value="1" ${member.MemberStatus === "Pending" ? "selected" : ""}>Pending</option>
                            <option value="2" ${member.MemberStatus === "Approved" ? "selected" : ""}>Approved</option>
                            <option value="3" ${member.MemberStatus === "Rejected" ? "selected" : ""}>Rejected</option>
                        </select>
                    </td>
                `;
                tableBody.appendChild(row);
            });

            // ✅ Add event listener to all status dropdowns
            document.querySelectorAll(".status-dropdown").forEach(dropdown => {
                dropdown.addEventListener("change", function () {
                    const memberID = this.getAttribute("data-member-id");
                    const newStatusID = this.value;
                    updateMemberStatus(memberID, newStatusID);
                });
            });
        })
        .catch(error => console.error("Error loading members:", error));
});

// ✅ Function to Update Member Status in Database
function updateMemberStatus(memberID, newStatusID) {
    fetch(`http://localhost:3002/member/update-status/${memberID}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ statusID: newStatusID })
    })
    .then(response => response.json())
    .then(data => {
        alert("Member status updated successfully!");
        console.log("Updated Member:", data);
    })
    .catch(error => {
        console.error("Error updating member status:", error);
        alert("Failed to update member status.");
    });
}
