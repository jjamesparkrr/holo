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
    price: DataTypes.DECIMAL(10,2)
    
  },
  {
    sequelize,
    // timestamps: false,
    modelName: "posts"
  }
)

module.exports = Post