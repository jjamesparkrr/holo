const {Model, DataTypes} = require('sequelize')

const sequelize = require('../config/config')

class Post extends Model {}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    price: {
      type: DataTypes.DECIMAL(10,2),
      validate: {
        isDecimal: {
          msg: "invalid price format"
        }
      }
    },
    dateFrom: DataTypes.DATE,
    dateTo: DataTypes.DATE

  },
  {
    sequelize,
    // timestamps: false,
    modelName: "posts"
  }
)

module.exports = Post