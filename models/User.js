const sequelize = require('../config/config')
const { DataTypes } = require('sequelize')

const pls = require('passport-local-sequelize')

//pls will already define a user w username and pw
const User = pls.defineUser(sequelize, {
  
  //adding columns of the table; dont want to add pw
  username: {
    type: DataTypes.STRING,
    allowNull: false
  }
})



module.exports = User