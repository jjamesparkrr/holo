const sequelize = require('../config/config')
const { DataTypes } = require('sequelize')

const pls = require('passport-local-sequelize')

//pls will already define a user w username and pw
const User = pls.defineUser(sequelize, {
  
  //adding columns of the table; dont want to add pw
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [4,16],
        msg: "wrong username length"
      }
    }
    
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      msg: "email already exists"
    },
    validate: {
      notEmpty: {
        msg: "email is empty"
      },
      isEmail: {
        msg: "not a valid email format"
      }
    }
  },
  avatar: {
    type: DataTypes.STRING,
    defaultValue: "sbcf-default-avatar.png",
  },
  firstName: DataTypes.STRING,
  lastName: DataTypes.STRING,
  country: DataTypes.STRING,
  city: DataTypes.STRING,
  state: DataTypes.STRING,
  rating: DataTypes.DECIMAL,
  phoneNum: DataTypes.STRING
})



module.exports = User