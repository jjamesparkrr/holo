//display the user's posts
if (localStorage.getItem('token') == "null") {
}
else {

    document.getElementById('profile').style.display = 'block';
}

axios.get(`/api/posts/${localStorage.getItem("postId")}`, {
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
})
    .then(res => {
        //want to put the posts on the page
        let post = res.data

        document.getElementById('title').innerHTML +=
            `
                    ${post.title}
            `;
        // document.getElementById('description').innerHTML +=
        //     `
        //         `
        //do for everything here, make sure you add id's in your listing.html so you can call it here

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