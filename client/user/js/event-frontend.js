const upcomingEvents = [
    { img: "/client/user/images/Iloilo.jpg", text: "17th PFMCP National Convention in Iloilo City <br>April 13, 2023" },
    { img: "/client/user/images/xmas.jpg", text: "Davao Agape Married Priests Association Christmas Celebration 2023 <br> December 10, 2024" },
    { img: "/client/user/images/18th.jpg", text: "PFMCP VisMin Regional Convention <br>October 18, 2024" },
    { img: "/client/user/images/16th.jpg", text: "16th National Convention of the Philippine Federation of Married Catholic Priests <br>February 5, 2021" },
    { img: "/client/user/images/15th.jpg", text: "15th National Convention of the Philippine Married Catholic Priests <br>April 16, 2024" }
];


let upcomingIndex = 0;
let currentIndex = 0;

function changeUpcomingEvent(direction) {
    upcomingIndex = (upcomingIndex + direction + upcomingEvents.length) % upcomingEvents.length;
    document.getElementById("eventImage").src = upcomingEvents[upcomingIndex].img;
    document.getElementById("eventText").innerHTML = upcomingEvents[upcomingIndex].text;
}