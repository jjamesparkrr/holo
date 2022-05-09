
// const axios = require('axios')



document.getElementById('signup-btn').addEventListener('click', event => {
  event.preventDefault()
  let newUser = {
    username: document.getElementById('username').value,
    email: document.getElementById('email').value,
    password: document.getElementById('password').value
  }

  if (newUser.password.length < 6){
    // inline for password too short, must be greater than 6
  }
  else if (document.getElementById('checkTOS').checked == false){
    document.getElementById('errorTOS').style.display = 'inline';
  }
  else if (document.getElementById('checkTOS').checked == false){
    document.getElementById('errorTOS').style.display = 'inline';
  }
  
  axios.post('/user/register', newUser)
    .then(res => {
      alert('Account succesfully registered!')
      window.location = "login.html"
    })


    .catch(function (error) {
      if (error.response) {

        let error_message = JSON.stringify(error.response.data)
        // alert(error_message)

        let user_alr_exists_string = '"User already exists with'

        if (error_message == '"Field username is not set"') {
          document.getElementById('usernameNotSet').style.display = 'inline';
        }
        else if (error_message.slice(0, user_alr_exists_string.length) == user_alr_exists_string) {
          document.getElementById('usernameNotSet').style.display = 'none';
          document.getElementById('usernameAlrExists').style.display = 'inline';
        }
        else if (error_message == '"Field username is not set"') {
          document.getElementById('usernameNotSet').style.display = 'inline';
        }
        

        // alert(JSON.stringify(error.response.data))
      }
    });





})

