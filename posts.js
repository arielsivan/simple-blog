const displayPosts = () => {
    const postsDiv = document.getElementById('posts');
    postsDiv.innerHTML = '';
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.forEach((post, index) => {
        const postDiv = document.createElement('div');
        postDiv.classList.add('post');
        postDiv.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.content}</p>
            ${post.image ? `<img src="${post.image}" alt="Post Image">` : ''}
            <a href="${post.link}" target="_blank">קרא עוד</a>
            <button class="delete-btn" onclick="deletePost(${index})">מחק מאמר</button>
        `;
        postsDiv.appendChild(postDiv);
    });
};

const addPost = () => {
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const link = document.getElementById('link').value; // Get the link from the input
    const imageUpload = document.getElementById('image-upload');
    const image = imageUpload.files[0] ? URL.createObjectURL(imageUpload.files[0]) : '';
    
    if (title && content && link) { // Ensure link is included in the validation
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts.push({ title, content, link, image });
        localStorage.setItem('posts', JSON.stringify(posts));
        displayPosts();
        document.getElementById('title').value = '';
        document.getElementById('content').value = '';
        document.getElementById('link').value = ''; // Clear the link input after submission
        imageUpload.value = '';
    } else {
        alert('נא למלא את כל השדות.');
    }
};

// Delete post
const deletePost = (index) => {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.splice(index, 1);
    localStorage.setItem('posts', JSON.stringify(posts));
    displayPosts();
};

// Check login status when the page loads
const checkLogin = () => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
        window.location.href = 'auth.html'; // Redirect to login page if not logged in
    }
};

// Initial display on page load
window.onload = () => {
    checkLogin();
    displayPosts();
};
