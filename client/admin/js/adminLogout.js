document.addEventListener("DOMContentLoaded", function () {
    const logoutButton = document.querySelector(".logout");

    logoutButton.addEventListener("click", function () {
        // Remove token from localStorage (or sessionStorage if used)
        localStorage.removeItem("token");

        // Redirect to the login page
        window.location.href = "../index.html"; // Update if your login page has a different filename
    });
});
