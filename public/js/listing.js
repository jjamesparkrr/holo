
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
function convertDate(date){
    let d = new Date(date);
    console.log(d)
}
let postId = window.location.pathname.split('/')[2]

let today = new Date();
convertDate(today)

axios.get(`/api/posts/${postId}`, {
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
})
    .then(async res => {
        //want to put the posts on the page
        let post = res.data
        imageList = post.imageKey.split(' ')
        console.log(post)
        document.getElementById('category').innerHTML+=
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
        document.getElementById('listingDateFrom').value = post.dateFrom.substring(0,10)

        document.getElementById('listingDateFrom').innerHTML +=
            `
                    ${post.dateFrom}
                    
            `;
        document.getElementById('listingDateTo').value = post.dateTo.substring(0,10)
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
                aria-current="true" aria-label="Slide ${i+1}"></button>

                `;
            }

        }


    })
    .catch(function (error) {
        let error_message = JSON.stringify(error.response.data)
        if (error_message == '"Unauthorized"') {
            alert("You must be logged in to see more details")
            window.location = "../login"
        }

    });

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