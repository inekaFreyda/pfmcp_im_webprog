document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("form");
    
    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        
        try {
            const response = await fetch("http://localhost:3002/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });
            
            const data = await response.json();
            
            if (response.ok) {
                alert("Login successful!");
                localStorage.setItem("token", data.token); // Store the JWT for authentication
                window.location.href = "../admin/pages/admin_dashboard.html"; // Redirect to admin dashboard
            } else {
                alert(data.message || "Login failed");
            }
        } catch (error) {
            console.error("Error logging in:", error);
            alert("An error occurred. Please try again.");
        }
    });
});
