document.addEventListener("DOMContentLoaded", function () {
    fetch("http://localhost:3002/event/events") // Update this if needed
        .then(response => response.json())
        .then(events => {
            const tableBody = document.getElementById("eventTableBody");
            tableBody.innerHTML = "";

            events.forEach(event => {
                const row = document.createElement("tr");

                row.innerHTML = `
                    <td>${event.EventID}</td>
                    <td>${event.EventName}</td>
                    <td>${event.eventLocation}</td>
                    <td>${new Date(event.eventDate).toLocaleDateString()}</td>
                    <td>
                        <select class="status-dropdown" data-event-id="${event.EventID}">
                            <option value="Ongoing" ${event.Status === "Ongoing" ? "selected" : ""}>Ongoing</option>
                            <option value="Completed" ${event.Status === "Completed" ? "selected" : ""}>Completed</option>
                            <option value="Cancelled" ${event.Status === "Cancelled" ? "selected" : ""}>Cancelled</option>
                            <option value="Upcoming" ${event.Status === "Upcoming" ? "selected" : ""}>Upcoming</option>
                        </select>
                    </td>
                `;

                tableBody.appendChild(row);
            });

            // Attach event listener to all dropdowns
            document.querySelectorAll(".status-dropdown").forEach(dropdown => {
                dropdown.addEventListener("change", function () {
                    const eventID = this.getAttribute("data-event-id");
                    const newStatus = this.value;
                    updateEventStatus(eventID, newStatus);
                });
            });
        })
        .catch(error => console.error("Error loading events:", error));
});

// Function to update event status in the database
function updateEventStatus(eventID, newStatus) {
    fetch(`http://localhost:3002/event/update-status/${eventID}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
    })
    .then(response => response.json())
    .then(data => {
        console.log("Status updated successfully:", data);
        alert("Event status updated!");
    })
    .catch(error => {
        console.error("Error updating status:", error);
        alert("Failed to update status.");
    });
}
