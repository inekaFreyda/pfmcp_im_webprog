document.addEventListener("DOMContentLoaded", function () {
    fetch("http://localhost:3002/event/events") // Fetch all events
        .then(response => response.json())
        .then(events => {
            const tableBody = document.getElementById("eventTableBody");
            tableBody.innerHTML = ""; // Clear table before adding new records

            events.forEach(event => {
                const row = document.createElement("tr");

                row.innerHTML = `
                    <td>${event.EventID}</td>
                    <td>${event.EventName}</td>
                    <td>${event.eventLocation}</td>
                    <td>${new Date(event.eventDate).toLocaleDateString("en-US", { 
                        year: "numeric", month: "long", day: "numeric"
                    })}</td>
                    <td>${event.Status}</td> <!-- ✅ No more dropdown -->
                `;

                // ✅ Make the row clickable
                row.addEventListener("click", function () {
                    window.location.href = `eventProfile.html?id=${event.EventID}`;
                });

                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error("Error loading events:", error));
});
