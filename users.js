const displayUsers = () => {
    const usersDiv = document.getElementById('users');
    usersDiv.innerHTML = '';
    for (let i = 0; i < localStorage.length; i++) {
        const username = localStorage.key(i);
        if (username !== 'loggedInUser' && username !== 'posts') {
            const userDiv = document.createElement('div');
            userDiv.classList.add('user');
            userDiv.innerHTML = `
                ${username}
                <div>
                    <button onclick="deleteUser('${username}')">מחק</button>
                    <button onclick="modifyUser('${username}')">שנה</button>
                </div>
            `;
            usersDiv.appendChild(userDiv);
        }
    }
};

// Delete user
const deleteUser = (username) => {
    localStorage.removeItem(username);
    displayUsers();
};

// Modify user
const modifyUser = (username) => {
    const newPassword = prompt("נא הכנס סיסמא חדשה עבור המשתמש " + username);
    if (newPassword) {
        localStorage.setItem(username, newPassword);
        displayUsers();
    }
};

// Initial display on page load
window.onload = displayUsers;
