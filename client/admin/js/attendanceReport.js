document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const eventID = urlParams.get("eventID");

    if (!eventID) {
        console.error("No event ID found in URL");
        return;
    }

    // ✅ Fetch event details (Event Name)
    fetch(`http://localhost:3002/event/${eventID}`)
        .then(response => response.json())
        .then(eventData => {
            if (eventData) {
                document.getElementById("eventName").textContent = eventData.EventName;
            } else {
                document.getElementById("eventName").textContent = "Event Not Found";
            }
        })
        .catch(error => console.error("Error loading event details:", error));

    // ✅ Fetch attendance records for this event
    fetch(`http://localhost:3002/attendance/${eventID}`)
        .then(response => response.json())
        .then(attendanceRecords => {
            const tableBody = document.getElementById("attendanceTableBody");
            tableBody.innerHTML = ""; // Clear previous entries

            let memberCount = 0; // ✅ Count attended members

            attendanceRecords.forEach(record => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${record.AttendanceNo}</td>
                    <td>${record.MemberNo}</td>
                    <td>${record.Name}</td>
                    <td>${record.Organization}</td>
                    <td>${record.TimeIn || "N/A"}</td>
                    <td>${record.TimeOut || "N/A"}</td>
                    <td>${record.Attendance}</td>
                `;
                tableBody.appendChild(row);
                
                // ✅ Count members with recorded attendance (time-in)
                if (record.TimeIn) {
                    memberCount++;
                }
            });

            // ✅ Update total members attended
            document.getElementById("members-attended").textContent = memberCount;
        })
        .catch(error => console.error("Error loading attendance:", error));
});

// ✅ Open Take Attendance Page
let takeAttendanceWindow; // Store reference to opened window

function openTakeAttendance() {
    const eventID = new URLSearchParams(window.location.search).get("eventID");
    if (eventID) {
        takeAttendanceWindow = window.open(`takeAttendance.html?eventID=${eventID}`, "_blank"); 
    } else {
        alert("Event ID is missing!");
    }
}

// ✅ Attach event listener to "Open Attendance" button
document.addEventListener("DOMContentLoaded", function () {
    const openAttendanceBtn = document.querySelector(".attend-btn");

    if (openAttendanceBtn) {
        openAttendanceBtn.addEventListener("click", openTakeAttendance);
    }
});
