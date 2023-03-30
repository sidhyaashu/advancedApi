const express = require('express')
const router = express.Router()
const postControllers = require('../controllers/postC.js')

router.get('/:id',postControllers.getPostById) //get single post
router.post('/',postControllers.createPost) // create post
router.put('/:id',postControllers.updatePost) //update post
router.delete('/id',postControllers.deletePost) //delete post
router.put('/:id/like',postControllers.likeAndDislike) // like and dislike
router.get('/:id/timeline',postControllers.getTimelinePost) // get timelinepost

module.exports = router