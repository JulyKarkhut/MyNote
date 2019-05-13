const client_email = document.querySelector('.client-email');
const client_password = document.querySelector('.client-password');

const user = {
    login: client_email,
    password: client_password,
}
document.querySelector('.sign_in').addEventListener('click', sign_in_user);

document.querySelector('.sign_up').addEventListener('click', sign_up_user);

function sign_in_user(e) {
    if (localStorage['login_' + client_email.value] == client_email.value) {
        if (localStorage['password_' + client_email.value] == client_password.value) {
            window.location.href = 'main_notes.html';
            localStorage['current_user'] = client_email.value;
        }
        else {
            alert("Wrong password. Please try again")
            e.preventDefault();
        }
    }
    else {
        alert("Wrong login. Please try again")
        e.preventDefault();
    }
}


function sign_up_user(e) {
    if (client_email.value != '') {
        localStorage['login_' + client_email.value] = client_email.value;
    }
    else {
        e.preventDefault();
        alert('Please enter your e-mail');
    }
    if (client_password.value != '') {
        localStorage['password_' + client_email.value] = client_password.value;
        window.location.href = 'main_notes.html';
        localStorage['current_user'] = client_email.value;
    }
    else {
        e.preventDefault();
        alert('Please enter password');
    }
}
