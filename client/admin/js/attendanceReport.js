document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const eventID = urlParams.get("eventID");

    if (!eventID) {
        console.error("No event ID found in URL");
        return;
    }

    // ✅ Fetch attendance records for this event
    fetch(`http://localhost:3002/attendance/${eventID}`)
        .then(response => response.json())
        .then(attendanceRecords => {
            const tableBody = document.getElementById("attendanceTableBody");
            tableBody.innerHTML = ""; // Clear previous entries

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
            });
        })
        .catch(error => console.error("Error loading attendance:", error));
});

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
