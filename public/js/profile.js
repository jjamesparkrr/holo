

if (localStorage.getItem('token') == "null") {
}
else {
    document.getElementById('profile').style.display = 'block';
}

let userId = window.location
console.log(userId)
// userId.search = "hi"
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
axios.get('/user/user', {headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
}})
.then(res=>{
    document.getElementById('avatarIcon').src ="./api/image/" + res.data.avatar
})

axios.get('/user/userPosts', {
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
                         <img src="./api/image/${firstImage}" class="card-img-top" alt="..." style = "height: 200px">
                        <div class="card-body">
                            <h5 class="card-title">${post.title}</h5>
                            <p class="card-text">Description: ${post.description}</p>
                            <p class="card-text">$${post.price} per day</p>
                            <p class="card-text text-muted">${convertDate(post.createdAt)} by ${post.User.username} </p>
                        </div>
                        </a>
                    </div>
                    
                </div>

                `;




        })


    })





document.getElementById('addAvatar-btn').addEventListener('click', event => {
    event.preventDefault()

    let imageFile = document.getElementById('imageUpload').files
    let fd = new FormData();
    for (let i = 0; i < imageFile.length; i++) {
        fd.append('image', imageFile[i])
    }
    
    
    axios.get('/user/user', {headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
    }})
    .then(res3=>{
        axios.post('/api/images', fd)
        .then(async res => {
            axios.put('/user/update', {avatar: res.data.imagePath, id: res3.data.id})
                .then(res2=>{
                    window.location = 'profile'
                })
            

        })
    })
    .catch(err=>{
        alert(err)
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