// const { default: axios } = require("axios")

if (localStorage.getItem('token') == "null"){
  document.getElementById('logout').style.display = 'none';
}
else{
  document.getElementById('login').style.display = 'none';
  document.getElementById('signup').style.display = 'none';
  document.getElementById('profile').style.display = 'block';
}




// add comments for each post when u press button for 'add comments'
document.addEventListener('click', event => {
  if (event.target.classList.contains('addcomment')) {
    event.preventDefault()

    let postId = event.target.dataset.post
    console.log(postId)
    console.log(document.getElementById(postId).value)
    
    axios.post('/api/comments', newComment, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }
    )
      .then(res => {
        console.log(res)
      })
    }
})
  
  


//displaying comments when u press button for 'see comments'
  // document.addEventListener('click', event=>{
  //   if(event.target.classList.contains('post')) {
  //     console.log(event.target.dataset.post)
  //     let postId=event.target.dataset.post
  //     axios.get(`/api/posts/${postId}`, {
  //       headers: {
  //         'Authorization': `Bearer ${localStorage.getItem('token')}`
  //       }
  //     })
  //     .then(res=> {
  //       let comments = res.data.comments
  //       document.getElementById(`comments ${postId}`).innerHTML = "";
  //       comments.forEach(comment=> {
  //         document.getElementById(`comments ${postId}`).innerHTML+=
  //         `${comment.body} 
  //         <br>
  //         <p id=commentTime>(posted at: ${comment.createdAt})</p>
          
  //         <hr>`
  //       })
  //     })
  // }})





function logout() {
  
  if (localStorage.getItem('token') == "null"){
    alert("Cannot log out: you are not logged in")
  }
  else{
    localStorage.setItem('token', null)
    localStorage.setItem('loggedOut', 1)
    window.location = 'login.ejs'

  }
  
}

document.getElementById("logout").addEventListener("click", logout);
