// phan dang nhap tai khoan admin
const loginform = document.getElementById('signin-form');

loginform.addEventListener('submit', async function (event) {
    event.preventDefault();

    const formData = new FormData(loginform);
    const response = await fetch('/login-admin', {
        method: 'POST',
        body: formData
    });

    const responseData = await response.json();   

    if(responseData.success) {
        // Reset form after 3 seconds
        alert(responseData.message)        
        window.location.href = '/home-page-admin';
    } else {
        // Reset form after 3 seconds
        alert(responseData.message)                                                    
        loginform.reset(); // Reset form fields 
    }        
});