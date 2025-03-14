document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const eventID = urlParams.get("eventID");

    if (!eventID) {
        console.error("No event ID found in URL");
        return;
    }

    fetch(`http://localhost:3002/attendance/${eventID}`)
        .then(response => response.json())
        .then(attendanceRecords => {
            const tableBody = document.getElementById("attendanceTableBody");
            tableBody.innerHTML = "";

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
