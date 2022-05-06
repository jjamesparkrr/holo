require("dotenv").config

const axios = require('axios')

const express = require("express")
const passport = require("passport")
const { join } = require("path");
const {User} = require("./models")
const {Strategy: JWTStrategy, ExtractJwt} = require('passport-jwt')
const app = express();


//MIDDLEWARE (should always be there in server.js)
app.use(express.static(join(__dirname, "public")))
app.use(express.urlencoded({ extended: true }))
app.use(express.json());


app.use(passport.initialize())
app.use(passport.session())

passport.use(User.createStrategy())
passport.serializeUser((user,done)=>{
  done(null,user.id)
})

passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), secretOrKey: process.env.SECRET}, ({id}, cb)=> User.findOne({where:{id}})
    .then(user=>cb(null,user))
    .catch(err=>cb(err))))

app.use(require("./routes"))

async function init() {
  await require("./config/config.js").sync()
  app.listen(process.env.PORT || 3001)
}

init();
