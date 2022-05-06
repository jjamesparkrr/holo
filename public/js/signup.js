document.getElementById('signup-btn').addEventListener('click', event => {
  event.preventDefault()
  let newUser = {
    username: document.getElementById('username').value,
    password: document.getElementById('password').value
  }
  console.log(newUser)
  axios.post('/user/register', newUser)
  .then(res=> {
    console.log(res)
    window.location = "login.html"
  })
})