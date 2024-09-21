document.addEventListener('DOMContentLoaded', function () {
    // Check if the username is available in the session storage
    const username = sessionStorage.getItem('username');

    // If username exists, display it
    if (username) {
        document.getElementById('username').innerText = username;
    } else {
        document.getElementById('welcome-message').innerText = 'Hello, Guest!';
    }

    // Logout button functionality
    document.getElementById('logout-btn').addEventListener('click', function() {
        // Clear session storage and redirect to login page
        sessionStorage.removeItem('username');
        fetch('/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Logout Success') {
                window.location.href = '/login'; // Redirect to login page
            }
        });
    });
});
