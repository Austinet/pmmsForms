// Password view toggler
const viewPasswordText = document.querySelectorAll('.view-password-text')
const passwordToggleItem = document.querySelectorAll('.passwordToggleItem')

for(let i = 0; i < viewPasswordText.length; i++) {
    viewPasswordText[i].addEventListener('click', ()=> {
        const type = passwordToggleItem[i].getAttribute('type') === 'password' ? 'text': 'password'
        passwordToggleItem[i].setAttribute('type', type)
        viewPasswordText[i].classList.toggle('fa-eye-slash')
    })
}
