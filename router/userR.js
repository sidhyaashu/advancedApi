const express = require('express')
const router = express.Router()
const userController = require('../controllers/userC.js')

// router.route('/')
  //  .get('/:id',userController.getUser) //to get user
  //  .patch('/:id',userController.updateUser) // to update user
  //  .delete('/:id',userController.deleteUser) // to delete user
  //  .put('/:id/follow',userController.followUser) // follow
  //  .put('/:id/unfollow',userController.unfollowUser)//unfollow


    router.get('/:id',userController.getUser) //to get user
    router.patch('/:id',userController.updateUser) // to update user
    router.delete('/:id',userController.deleteUser) // to delete user
    router.put('/:id/follow',userController.followUser) // follow
    router.put('/:id/unfollow',userController.unfollowUser)//unfollow



module.exports = router