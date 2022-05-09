if (localStorage.getItem('token') == "null") {
    document.getElementById('logout').style.display = 'none';
}
else {
    document.getElementById('login').style.display = 'none';
    document.getElementById('signup').style.display = 'none';
}
document.getElementById('addRental-btn').addEventListener('click', event => {
    event.preventDefault()
    let newPost = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value
    }

    //headers part is to make sure it knows it's authenticated
    axios.post('/api/posts', newPost, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }
    )
        .then(res => {
            console.log(res.data)
        })
})

function logout() {

    if (localStorage.getItem('token') == "null") {
        alert("Cannot log out: you are not logged in")
    }
    else {
        localStorage.setItem('token', null)
        window.location = 'login.html'

    }

}

document.getElementById("logout").addEventListener("click", logout);