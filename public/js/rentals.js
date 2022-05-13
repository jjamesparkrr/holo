if (localStorage.getItem('token') == "null") {
    document.getElementById('logout').style.display = 'none';
}
else {
    document.getElementById('login').style.display = 'none';
    document.getElementById('signup').style.display = 'none';
    document.getElementById('profile').style.display = 'block';
}
function convertDate(date) {
    var d = new Date(date);
    return d.toDateString();
}
// getting the posts and display them
axios.get('/api/posts')
    .then(res => {
        console.log(res) //array of objects
        //want to put the posts on the page
        let posts = res.data
        posts.forEach(post => {
            document.getElementById('row').innerHTML +=
                `
                <div class="col"> 
                    <a href="listing.html">
                    <div id = "oneCard"class="card" style="width: 18rem;">
                         <img src="./assets/logo.png" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${post.title}</h5>
                            <p class="card-text">Description: ${post.description}</p>
                            <p class="card-text">$${post.price} per day</p>
                            <p class="card-text">${convertDate(post.createdAt)} by ${post.User.username} </p>
                        </div>
                    </div>
                    </a>
                </div>

            `
        })
    })
document.getElementById('addRental-btn').addEventListener('click', event => {
    event.preventDefault()
    let newPost = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        price: document.getElementById('price').value

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
        .catch(function(error){
            alert("Must be logged in")
        })
})

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