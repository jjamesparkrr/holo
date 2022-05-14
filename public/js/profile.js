if (localStorage.getItem('token') == "null") {
}
else {
    document.getElementById('profile').style.display = 'block';
}


// getting the posts and display them
// axios.get('/user/posts', {
//     headers: {
//       'Authorization': `Bearer ${localStorage.getItem('token')}`
//     }
//   })
//     .then(res => {
//         //want to put the posts on the page
//         let posts = res.data
//         posts.forEach(post => {
//             document.getElementById('row').innerHTML +=
//                 `
//                 <div class="col"> 
//                     <a href="listing.html">
//                     <div id = "oneCard"class="card" style="width: 18rem;">
//                          <img src="./assets/logo.png" class="card-img-top" alt="...">
//                         <div class="card-body">
//                             <h5 class="card-title">${post.title}</h5>
//                             <p class="card-text">Description: ${post.description}</p>
//                             <p class="card-text">$${post.price} per day</p>
//                             <p class="card-text">${convertDate(post.createdAt)} by ${post.User.username} </p>
//                         </div>
//                     </div>
//                     </a>
//                 </div>

//             `
//         })
//     })




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