const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:'User'
    },
    desc:String,
    likes:{
        type:Array,
        default:[]
    },
    img:String,

},{timestamps:true})

const Post = mongoose.model("Post",postSchema)
module.exports = Post