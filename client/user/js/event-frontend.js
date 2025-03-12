const upcomingEvents = [
    { img: "Iloilo.jpg", text: "17th PFMCP National Convention in Iloilo City <br>April 13, 2023" },
    { img: "xmas.jpg", text: "Davao Agape Married Priests Association Christmas Celebration 2023 <br> December 10, 2024" },
];

const currentEvents = [
    { img: "18th.jpg", text: "PFMCP VisMin Regional Convention <br>October 18, 2024" },
    { img: "16th.jpg", text: "16th National Convention of the Philippine Federation of Married Catholic Priests <br>February 5, 2021" },
    { img: "15th.jpg", text: "15th National Convention of the Philippine Married Catholic Priests <br>April 16, 2024" }
];

let upcomingIndex = 0;
let currentIndex = 0;

function changeUpcomingEvent(direction) {
    upcomingIndex = (upcomingIndex + direction + upcomingEvents.length) % upcomingEvents.length;
    document.getElementById("eventImage").src = upcomingEvents[upcomingIndex].img;
    document.getElementById("eventText").innerHTML = upcomingEvents[upcomingIndex].text;
}

function changeCurrentEvent(direction) {
    currentIndex = (currentIndex + direction + currentEvents.length) % currentEvents.length;
    document.getElementById("currentEventImage").src = currentEvents[currentIndex].img;
    document.getElementById("currentEventText").innerHTML = currentEvents[currentIndex].text;
}
