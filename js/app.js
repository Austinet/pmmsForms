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

//Error codes


//Sign Up form section
const signUpForm = document.getElementById('signUpForm')
if(window.location.href.includes(`signUp.html`)) {
  signUpForm.addEventListener('submit', validate)   
}

function validate(e) {
    e.preventDefault();
 
    let userName = signUpForm.username.value;
    let userEmail = signUpForm.email.value;
    let userPassword = signUpForm.password.value
    let confirmPassword = signUpForm.confirmPassword.value

    //Error codes
    let usernameError = document.querySelector('.username-error')
    let confirmPasswordError = document.querySelector('.confirmPassword-error')
    let emailError = document.querySelector('.email-error')
    let conFirmPasswordError = () => {
        confirmPasswordError.innerText = "Passwords don't match"
        confirmPasswordError.style.visibility = 'visible'
        signUpForm.confirmPassword.style.border = "1px solid #ED1C24"  
    }

    usersDB = localStorage.getItem('dataBase');
    usersDB = JSON.parse(usersDB);

    if(usersDB === null) {
        usersDB = []

        if(userPassword !== confirmPassword) {
            conFirmPasswordError()
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
        //  emailError.innerText = "Email already exists"
    //      } else
            if(user.username === userName) {
                usernameError.style.visibility = 'visible'
                signUpForm.username.style.border = "1px solid #ED1C24"  
            } else if(user.email === userEmail) {
                // alert("Email already exists")
                emailError.innerText = "Email already exists"
                emailError.style.visibility = 'visible'
                signUpForm.email.style.border = "1px solid #ED1C24"  
            } else if(userPassword !== confirmPassword) {
                conFirmPasswordError()
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
    alert("submitted")
    usersDB.push(user)
    localStorage.setItem('dataBase', JSON.stringify(usersDB))    
    window.location.href = `index.html`
}

//Login form section
const signInForm = document.getElementById('signInForm')
if(window.location.href.includes(`index.html`) || document.title = "Login") {
    signInForm.addEventListener('submit', login)
}

function login(e) {
    e.preventDefault();
    let loginName = signInForm.username.value;
    let loginPassword = signInForm.password.value;
    let usernameError = document.querySelector('.username-error')
    let passwordError = document.querySelector('.password-error')

    let userNameError = () => {
        signInForm.username.style.border = "1px solid #ED1C24"
        usernameError.innerText = `User not found, please sign up`
        usernameError.style.visibility = 'visible'
    }
    
    usersDB = localStorage.getItem('dataBase');
    usersDB = JSON.parse(usersDB);
    if(usersDB === null) {
        userNameError()
    } else { 
       let currentUser = usersDB.filter(users => users.username === loginName)
       if(currentUser.length !== 0) {
          if(currentUser[0].password === loginPassword) {
            alert(`Welcome ${currentUser[0].username}`)
            window.location.href=`dashboard.html`
          } else {
            passwordError.innerText = `Incorrect password`
            passwordError.style.visibility = 'visible'
            signInForm.password.style.border = "1px solid #ED1C24"
          }
       } else {
          userNameError()
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
    let emailError = document.querySelector('.email-error')

    usersDB = localStorage.getItem('dataBase');
    usersDB = JSON.parse(usersDB);

    let forgotPasswordUser = usersDB.filter(users => users.email === userEmailAddress)
    if(forgotPasswordUser.length !== 0 ) {
        localStorage.setItem("forgotPasswordUser", JSON.stringify(forgotPasswordUser))
        window.location.href = `resetPassword.html`
    } else {
        emailError.style.visibility = 'visible'
        forgotPasswordForm.email.style.border =  "1px solid #ED1C24"
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

   //Error codes
   let confirmPasswordError = document.querySelector('.confirmPassword-error')
   let conFirmPasswordError = () => {
       confirmPasswordError.innerText = "Passwords don't match"
       confirmPasswordError.style.visibility = 'visible'
       resetPasswordForm.confirmPassword.style.border = "1px solid #ED1C24"  
   }
   
   if(newPassword !== confirmNewPassword) {
     conFirmPasswordError()
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
    let passwordError = document.querySelector('.password-error')

    if(forgotPasswordUser[0].password === recoveredPassword) {
       window.location.href=`dashboard.html`
    } else {
        passwordError.style.visibility = 'visible'
    }
} 
