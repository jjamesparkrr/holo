if (localStorage.getItem('token') == "null") {
}
else {
    document.getElementById('profile').style.display = 'block';
}


//profile stuff goes here




function logout() {

    if (localStorage.getItem('token') == "null") {
        alert("Cannot log out: you are not logged in")
    }
    else {
        localStorage.setItem('token', null)
        localStorage.setItem('loggedOut', 1)
        window.location = 'login.html'

    }

}

document.getElementById("logout").addEventListener("click", logout);