
//display the user's posts
if (localStorage.getItem('token') == "null") {
}
else {

    document.getElementById('profile').style.display = 'block';
}


let postId = window.location.pathname.split('/')[2]


axios.get(`/api/posts/${postId}`, {
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
})
    .then(async res => {
        //want to put the posts on the page
        let post = res.data
        console.log(post)
        document.getElementById('title').innerHTML +=
            `
                    ${post.title}
            `;
        document.getElementById('description').innerHTML +=
            `
                    ${post.description}
            `;
        document.getElementById('description').innerHTML +=
        `
                ${post.description}
        `;
        document.getElementById('price').innerHTML +=
            `
                    $${post.price} per day
                    
            `;
        // ADDED DATES
        document.getElementById('dateFrom').innerHTML +=
            `
                    From: ${dateFrom.toLocaleDateString()}
                    
            `;
        document.getElementById('dateTo').innerHTML +=
            `
                    To: ${dateTo.toLocaleDateString()}
                    
            `;


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