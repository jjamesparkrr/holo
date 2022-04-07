// const res = require("express/lib/response");
// const { LoginInfo } = require("../model");

document.getElementById('signBtn').addEventListener('click', event => {
   document.getElementById('signForm').style.visibility = 'visible'
    
})

const getLogin = async function () {
    const res = await fetch("/api/login");
    return res.json();
}

const addLogin = async function (LoginInfo) {
    const res = await fetch("/api/login", {
        method: "POST",
        headers: {
            "content-Type": "application/json",
        },
        body: JSON.stringify(LoginInfo)
    });
    return res.json();
}

document.getElementById("submitBtn").addEventListener("click", (event)=> {
    event.preventDefault();

    addLogin({
        email: document.getElementById("emailInput").value,
        password: document.getElementById("passwordInput").value
    })
        .then((LoginInfo)=> {
            document.getElementById("emailInput").value = '';
            document.getElementById("passwordInput").value = '';
            document.getElementById('signForm').style.visibility = 'hidden'
            res.json(LoginInfo);
            

        })
        
        .catch((err)=>console.error(err))
});