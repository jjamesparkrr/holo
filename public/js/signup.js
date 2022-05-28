
// const axios = require('axios')

function makeAllNoneExcept(thisOne) {
  document.getElementById('emailNotValid').style.display = 'none';
  document.getElementById('emailNotSet').style.display = 'none';
  document.getElementById('emailAlrExists').style.display = 'none';
  document.getElementById('invalidUserLength').style.display = 'none';
  document.getElementById('usernameAlrExists').style.display = 'none';
  document.getElementById('usernameNotSet').style.display = 'none';
  document.getElementById('shortPassword').style.display = 'none';
  document.getElementById('errorTOS').style.display = 'none';

  document.getElementById(thisOne).style.display = 'inline';
}


document.getElementById('signup-btn').addEventListener('click', event => {
  event.preventDefault()
  let newUser = {
    username: document.getElementById('username').value,
    email: document.getElementById('email').value,
    password: document.getElementById('password').value
  }

  if (newUser.password.length < 6){
    makeAllNoneExcept('shortPassword');
  }
  else if (document.getElementById('checkTOS').checked == false){
    makeAllNoneExcept('errorTOS');
  }
  else{
    axios.post('/user/register', newUser)
    .then(res => {
      localStorage.setItem("accountSuccess",1);
      window.location = "login"
    })
    .catch(function (error) {
      if (error.response) {

        let error_message = JSON.stringify(error.response.data)
        // alert(error_message)

        let user_alr_exists_string = '"User already exists with'
        console.log(error_message);
        if (error_message == '"Field username is not set"') {
          makeAllNoneExcept('usernameNotSet');
        }
        else if (error_message.slice(0, user_alr_exists_string.length) == user_alr_exists_string) {
          makeAllNoneExcept('usernameAlrExists');
        }
        else if (error_message.includes("wrong username length")) {
          makeAllNoneExcept('invalidUserLength');
        }
        else if (error_message.includes("email already exists")) {
          makeAllNoneExcept('emailAlrExists');
        }
        else if (error_message.includes("email is empty")) {
          makeAllNoneExcept('emailNotSet');
        }
        else if (error_message.includes("not a valid email format")) {
          makeAllNoneExcept('emailNotValid');
        }
        
        

        // alert(JSON.stringify(error.response.data))
      }
    });
    
  }
  
  





})

