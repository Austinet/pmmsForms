// Password view toggler section
const viewPasswordText = document.querySelectorAll('.view-password-text')
const passwordToggleItem = document.querySelectorAll('.passwordToggleItem')

for(let i = 0; i < viewPasswordText.length; i++) {
    viewPasswordText[i].addEventListener('click', ()=> {
        let type = passwordToggleItem[i].getAttribute('type') === 'password' ? 'text': 'password'
        passwordToggleItem[i].setAttribute('type', type)
        viewPasswordText[i].classList.toggle('fa-eye-slash')
    })
}

//User's Database 
let usersDB = []

//Regular expression
let emailRegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

//Sign Up form section
const signUpForm = document.getElementById('signUpForm')
if(window.location.href.includes(`signUp.html`)) {
  signUpForm.addEventListener('submit', validate)   
}

function validate(e) {
    e.preventDefault();
    alert("submitted")
    let userName = signUpForm.username.value;
    let userEmail = signUpForm.email.value;
    let userPassword = signUpForm.password.value
    let confirmPassword = signUpForm.confirmPassword.value

    usersDB = localStorage.getItem('dataBase');
    usersDB = JSON.parse(usersDB);

    if(usersDB === null) {
        usersDB = []

        if(userPassword !== confirmPassword) {
            alert("Passwords don't match")
        } else {
            let newUser = {
                username: userName,
                email: userEmail,
                password: userPassword
            }
            saveUser(newUser)   
        }
    } else {
        usersDB.forEach((user)=> {
            //if(!(emailRegExp.test(userEmail)) {
    //         alert("Email input not valid")
    //     } else
            if(user.username === userName) {
                alert("Username already exists")
            } else if(user.email === userEmail) {
                alert("Email already exists")
            } else if(userPassword !== confirmPassword) {
                alert("Passwords don't match")
            } else {
                let newUser = {
                                username: userName,
                                email: userEmail,
                                password: userPassword
                    }
                    saveUser(newUser)
            } 
        }) 
    }
}


//Save user's details to the database
function saveUser(user) {
    usersDB.push(user)
    localStorage.setItem('dataBase', JSON.stringify(usersDB))    
    window.location.href = `index.html`
}

//Login form section
const signInForm = document.getElementById('signInForm')
if(window.location.href.includes(`index.html`)) {
    signInForm.addEventListener('submit', login)
}

function login(e) {
    e.preventDefault();
    let loginName = signInForm.username.value;
    let loginPassword = signInForm.password.value;
    
    usersDB = localStorage.getItem('dataBase');
    usersDB = JSON.parse(usersDB);
    if(usersDB === null) {
        alert("Please sign up")
    } else { 
       let currentUser = usersDB.filter(users => users.username === loginName)
       if(currentUser.length !== 0) {
          if(currentUser[0].password === loginPassword) {
            alert(`Welcome ${currentUser[0].username}`)
            window.location.href=`dashboard.html`
          } else {
            alert("Incorrect password")
          }
       } else {
           alert("User not found, please sign up")
       }
   }
}

//Forgotten password

let forgotPasswordForm = document.getElementById('forgotPasswordForm')
if(window.location.href.includes(`forgotPassword.html`)) {
    forgotPasswordForm.addEventListener('submit', forgotPassword)   
}

function forgotPassword(e) {
    e.preventDefault()
    let userEmailAddress = forgotPasswordForm.email.value;

    usersDB = localStorage.getItem('dataBase');
    usersDB = JSON.parse(usersDB);

    let forgotPasswordUser = usersDB.filter(users => users.email === userEmailAddress)
    if(forgotPasswordUser.length !== 0 ) {
        localStorage.setItem("forgotPasswordUser", JSON.stringify(forgotPasswordUser))
        window.location.href = `resetPassword.html`
    } else {
        alert("Email address not found")
    }
}

//Reset password
let resetPasswordForm = document.getElementById('resetPasswordForm')
if(window.location.href.includes(`resetPassword.html`)) {
    resetPasswordForm.addEventListener('submit', resetPassword)   
}

function resetPassword(e) {
   e.preventDefault()
   let newPassword = resetPasswordForm.newPassword.value;
   let confirmNewPassword = resetPasswordForm.confirmNewPassword.value;
   let forgotPasswordUser = JSON.parse(localStorage.getItem('forgotPasswordUser'))
   usersDB = JSON.parse(localStorage.getItem('dataBase'))
   
   if(newPassword !== confirmNewPassword) {
     alert("Passwords doesn't match")
   } else {
     usersDB.forEach((users)=> {
        if(users.email === forgotPasswordUser[0].email) {
            users.password = newPassword
            forgotPasswordUser[0].password = newPassword
          
            localStorage.setItem('dataBase', JSON.stringify(usersDB))
            localStorage.setItem("forgotPasswordUser", JSON.stringify(forgotPasswordUser))
            window.location.href=`recoverPassword.html`
        }
     })
   }
}

//Recovered password login
let recoverPasswordForm = document.getElementById('recoverPasswordForm')
if(window.location.href.includes(`recoverPassword.html`)) {
    recoverPasswordForm.addEventListener('submit', recoverPassword)   

    let forgotPasswordUser = JSON.parse(localStorage.getItem('forgotPasswordUser'))
    let currentUserLog = document.querySelector('.currentUser')
    currentUserLog.innerHTML = forgotPasswordUser[0].username
}

function recoverPassword (e) {
    e.preventDefault()
    let recoveredPassword = recoverPasswordForm.recoveredPassword.value;
    let forgotPasswordUser = JSON.parse(localStorage.getItem('forgotPasswordUser'))
    let currentUserLog = document.querySelector('.currentUser')

    if(forgotPasswordUser[0].password === recoveredPassword) {
       window.location.href=`dashboard.html`
    } else (
        alert("Wrong password input")
    )
} 

