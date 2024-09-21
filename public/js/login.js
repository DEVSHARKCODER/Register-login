const FormLogin = document.getElementById('formlogin');

FormLogin.addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!username && !password) {
        Swal.fire({
            title: 'ข้อผิดพลาด!',
            text: 'กรุณากรอก User และ Password',
            icon: 'error',
            confirmButtonText: 'ตกลง'
        });
        return; 
    } else if (!username) {
        Swal.fire({
            title: 'ข้อผิดพลาด!',
            text: 'กรุณากรอก User',
            icon: 'error',
            confirmButtonText: 'ตกลง'
        });
        return; 
    } else if (!password) {
        Swal.fire({
            title: 'ข้อผิดพลาด!',
            text: 'กรุณากรอก Password',
            icon: 'error',
            confirmButtonText: 'ตกลง'
        });
        return; 
    }

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(data => {
                throw new Error(data.message || 'Unknown error');
            });
        }
        return response.json(); 
    })
    .then(data => {
        if (data.message === 'Login Success') {
            sessionStorage.setItem('username', username);
            Swal.fire({
                title: 'สำเร็จ!',
                text: 'เข้าสู่ระบบสำเร็จ',
                icon: 'success',
                confirmButtonText: 'ตกลง'
            }).then(() => {
                window.location.href = '/'; 
            });
        } else {
            Swal.fire({
                title: 'ข้อผิดพลาด!',
                text: data.message || 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ',
                icon: 'error',
                confirmButtonText: 'ตกลง'
            });
        }
    })
    .catch(error => {
        console.error('Server Error:', error);
        Swal.fire({
            title: 'ข้อผิดพลาด!',
            text: error.message,
            icon: 'error',
            confirmButtonText: 'ตกลง'
        });
    });
});
