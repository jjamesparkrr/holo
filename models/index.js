const router = require('express').Router()


const Post = require('./Post')
const Comment = require('./Comment')
const User = require('./User')
const Message = require('./Message')


User.hasMany(Post, {
  foreignKey:'userId'
})

Post.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
})



Post.hasMany(Comment, {
  foreignKey: 'postId',
  onDelete: 'CASCADE'
})
Comment.belongsTo(Post, {
  foreignKey: 'postId'
})

Comment.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
})

Message.belongsTo(Post, {
  foreignKey: 'postId'
})

Message.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
})

module.exports = {Post, Comment, User, Message}