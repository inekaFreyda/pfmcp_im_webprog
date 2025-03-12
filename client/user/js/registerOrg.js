document.getElementById("registerOrg").addEventListener("submit", function (e) {
    e.preventDefault();

    const orgData = {
        orgName: document.getElementById("org-name").value,
        repName: document.getElementById("rep-name").value, // ✅ Now using name directly
        islandID: document.getElementById("island").value,
        establishedOn: document.getElementById("established").value
    };

    console.log("Sending Data:", orgData); // ✅ Debugging

    fetch("http://localhost:3002/organization/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orgData)
    })
    .then(response => response.json())
    .then(data => {
        console.log("Server Response:", data);
        alert("Organization registered successfully!");
    })
    .catch(error => {
        console.error("Error registering organization:", error);
        alert("Failed to register organization.");
    });
});
