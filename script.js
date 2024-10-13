// Check if user is logged in
const checkLogin = () => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
        document.getElementById('auth-section').style.display = 'none';
        document.getElementById('blog-section').style.display = 'block';
        document.getElementById('user-section').style.display = 'block';
        displayPosts();
        displayUsers();
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
            document.getElementById('error-message').classList.add('success-message');
        }
    } else {
        errorMessage.innerText = 'נא למלא את כל השדות.';
    }
};

// Login function
const login = () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');
    const storedPassword = localStorage.getItem(username);
    if (storedPassword === password) {
        localStorage.setItem('loggedInUser', username);
        document.getElementById('auth-section').style.display = 'none';
        document.getElementById('blog-section').style.display = 'block';
        document.getElementById('user-section').style.display = 'block';
        displayPosts();
        displayUsers();
    } else {
        errorMessage.innerText = 'שם משתמש או סיסמא שגויים.';
    }
};

// Logout function
const logout = () => {
    localStorage.removeItem('loggedInUser');
    document.getElementById('auth-section').style.display = 'block';
    document.getElementById('blog-section').style.display = 'none';
    document.getElementById('user-section').style.display = 'none';
};

// Add a new post
const addPost = () => {
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const imageFile = document.getElementById('image-upload').files[0];

    if (title && content) {
        const reader = new FileReader();
        reader.onloadend = function () {
            const post = {
                title: title,
                content: content,
                image: reader.result
            };
            let posts = JSON.parse(localStorage.getItem('posts')) || [];
            posts.push(post);
            localStorage.setItem('posts', JSON.stringify(posts));
            displayPosts();
            document.getElementById('title').value = '';
            document.getElementById('content').value = '';
        };
        if (imageFile) {
            reader.readAsDataURL(imageFile);
        } else {
            const post = { title, content, image: '' };
            let posts = JSON.parse(localStorage.getItem('posts')) || [];
            posts.push(post);
            localStorage.setItem('posts', JSON.stringify(posts));
            displayPosts();
        }
    } else {
        alert('נא למלא את כל השדות.');
    }
};

// Display posts
const displayPosts = () => {
    const postsDiv = document.getElementById('posts');
    postsDiv.innerHTML = '';
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.forEach((post, index) => {
        const postDiv = document.createElement('div');
        postDiv.classList.add('post');
        postDiv.innerHTML = `
            <h3><a href="#">${post.title}</a></h3>
            <p>${post.content}</p>
            ${post.image ? `<img src="${post.image}" alt="תמונה">` : ''}
            <button class="delete-btn" onclick="deletePost(${index})">מחק/י מאמר</button>
        `;
        postsDiv.appendChild(postDiv);
    });
};

// Delete post
const deletePost = (index) => {
    let posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.splice(index, 1);
    localStorage.setItem('posts', JSON.stringify(posts));
    displayPosts();
};

// Display users
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

// Initial check on page load
window.onload = checkLogin;
