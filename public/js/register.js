const formregister = document.getElementById('formregister');

formregister.addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData(formregister);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    // ตรวจสอบรหัสผ่านกับการยืนยันรหัสผ่าน
    if (data.password !== data.confirm_password) {
        Swal.fire({
            title: 'ข้อผิดพลาด!',
            text: 'รหัสผ่านและการยืนยันรหัสผ่านไม่ตรงกัน',
            icon: 'error',
            confirmButtonText: 'ตกลง'
        });
        return; 
    }

    // ส่งข้อมูลไปที่เซิร์ฟเวอร์
    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        // เช็คสถานะการตอบกลับจากเซิร์ฟเวอร์
        if (data.message === 'username หรือ email นี้มีอยู่แล้ว') {
            Swal.fire({
                title: 'ข้อผิดพลาด!',
                text: 'username หรือ email นี้มีอยู่แล้ว',
                icon: 'error',
                confirmButtonText: 'ตกลง'
            });
        } else if (data.message === 'ลงทะเบียนสำเร็จ!') {
            Swal.fire({
                title: 'สำเร็จ!',
                text: 'การลงทะเบียนเสร็จสิ้นแล้ว',
                icon: 'success',
                confirmButtonText: 'ตกลง'
            });
        } else {
            Swal.fire({
                title: 'เกิดข้อผิดพลาด!',
                text: 'ไม่สามารถลงทะเบียนได้ กรุณาลองใหม่อีกครั้ง',
                icon: 'error',
                confirmButtonText: 'ตกลง'
            });
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        Swal.fire({
            title: 'เกิดข้อผิดพลาด!',
            text: 'ไม่สามารถลงทะเบียนได้ กรุณาลองใหม่อีกครั้ง',
            icon: 'error',
            confirmButtonText: 'ตกลง'
        });
    });
});
