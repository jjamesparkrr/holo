
//display the user's posts
if (localStorage.getItem('token') == "null") {
}
else {

    document.getElementById('profile').style.display = 'block';
}

function postedAgo(date) {
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
function convertDate(date) {
    let d = new Date(date);

    monthToName = {
        1: "January",
        2: "February",
        3: "March",
        4: "April",
        5: "May",
        6: "June",
        7: "July",
        8: "August",
        9: "September",
        10: "October",
        11: "November",
        12: "December"
    }
    return monthToName[d.getMonth()+1] + " " + d.getDate() + " " + d.getFullYear();
}
let postId = window.location.pathname.split('/')[2]


let userId = {id: 0}
axios.get(`/api/posts/${postId}`, {
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
})
    .then(async res => {
        //want to put the posts on the page
        
        let post = res.data
        imageList = post.imageKey.split(' ')

        
        document.getElementById('category').innerHTML +=
            `
            ${post.category}
        `
        document.getElementById('daysAgo').innerHTML +=
            `
            ${postedAgo(post.createdAt)}
        `
        document.getElementById('listingTitle').innerHTML +=
            `
                    ${post.title}
            `;
        document.getElementById('description').innerHTML +=
            `
                    ${post.description}
            `;
        document.getElementById('pricePerDay').innerHTML +=
            `
                    $${post.price}
                    
            `;
        // ADDED DATES
        document.getElementById('listingDateFrom').value = post.dateFrom.substring(0, 10)

        document.getElementById('listingDateFrom').innerHTML +=
            `
                    ${post.dateFrom}
                    
            `;
        document.getElementById('listingDateTo').value = post.dateTo.substring(0, 10)
        document.getElementById('listingDateTo').innerHTML +=
            `       
                    ${post.dateTo}
                    
            `;
        for (let i = 0; i < imageList.length; i++) {

            if (i == 0) {
                document.getElementById('imageCarousel').innerHTML +=
                    `
                <div class="carousel-item active">
                <img id = "listingImg" src="/api/image/${imageList[i]}" class="d-block w-100" >
                </div>
                
            `;
                document.getElementById('carouselIndicators').innerHTML +=
                    `
                <button id="bottomButtons" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${i}" class="active"
              aria-current="true" aria-label="Slide 1"></button>

              `;
            }
            else {
                document.getElementById('imageCarousel').innerHTML +=
                    `
                <div class="carousel-item">
                <img id = "listingImg" src="/api/image/${imageList[i]}" class="d-block w-100" >
                </div>
                
            `;
                document.getElementById('carouselIndicators').innerHTML +=
                    `
                 <button id="bottomButtons" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${i}"
                aria-current="true" aria-label="Slide ${i + 1}"></button>

                `;
            }

        }

        axios.get('/user/user/' + post.User.id, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => {
                document.getElementById('userAvatar').innerHTML +=
                    `
        
                    <img src="/api/image/${res.data.avatar}"  class="rounded-circle"
                    width="75" height ="75">
        
                    `
                document.getElementById('userName').innerHTML += res.data.username
                document.getElementById('countryListing').innerHTML += res.data.country
                document.getElementById('cityListing').innerHTML +=res.data.city +', ' +res.data.state
                document.getElementById('joinDate').innerHTML += convertDate(res.data.createdAt)
                document.getElementById('linkToProfile').href = "/profile/" +res.data.id
            })

    })
    
    .catch(function (error) {
        let error_message = JSON.stringify(error.response.data)
        if (error_message == '"Unauthorized"') {
            alert("You must be logged in to see more details")
            window.location ="login"
        }

    });




document.getElementById('payment').addEventListener('click',event=>{
    window.location = "/rentals/" + postId +"/payment"
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