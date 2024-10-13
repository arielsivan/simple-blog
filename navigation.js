const updateNav = () => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    const authLink = document.getElementById('auth-link');

    if (loggedInUser) {
        authLink.innerHTML = `<a href="#" onclick="logout()">התנתק</a>`;
    } else {
        authLink.innerHTML = `<a href="auth.html">התחברות/הרשמה</a>`;
    }
};

// Logout user
const logout = () => {
    localStorage.removeItem('loggedInUser');
    updateNav(); // Update navigation after logout
    window.location.href = 'auth.html'; // Redirect to the auth page
};


// Call the updateNav function on page load
window.onload = updateNav;
