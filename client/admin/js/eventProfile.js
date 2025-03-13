document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const eventID = urlParams.get("id");

    if (!eventID) {
        console.error("No event ID found in URL");
        return;
    }

    // ✅ Fetch event details from backend
    fetch(`http://localhost:3002/event/${eventID}`)
        .then(response => response.json())
        .then(event => {
            console.log("Fetched Event:", event);

            // ✅ Display event details
            document.getElementById("event-name").textContent = event.EventName;
            document.getElementById("event-desc").textContent = event.Description || "No description available";
            document.getElementById("event-island").textContent = event.Island || "N/A";
            document.getElementById("event-loc").textContent = event.eventLocation;
            document.getElementById("event-date").textContent = formatDate(event.eventDate);
            document.getElementById("event-time").textContent = formatTime(event.eventTime);
            document.getElementById("event-status").value = event.StatusID; // ✅ Set status dropdown
        })
        .catch(error => console.error("Error loading event:", error));
});

// ✅ Update Event Status
document.querySelector(".update-btn").addEventListener("click", function () {
    const eventID = new URLSearchParams(window.location.search).get("id");
    const newStatus = document.getElementById("event-status").value;

    fetch(`http://localhost:3002/event/update-status/${eventID}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ statusID: newStatus })
    })
    .then(response => response.json())
    .then(data => {
        alert("Event status updated!");
        console.log("Updated Event:", data);
    })
    .catch(error => {
        console.error("Error updating event status:", error);
        alert("Failed to update event status.");
    });
});

// ✅ Format Date as "Month Day, Year"
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

// ✅ Format Time as "HH:MM AM/PM"
function formatTime(timeString) {
    if (!timeString) return "N/A";
    const [hours, minutes] = timeString.split(":");
    const date = new Date();
    date.setHours(hours, minutes);

    return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });
}
