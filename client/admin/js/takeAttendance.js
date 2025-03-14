document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const eventID = urlParams.get("eventID");

    if (!eventID) {
        console.error("No event ID found in URL");
        return;
    }

    document.getElementById("timeIn").addEventListener("click", function (e) {
        e.preventDefault();
        recordAttendance("time-in", eventID);
    });

    document.getElementById("timeOut").addEventListener("click", function (e) {
        e.preventDefault();
        recordAttendance("time-out", eventID);
    });

    // Attach openTakeAttendance to button (if button exists)
    const openAttendanceBtn = document.querySelector(".attend-btn");
    if (openAttendanceBtn) {
        openAttendanceBtn.addEventListener("click", openTakeAttendance);
    }
});

function recordAttendance(type, eventID) {
    const memberInput = document.getElementById("memberInput").value.trim();

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

// ✅ Function to Open Attendance Page in a New Tab
function openTakeAttendance() {
    const eventID = new URLSearchParams(window.location.search).get("eventID");
    if (eventID) {
        window.open(`takeAttendance.html?eventID=${eventID}`, "_blank");
    } else {
        alert("Event ID is missing!");
    }
}
