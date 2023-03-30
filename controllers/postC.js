const User = require('../models/userM.js')
const Post = require('../models/postM.js')
const mongoose = require('mongoose')


//create post
const createPost=async(req,res)=>{
    const postBody = req.body

    try {
        const newPost = await Post.create(postBody)
        if(newPost){
            res.status(201).json({message:"Post created"})
        }else{
            res.status(400).json({message:"Post not created"})
        }
        
    } catch (error) {
       res.status(500).json({message:"Somthing wrong",error}) 
    }
}


// get post by Id
const getPostById=async(req,res)=>{
    const postId = req.params.id

    try{
        const foundPost = await Post.findById(postId)
        if(foundPost){
            res.status(200).json({message:"Post created",foundPost})
        }else{
            res.status(400).json({message:"Post Not Found"})
        }

    }catch (err){
        res.status(500).json({message:"Somthing wrong"})
    }
}


//update post 
const updatePost=async(req,res)=>{
    const postId = req.params.id
    const {userId} = req.body

    try{
        const post = await Post.findById(postId)
        if(post.userId === userId){
            await post.updateOne({
                $set:req.body
            })
            res.status(200).json({message:"Update Succesfully"})

        }else{
            res.status(400).json({message:"You can only update your post"})
        }

    }catch(err){
        res.status(500).json({message:"Somthing wrong"})
    }
}


//delete post
const deletePost=async(req,res)=>{
    const postId = req.params.id
    const {userId} = req.body

    try{
        const post = await Post.findById(postId)
        if(post.userId === userId){
            await post.deleteOne()
            res.status(200).json({message:"Post delete succesfully"})
        }else{
            res.status(400).json({message:"You can only delete your post"})
        }

    }catch(err){
        res.status(500).json({message:"Something wrong"})
    }
}


//like and dislike
const likeAndDislike=async(req,res)=>{
    const postId = req.params.id
    const {userId} = req.body

    try{
        const post = await Post.findById(postId)
        if(!post.likes.includes(userId)){
            await post.updateOne({
                $push:{
                    likes:userId
                }
            })
            res.status(200).json({message:"Post Liked"})

        }else{
            await post.updateOne({
                $pull:{
                    likes:userId
                }
            })
            res.status(200).json({message:"Post Disliked"})
        }

    }catch(err){
        res.status(500).json({message:"something wrong"})
    }
}



//get timeline post
const getTimelinePost=async(req,res)=>{
    const userId = req.params.id

    try{
        const currentUserPost = await Post.find({userId:userId})
        const followingPost = await User.aggregate([
            {
                $match:{
                    _id:new mongoose.Types.ObjectId(userId)
                }
            },
            {
                $lookup:{
                    from:'posts',
                    localField:'following',
                    foreignField:'userId',
                    as:'followingPost'
                }
            },
            {
                $project:{
                    followingPost:1,
                    _id:0
                }
            }
        ])

        res.status(200).json(currentUserPost.concat(...followingPost[0].followingPost).sort((a,b)=>{
            return b.createdAt - a.createdAt
        }))

    }catch(err){
        res.status(500).json({message:"Something wrong",err})
    }
}



module.exports = {
    createPost,
    getPostById,
    updatePost,
    deletePost,
    likeAndDislike,
    getTimelinePost
}