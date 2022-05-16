
if (localStorage.getItem('token') == "null") {
    document.getElementById('logout').style.display = 'none';
}
else {
    document.getElementById('login').style.display = 'none';
    document.getElementById('signup').style.display = 'none';
    document.getElementById('profile').style.display = 'block';
}
function convertDate(date) {
    let d = new Date(date);
    let today = new Date();
    // get total seconds between the times
    let delta = Math.abs(today.getTime() - d.getTime()) / 1000;

    // calculate (and subtract) whole days
    let days = Math.floor(delta / 86400);
    delta -= days * 86400;

    // calculate (and subtract) whole hours
    let hours = Math.floor(delta / 3600) % 24;
    delta -= hours * 3600;

    // calculate (and subtract) whole minutes
    let minutes = Math.floor(delta / 60) % 60;
    delta -= minutes * 60;

    // what's left is seconds
    let seconds = delta % 60;  // in theory the modulus is not required
    let string = ""
    if (minutes == 0) {
        string = "Posted " + Math.round(seconds)
        if (Math.round(seconds) > 1) {
            string += " seconds "
        }
        else {
            string += " second "
        }
        string += " ago"
        return string;
    }
    if (hours == 0) {
        string = "Posted " + minutes
        if (minutes > 1) {
            string += " minutes "
        }
        else {
            string += " minute "
        }
        string += " ago"
        return string;
    }
    if (days == 0) {
        string = "Posted " + hours
        if (hours > 1) {
            string += " hours "
        }
        else {
            string += " hour "
        }
        string += minutes
        if (minutes > 1) {
            string += " minutes "
        }
        else {
            string += " minute "
        }
        string += " ago"
        return string;
    }
    string = "Posted " + days
    if (days > 1) {
        string += " days "
    }
    else {
        string += " day "
    }
    string += hours
    if (hours > 1) {
        string += " hours "
    }
    else {
        string += " hour "
    }
    string += " ago"
    return string;




}
// getting the posts and display them
axios.get('/api/posts')
    .then(res => {
        //want to put the posts on the page
        let posts = res.data
        posts.forEach(async post => {
            document.getElementById('row').innerHTML +=
                `
                <div class="col"> 
                    <a class = "entireLink" href = "listing.html" id = "${post.id}">
                    <div id = "oneCard" class="card" style="width: 18rem;">
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

                `;




        })
        let userSelection = document.getElementsByClassName('entireLink');
        for (let i = 0; i < userSelection.length; i++) {
            userSelection[i].addEventListener('click', event => {
                if (event.target.classList.contains('card-img-top') || event.target.classList.contains('card-text') ||
                    event.target.classList.contains('card-body') || event.target.classList.contains('card-title')) {
                    event.preventDefault()
                    let postId = userSelection[i].id
                    localStorage.setItem('postId', postId)
                    window.location = "listing.html"
                }

            }
            )
        }

    })

function makeAllNoneExcept(thisOne) {
    document.getElementById('noTitleGiven').style.display = 'none';
    document.getElementById('noPriceGiven').style.display = 'none';
    document.getElementById('noDescriptionGiven').style.display = 'none';
    document.getElementById('addRentalNotLoggedIn').style.display = 'none';
    document.getElementById('invalidPriceFormat').style.display = 'none';

    document.getElementById(thisOne).style.display = 'inline';
}
document.getElementById('addRental-btn').addEventListener('click', event => {
    event.preventDefault()
    let newPost = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        price: document.getElementById('price').value

    }
    if (newPost.title == '') {
        makeAllNoneExcept('noTitleGiven')
    }
    else if (newPost.description == '') {
        makeAllNoneExcept('noDescriptionGiven')
    }
    else if (newPost.price == '') {
        makeAllNoneExcept('noPriceGiven')
    }
    else {
        //headers part is to make sure it knows it's authenticated
        axios.post('/api/posts', newPost, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }
        )
            .then(res => {
                console.log(res)
                window.location = "rentals.html"
            })
            .catch(function (error) {
                let error_message = JSON.stringify(error.response.data)
                if (error_message == '"Unauthorized"') {
                    makeAllNoneExcept("addRentalNotLoggedIn");
                }
                else if (error_message.includes("invalid price format")) {
                    makeAllNoneExcept("invalidPriceFormat");
                }

            })
    }



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