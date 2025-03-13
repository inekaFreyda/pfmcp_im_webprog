document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const memberID = urlParams.get("id");

    console.log("Current URL:", window.location.href);
    console.log("Extracted Member ID:", memberID);

    if (!memberID) {
        alert("Member ID not found in URL!");
        return;
    }

    // ✅ Fetch member details
    fetch(`http://localhost:3002/member/${memberID}`)
        .then(response => {
            if (!response.ok) throw new Error("Member not found");
            return response.json();
        })
        .then(member => {
            console.log("Fetched Member Data:", member); // ✅ Check if Email is present

            document.getElementById("member-name").textContent = member.Name;
            document.getElementById("member-contact").textContent = member.Contact;
            document.getElementById("member-email").textContent = member.Email; // ✅ Check if this is `null` or `undefined`
            document.getElementById("member-occupation").textContent = member.Occupation;
            document.getElementById("member-organization").textContent = member.Organization;
    
            document.getElementById("member-address").textContent = member.Address;
            document.getElementById("member-island").textContent = member.Island;
            document.getElementById("member-city").textContent = member.City;
            document.getElementById("member-barangay").textContent = member.Barangay;
            document.getElementById("member-province").textContent = member.Province;
            document.getElementById("member-region").textContent = member.Region;
    
            document.getElementById("member-priesthood").textContent = member.Priesthood;
        })
        .catch(error => console.error("Error loading member:", error));

    // ✅ Ensure `memberID` is accessible inside the event listener
    document.querySelector(".update-btn").addEventListener("click", function () {
        const newStatus = document.getElementById("member-status").value;

        fetch(`http://localhost:3002/member/update-status/${memberID}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ statusID: newStatus })
        })
        .then(response => response.json())
        .then(data => {
            alert("Member status updated!");
            console.log("Updated Member:", data);
        })
        .catch(error => {
            console.error("Error updating member status:", error);
            alert("Failed to update member status.");
        });
    });
});
