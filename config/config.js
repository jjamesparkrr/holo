require('dotenv').config()
const { Sequelize } = require('sequelize')

//setting up connection to mysql workbench to vscode
module.exports = new Sequelize(process.env.LOCAL_URL)
