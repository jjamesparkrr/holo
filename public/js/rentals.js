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
        string =  Math.round(seconds)
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
        string =  minutes
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
        string =  hours
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
    string =  days
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
let param = window.location.pathname.split('/')[2]
let query = window.location.search

if (query.includes('?')){
    let dateFrom = new Date(window.location.search.split('&')[1].substring(3))
    let dateTo = new Date(window.location.search.split('&')[2].substring(3))
    document.getElementById('queryDateFrom').valueAsDate = dateFrom;
    document.getElementById('queryDateTo').valueAsDate = dateTo;
    axios.get('/api/search' + query)
    .then(res=>{
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
}
else if (isNaN(param) && param){
    let dateFrom = new Date();
    let dateTo = new Date();
    dateFrom.setDate(dateFrom.getDate() + 1)
    dateTo.setDate(dateTo.getDate() + 4)
    document.getElementById('queryDateFrom').valueAsDate = dateFrom;
    document.getElementById('queryDateTo').valueAsDate = dateTo;
    axios.get('/api/category/' + param)
    .then(res=>{
        let posts = res.data
        posts.forEach(async post => {
            firstImage = post.imageKey.split(' ')[0]
            document.getElementById('row').innerHTML +=
                `
                <div class="col"> 
                    
                    <div id = "oneCard" class="card" style="width: 18rem;">
                        <a class = "entireLink" href ="${post.id}" id = "${post.id}">
                         <img src="../api/image/${firstImage}" class="card-img-top" alt="..." style = "height: 200px">
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
}
else if (isNaN(param) && param){
    axios.get('/api/category/' + param)
    .then(res=>{
        let posts = res.data
        
        posts.forEach(async post => {
            firstImage = post.imageKey.split(' ')[0]
            document.getElementById('row').innerHTML +=
                `
                <div class="col"> 
                    
                    <div id = "oneCard" class="card" style="width: 18rem;">
                        <a class = "entireLink" href ="/rentals/${post.id}" id = "${post.id}">
                         <img src="../api/image/${firstImage}" class="card-img-top" alt="..." style = "height: 200px">
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
}
else{
    let dateFrom = new Date();
    let dateTo = new Date();
    dateFrom.setDate(dateFrom.getDate() + 1)
    dateTo.setDate(dateTo.getDate() + 4)
    document.getElementById('queryDateFrom').valueAsDate = dateFrom;
    document.getElementById('queryDateTo').valueAsDate = dateTo;
    axios.get('/api/posts')
    .then(res => {
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
}
// if (query.includes('?')){
//     let dateFrom = new Date(window.location.search.split('&')[1].substring(3))
//     let dateTo = new Date(window.location.search.split('&')[2].substring(3))
//     document.getElementById('queryDateFrom').valueAsDate = dateFrom;
//     document.getElementById('queryDateTo').valueAsDate = dateTo;
//     axios.get('/api/search' + query)
//         .then(res=>{
//             console.log(res.data)
//         //want to put the posts on the page
//             let posts = res.data
//             posts.forEach(async post => {
//                 firstImage = post.imageKey.split(' ')[0]
//                 document.getElementById('row').innerHTML +=
//                     `
//                     <div class="col"> 
                        
//                         <div id = "oneCard" class="card" style="width: 18rem;">
//                             <a class = "entireLink" href ="rentals/${post.id}" id = "${post.id}">
//                                 <img src="./api/image/${firstImage}" class="card-img-top" alt="..." style = "height: 200px">
//                             <div class="card-body">
//                                 <h5 class="card-title">${post.title}</h5>
//                                 <p class="card-text">Description: ${post.description}</p>
//                                 <p class="card-text">$${post.price} per day</p>
//                                 <p class="card-text">${convertDate(post.createdAt)} by ${post.User.username} </p>
//                             </div>
//                             </a>
//                         </div>
                        
//                     </div>
//                     `;
//         })
//     })
// }
// else{
//     let dateFrom = new Date();
//     let dateTo = new Date();
//     dateFrom.setDate(dateFrom.getDate() + 1)
//     dateTo.setDate(dateTo.getDate() + 4)
//     document.getElementById('queryDateFrom').valueAsDate = dateFrom;
//     document.getElementById('queryDateTo').valueAsDate = dateTo;
//     axios.get('/api/posts')
//     .then(res => {
//         //want to put the posts on the page
//         let posts = res.data
//         posts.forEach(async post => {
//             firstImage = post.imageKey.split(' ')[0]
//             document.getElementById('row').innerHTML +=
//                 `
//                 <div class="col"> 
                    
//                     <div id = "oneCard" class="card" style="width: 18rem;">
//                         <a class = "entireLink" href ="rentals/${post.id}" id = "${post.id}">
//                         <img src="./api/image/${firstImage}" class="card-img-top" alt="..." style = "height: 200px">
//                         <div class="card-body">
//                             <h5 class="card-title">${post.title}</h5>
//                             <p class="card-text">Description: ${post.description}</p>
//                             <p class="card-text">$${post.price} per day</p>
//                             <p class="card-text text-muted">${convertDate(post.createdAt)} by ${post.User.username} </p>
//                         </div>
//                         </a>
//                     </div>
                    
//                 </div>

//                 `;
//         })
//     })
// }
function makeAllNoneExcept(thisOne) {
    document.getElementById('noTitleGiven').style.display = 'none';
    document.getElementById('noPriceGiven').style.display = 'none';
    document.getElementById('noDescriptionGiven').style.display = 'none';
    document.getElementById('addRentalNotLoggedIn').style.display = 'none';
    document.getElementById('invalidPriceFormat').style.display = 'none';

    document.getElementById('noDateFromGiven').style.display = 'none';
    document.getElementById('noDateToGiven').style.display = 'none';

    document.getElementById(thisOne).style.display = 'inline';
}
document.getElementById('addRental-btn').addEventListener('click', event => {
    event.preventDefault()
    let newPost = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        price: document.getElementById('price').value,
        dateFrom: document.getElementById('dateFrom').value,
        dateTo: document.getElementById('dateTo').value,
        category: document.getElementById('category').value,
    }
    let imageFile = document.getElementById('imageUpload').files
    let fd = new FormData();
    for (let i = 0; i < imageFile.length; i ++){
        fd.append('image', imageFile[i])
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
    else if (newPost.dateFrom == '') {
        makeAllNoneExcept('noDateFromGiven')
    }
    else if (newPost.dateTo == '') {
        makeAllNoneExcept('noDateToGiven')
    }
    else {
        //headers part is to make sure it knows it's authenticated
        axios.post('/api/images', fd)
            .then(res => {
                
          
                if (res.data.length > 5){
                    alert("You can only choose up to 5 images!")
                }
                else if (res.data.length == 0){
                    alert("You have chosen to post with no images!")
                }
                newPost.imageKey = res.data.imagePath
            })
            .then(res=> {
                axios.post('/api/posts', newPost, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                }
                )
                    .then(res => {
                        window.location = "/rentals"
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
            })
            .catch(err => {
                alert(err)
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
        window.location = 'login'
    }
}

document.getElementById("logout").addEventListener("click", logout);