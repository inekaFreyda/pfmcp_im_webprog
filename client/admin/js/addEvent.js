document.getElementById("eventForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const eventData = {
        Island_ID: document.getElementById("island").value,
        event_statusID: document.getElementById("status").value,
        eventLocation: document.getElementById("location").value,
        EventName: document.getElementById("eventName").value,
        description: document.getElementById("description").value,
        eventDate: document.getElementById("eventDate").value,
        eventTime: document.getElementById("eventTime").value
    };

    fetch("http://localhost:3002/event/add-event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventData)
    })
    .then(response => response.json())
    .then(data => {
        alert("Event added successfully!");
        console.log("New event ID:", data.eventID);
        window.location.href = "event.html";
    })
    .catch(error => {
        console.error("Error adding event:", error);
        alert("Failed to add event.");
    });
});
