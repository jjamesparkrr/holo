

if (localStorage.getItem('token') == "null"){
  document.getElementById('logout').style.display = 'none';
}
else{
  document.getElementById('login').style.display = 'none';
  document.getElementById('signup').style.display = 'none';
  document.getElementById('profile').style.display = 'block';
}

if(localStorage.getItem('welcome') == 1){
  document.getElementById('welcomeUsername').style.display = 'inline'
  localStorage.setItem('welcome',0)
}
else{
  document.getElementById('welcomeUsername').style.display = 'none'
}

const dateFrom = new Date();
const dateTo = new Date();
dateFrom.setDate(dateFrom.getDate() + 1)
dateTo.setDate(dateTo.getDate() + 4)
document.getElementById('queryDateFrom').valueAsDate = dateFrom;
document.getElementById('queryDateTo').valueAsDate = dateTo;


axios.get('/user/user', {
  headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
})
.then(res=>{
  document.getElementById('welcomeUsername').innerHTML += "Welcome to Holo, " + res.data.username
})
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
    window.location = 'login'

  }
  
}

document.getElementById("logout").addEventListener("click", logout);
