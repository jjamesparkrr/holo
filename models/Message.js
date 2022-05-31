const { Model, DataTypes } = require('sequelize')

const sequelize = require('../config/config')

class Message extends Model { }

Message.init(
  {
    message: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: "messages"
  }
)

module.exports = Message