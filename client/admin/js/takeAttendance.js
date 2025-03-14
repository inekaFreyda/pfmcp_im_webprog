document.getElementById("timeIn").addEventListener("click", function (e) {
    e.preventDefault();
    recordAttendance("time-in");
});

document.getElementById("timeOut").addEventListener("click", function (e) {
    e.preventDefault();
    recordAttendance("time-out");
});

function recordAttendance(type) {
    const memberInput = document.getElementById("memberInput").value.trim();
    const eventID = new URLSearchParams(window.location.search).get("eventID");

    if (!memberInput || !eventID) {
        alert("Please enter a valid Member ID or Name and ensure an event is selected.");
        return;
    }

    fetch(`http://localhost:3002/attendance/${type}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ memberInput, eventID })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert(data.message);
        } else {
            alert(`${type === "time-in" ? "Time In" : "Time Out"} recorded successfully!`);
        }
    })
    .catch(error => {
        console.error("Error recording attendance:", error);
        alert("Failed to record attendance.");
    });
}
