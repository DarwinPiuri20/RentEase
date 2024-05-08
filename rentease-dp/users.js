let formRegister = document.querySelector("#registerForm");

const loadUsers = () => {
    return JSON.parse(localStorage.getItem('users')) ?? [];
}

if (formRegister){
    formRegister.addEventListener('submit', e => {
        e.preventDefault();
        console.log('asdasd')
// all elements of the form that are transformed into an object
        const data = Object.fromEntries(
            new FormData(e.target)
        );

        let users = loadUsers();
        users.push(data);
        localStorage.setItem('users', JSON.stringify(users));
    })
}

let formLogin = document.querySelector("#loginForm");

if (formLogin){
    formLogin.addEventListener('submit', e => {
        e.preventDefault();
        // all elements of the form that are transformed into an object
        const data = Object.fromEntries(
            new FormData(e.target)
        );
        let users = loadUsers();
        
        let userFind = users.filter((user)=>{
            if (user.email == data.email && user.password == data.password){
                return user;
            }
        });
        if (userFind.length){
            localStorage.setItem('logged', JSON.stringify(userFind[0]));
            window.location.href='index.html'
        }else{
            alert("Los datos no existen")
        }
        
    })
}

function getUserLogged(){
    return JSON.parse(localStorage.getItem('logged'))?? null;
}

function setNameHeader() {
    let userLogged= getUserLogged();
    if (userLogged){
        let welcomeDiv = document.getElementById("userName");
        if (welcomeDiv){
            welcomeDiv.innerHTML='Welcome, '+ userLogged.name +' ' + userLogged.lastname
        }
        
    }
 }
setNameHeader();


let formUpdate = document.querySelector("#update-user");

function addValuesUpdateForm() {
    let user = getUserLogged();
    if (user){
        formUpdate.querySelector("input[name='name']").value = user.name
        formUpdate.querySelector("input[name='email']").value = user.email
        formUpdate.querySelector("input[name='lastname']").value = user.lastname
        formUpdate.querySelector("input[name='age']").value = user.birhDate
        formUpdate.querySelector("input[name='password']").value = user.password
        formUpdate.querySelector("input[name='gender']").value = user.gender
    }
}
if (formUpdate){
    addValuesUpdateForm();
    
    
    formUpdate.addEventListener('submit', e => {
        e.preventDefault();
        const data = Object.fromEntries(
            new FormData(e.target)
        );
        let userLogged = getUserLogged();
        let users = loadUsers();
        if (userLogged){
            
            data["email"]= userLogged.email;
            data["password"]= userLogged.password;
            
            let newUsers = users.map((user)=>{
   
                if (user.email == data.email){
                    user = data;
                }
        
                return user;
            });


            localStorage.setItem('users', JSON.stringify(newUsers));
            localStorage.setItem('logged', JSON.stringify(data));
        }
 

    })
}
