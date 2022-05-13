//display the user's posts
axios.get('/user/posts', {
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
})
    .then(res => {
        //want to put the posts on the page
        let posts = res.data
        posts.forEach(post => {
            document.getElementById('title').innerHTML +=
                `
                    ${post.title}
                `;
            document.getElementById('description').innerHTML +=
                `
                `
                //do for everything here, make sure you add id's in your listing.html so you can call it here
        })
    })