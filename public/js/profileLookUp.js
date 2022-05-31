

if (localStorage.getItem('token') == "null") {
}
else {
    document.getElementById('profile').style.display = 'block';
}

let userId = window.location.pathname.split('/')[2]

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
        string = Math.round(seconds)
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
        string = minutes
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
        string = hours
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
    string = days
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
axios.get('/user/user/' +userId, {
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
})
    .then(res => {
        //setting default values on profile page for that user

        if (res.data.firstName) {
            document.getElementById('showFirst').innerHTML += res.data.firstName
          
        }

        if (res.data.lastName) {
            document.getElementById('showLast').innerHTML += res.data.lastName
 
        }

        if (res.data.email) {
            document.getElementById('showEmail').innerHTML += res.data.email
         
        }

        if (res.data.phoneNum) {
            document.getElementById('showPhone').innerHTML += res.data.phoneNum

        }

        if (res.data.country) {
            document.getElementById('showCountry').innerHTML += res.data.country
            document.getElementById('showCountryUnderAvatar').innerHTML += res.data.country
        }


        if(res.data.city) {
            document.getElementById('showCity').innerHTML += res.data.city
        }
        
        if(res.data.state){
            document.getElementById('showState').innerHTML += res.data.state          
        }
        

        if (res.data.firstName && res.data.lastName){
            document.getElementById('showFirstLast').innerHTML += res.data.firstName + ' ' + res.data.lastName
        }
        
        if (res.data.city && res.data.state){
            document.getElementById('showCityState').innerHTML += res.data.city + ', ' + res.data.state  
        }
        document.getElementById('blueTitle').innerHTML += res.data.username + "'s posts"
        document.getElementById('usernameUnderAvatar').innerHTML =  res.data.username
        document.getElementById('avatarIcon').src = "/api/image/" + res.data.avatar
    })

axios.get('/user/userPosts/' + userId, {
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
})
    .then(res => {
        //want to put the posts on the page
        let posts = res.data
        posts.forEach(async post => {
            firstImage = post.imageKey.split(' ')[0]
            document.getElementById('row').innerHTML +=
            `
            <div class="col"> 
                
                <div id = "oneCard" class="card" style="width: 18rem;">
                    <a class = "entireLink" href ="rentals/${post.id}" id = "${post.id}">
                     <img src="../api/image/${firstImage}" class="card-img-top" alt="..." style = "height: 200px">
                    <div class="card-body">
                        <h5 class="card-title" style ="font-family:serif; font-weight:bold; font-size:20px">${post.title}</h5>
                        <p class="card-text">Description: ${post.description}</p>
                        <p class="card-text">$${post.price} per day</p>
                        <p class="card-text text-muted" style = "font-size: 12px">${convertDate(post.createdAt)} by ${post.User.username} </p>
                    </div>
                    </a>
                </div>
                
            </div>

            `;




        })


    })








function logout() {

    if (localStorage.getItem('token') == "null") {
        alert("Cannot log out: you are not logged in")
    }
    else {
        localStorage.setItem('token', null)
        localStorage.setItem('loggedOut', 1)
        window.location = 'login'

    }

}

document.getElementById("logout").addEventListener("click", logout);