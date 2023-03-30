const User = require('../models/userM.js')
const bcrypt = require('bcrypt')


//get user by id

const getUser = async(req,res)=>{
    const id = req.params.id

    try {
        const user = await User.findById(id)
        if(!user) return res.status(400).json({message:"User Not Found"})

        const {password ,...otherDetails} = user._doc
        res.status(200).json(otherDetails)
        
    } catch (error) {
        res.status(500).json({message:"Invalid Credintals"})
    }
}



//update user
const updateUser = async(req,res)=>{
    const id = req.params.id
    const {currentUserId,currentUserAdminStatus,password} = req.body

    if(id===currentUserId||currentUserAdminStatus){
        try {

            if(password){
                const salt = await bcrypt.genSalt(10)
                req.body.password = await bcrypt.hash(password,salt)
            }

            const user = await User.findByIdAndUpdate(id,req.body,{new:true})
            res.status(201).json({message:"Update Succesfully",user})
            
            
        } catch (error) {
            res.status(500).json({message:"Invalid Credientials"})
        }
    }else{
        res.status(400).json({message:"You can only update your profile"})
    }
}



//delete User

const deleteUser = async(req,res)=>{
    const id = req.params.id

    const {currentUserId,currentUserAdminStatus} = req.body

    try{
        if(id===currentUserId || currentUserAdminStatus){
            await User.findByIdAndDelete(id)
            res.status(200).json({message:"User Deleted Succesfully"})
        }else{
            res.status(400).json({message:"You can only delete your profile"})
        }

    }catch (err){
        res.status(500).json({message:"Something Went wrong"})
    }
}


//follow user
const followUser = async(req,res)=>{
    const id = req.params.id
    const currentUserId = req.body  //my Id

    if(id === currentUserId) {
        res.status(400).json({message:"You can not follow your self"})
    }else{
        try {

            const whomeFollow = await User.findById(id)
            const whoFollow = await User.findById(currentUserId)

            if(!whomeFollow.followers.includes(currentUserId)){
                await whomeFollow.updateOne({
                    $push:{
                        followers:currentUserId
                    }
                })

                await whoFollow.updateOne({
                    $push:{
                        following:id
                    }
                })
                res.status(200).json({message:"Following"})
            }else{
                res.status(400).json({message:"Already Following"})
            }
            
        } catch (error) {
            res.status(500).json({message:"Something wrong",error})
        }
    }
}


//unFollow User
const unfollowUser = async(req,res)=>{
    const id = req.params.id
    const {currentUserId} = req.body

    try{
        const whomeFollow = await User.findById(id)
        const whoFollow = await User.findById(currentUserId)

        if(whomeFollow.followers.includes(currentUserId)){
            await whomeFollow.updateOne({
                $pull:{
                    followers:currentUserId
                }
            })
            await whoFollow.updateOne({
                $pull:{
                    following:id
                }
            })

            res.status(200).json({message:"Unfollowed"})

        }else{
            res.status(400).json({message:"User is unFollowed by you"})
        }

    }catch(err){
        res.status(500).json({message:"Somthing wrong",err})
    }
}


module.exports = {
    getUser,
    updateUser,
    deleteUser,
    followUser,
    unfollowUser,
}