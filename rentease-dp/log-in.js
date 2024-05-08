const loginForm = document.querySelector('#loginForm');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const validUser = users.find(user => user.email === email && user.password === password);
    
    if (!validUser) {
        return alert('Email or Password incorrect');
    }
    
    alert(`Welcome ${validUser.name}`);
    localStorage.setItem('login_success', JSON.stringify(validUser))
    window.location.href = 'index.html';

});