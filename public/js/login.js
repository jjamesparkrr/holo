if (localStorage.getItem("accountSuccess") == 1){
  document.getElementById("accountCreated").style.display = 'inline';
  localStorage.setItem("accountSuccess",0)
}
if (localStorage.getItem("loggedOut") == 1){
  document.getElementById("loggedOut").style.display = 'inline';
  localStorage.setItem("loggedOut",0)
}

function makeAllNoneExcept(thisOne) {
  document.getElementById('blankUser').style.display = 'none';
  document.getElementById('blankPw').style.display = 'none';
  document.getElementById('invalidLoginPw').style.display = 'none';
  document.getElementById('invalidLoginUser').style.display = 'none';

  document.getElementById(thisOne).style.display = 'inline';
}
document.getElementById('login-btn').addEventListener('click', event => {
  event.preventDefault()
  let loggedUser = {
    username: document.getElementById('username').value,
    password: document.getElementById('password').value
  }
  
  if (loggedUser.username == ''){
    makeAllNoneExcept('blankUser');
  }
  else if (loggedUser.password == ''){
    makeAllNoneExcept('blankPw');
  }
  else{
    axios.post('/user/login', loggedUser)
    .then(res => {
      //the res.data shld be jsonwebtoken aka your badge
      //allows u to have access to authenticated browse 
      //will put this token in local storage

      if (res.data == null){
        makeAllNoneExcept('invalidLoginPw');
      }
      else{
        localStorage.setItem('token', res.data)
        window.location = 'rentals'
      }
      
    })
    .catch(function (error){
      let error_message = JSON.stringify(error.response.data)
      if (error_message == '"wrong username"'){
        makeAllNoneExcept('invalidLoginUser');
      }
    });
  }
  
})

// function logout() {
//   localStorage.setItem('token', null)
//   window.location = 'signup.html'
// }

// document.getElementById("logout").addEventListener("click", logout);