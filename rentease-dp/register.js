const registerForm = document.querySelector('#registerForm');
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const firstName = document.querySelector('#firstName').value;
    const lastName = document.querySelector('#lastName').value;
    const email = document.querySelector('#email').value;
    const birthDate = document.querySelector('#birthDate').value;
    const password = document.querySelector('#password').value;
    
    
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const isUserRegister = users.find(user => user.email === email);
    
    if (isUserRegister) {
        return alert('This email is already registered');
    }
    
    users.push({
        name: firstName  ,
        lastname:lastName,
        email: email,
        birthDate: birthDate,
        password: password
    });
    
    localStorage.setItem('users', JSON.stringify(users));
    alert('Successful registration!');

    //redirection Log In
    window.location.href='login.html';
});