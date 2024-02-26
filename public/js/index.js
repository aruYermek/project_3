
function toggleForm(formId) {
    document.getElementById('registrationForm').style.display = (formId === 'registrationForm') ? 'block' : 'none';
    document.getElementById('loginForm').style.display = (formId === 'loginForm') ? 'block' : 'none';
}


function registerUser() {
    const registerForm = document.getElementById('registrationForm');
    const name = registerForm.querySelector('[name="name"]').value;
    const email = registerForm.querySelector('[name="email"]').value;
    const password = registerForm.querySelector('[name="password"]').value;
    const confirmPassword = registerForm.querySelector('[name="confirmPassword"]').value;

    if (password !== confirmPassword) {
        alert("Passwords do not match");
        return false;
    }

    fetch('/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, confirmPassword }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        alert(data.message);
        registerForm.reset();
        toggleForm('loginForm');
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
        alert('Server error occurred');
    });

    return false;
}


function loginUser() {

    const loginForm = document.getElementById('loginForm');
    const username = loginForm.querySelector('[name="username"]').value;
    const password = loginForm.querySelector('[name="password"]').value;


    fetch('/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
    .then(response => response.json())
    .then(data => {

        console.log(data);
        if (data.success) {
            window.location.href = data.redirect;
        } else {
            alert(data.error);
        }
    });

    return false;
}
