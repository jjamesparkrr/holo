

//creating and submitting new post
document.getElementById('submit').addEventListener('click', event => {
  event.preventDefault()
  let newPost = {
    title: document.getElementById('title').value,
    content: document.getElementById('content').value
  }

  //headers part is to make sure it knows it's authenticated
  axios.post('/api/posts', newPost, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  }
  )
    .then(res => {
      console.log(res.data)
    })
})

//display the user's posts
axios.get('/user/posts', {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
})
  .then(res => {
    console.log(res) //array of objects
    //want to put the posts on the page
    let posts = res.data
    posts.forEach(post => {
      document.getElementById('userPosts').innerHTML +=
        `
        <div class="card text-center bigcard">
          <div class="card-header">
            Post by ${post.User.username}
          </div>
          <div class="card-body">
              <h5 class="card-title">${post.title}</h5>
              <p class="card-text">${post.content} </p>
              <button class="delete" data-post="${post.id}">Delete Post</button>
          </div>
          <div class="card-footer text-muted">
             Posted at: ${post.createdAt}
          </div>
          
        </div>
        <br>
      `
    })
  })

//delete post
document.addEventListener('click', event => {
  if (event.target.classList.contains('delete')) {

    let postId = event.target.dataset.post

    axios.delete(`/api/posts/${postId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('badge')}`
      }
    }
    )
      .then(res => {
        console.log(res)
      })
  }
})

function logout() {
  localStorage.setItem('token', null)
  window.location = 'index.ejs'
}

document.getElementById("logout").addEventListener("click", logout);


