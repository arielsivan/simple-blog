const checkLogin = () => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
        window.location.href = 'posts.html'; // Redirect to posts page if logged in
    }
};

// Register new user
const register = () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');
    if (username && password) {
        if (localStorage.getItem(username)) {
            errorMessage.innerText = 'שם המשתמש כבר קיים.';
        } else {
            localStorage.setItem(username, password);
            errorMessage.innerText = 'הרשמה בוצעה בהצלחה!';
            document.getElementById('username').value = '';
            document.getElementById('password').value = '';
        }
    } else {
        errorMessage.innerText = 'נא למלא את כל השדות.';
    }
};

// Login existing user
const login = () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');
    if (username && password) {
        const storedPassword = localStorage.getItem(username);
        if (storedPassword === password) {
            localStorage.setItem('loggedInUser', username);
            window.location.href = 'posts.html'; // Redirect to posts page
        } else {
            errorMessage.innerText = 'שם משתמש או סיסמא לא נכונים.';
        }
    } else {
        errorMessage.innerText = 'נא למלא את כל השדות.';
    }
};

// Logout user
const logout = () => {
    localStorage.removeItem('loggedInUser');
    window.location.href = 'auth.html'; // Redirect to auth page
};

// Initial check on page load
window.onload = checkLogin;
