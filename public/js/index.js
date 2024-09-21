document.addEventListener('DOMContentLoaded', function () {
    
    const username = sessionStorage.getItem('username');

    
    if (username) {
        document.getElementById('username').innerText = username;
    } else {
        document.getElementById('welcome-message').innerText = 'Hello, Guest!';
    }

    
    document.getElementById('logout-btn').addEventListener('click', function() {
        
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
                window.location.href = '/login'; 
            }
        });
    });
});
