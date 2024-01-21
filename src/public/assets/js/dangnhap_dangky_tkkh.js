document.addEventListener('DOMContentLoaded', function () {
    // phan dang ky tai khoan khach hang
    const registerForm = document.getElementById('register-form');
    const statusMessage = document.getElementById('statusMessage');
    const emaildk = document.getElementById('emaildk');
    
    registerForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const formData = new FormData(registerForm);
        const response = await fetch('/dang-ky-tkkh', {
            method: 'POST',
            body: formData
        });

        const responseData = await response.json();

        // Display message
        statusMessage.textContent = responseData.message;
        statusMessage.style.color = responseData.success ? 'blue' : 'red';

        if(responseData.success) {
            // Reset form after 3 seconds
            setTimeout(function () {
                statusMessage.textContent = ''; // Clear the message
                statusMessage.style.color = ''; // registerForm.reset(); 
                registerForm.reset(); // Reset form fields 
            }, 3000);
        } else {
            // Reset form after 3 seconds
            setTimeout(function () {
                statusMessage.textContent = ''; // Clear the message
                statusMessage.style.color = ''; // registerForm.reset();                                                             
                emaildk.value = ''; 
            }, 3000);
        }        
    });

    // phan dang nhap tai khoan khach hang
    const loginform = document.getElementById('login-form');
    const statusMessageLogin = document.getElementById('statusMessageLogin');    

    loginform.addEventListener('submit', async function (event) {
        event.preventDefault();

        const formData = new FormData(loginform);
        const response = await fetch('/dang-nhap-tkkh', {
            method: 'POST',
            body: formData
        });

        const responseData = await response.json();

        // Display message
        statusMessageLogin.textContent = responseData.message;
        statusMessageLogin.style.color = responseData.success ? 'blue' : 'red';

        if(responseData.success) {
            // Reset form after 3 seconds
            setTimeout(function () {
                statusMessageLogin.textContent = ''; // Clear the message
                statusMessageLogin.style.color = ''; 
                loginform.reset(); // Reset form fields 
            }, 3000);
            window.location.href = '/';
        } else {
            // Reset form after 3 seconds
            setTimeout(function () {
                statusMessageLogin.textContent = ''; // Clear the message
                statusMessageLogin.style.color = '';                                                          
                loginform.reset(); // Reset form fields 
            }, 3000);
        }        
    });

});
                                            
                                     