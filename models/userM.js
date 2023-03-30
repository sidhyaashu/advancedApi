const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username:{
        type:String,
        minlength:6,
        maxlength:20,
        trim:true
    },
    password:{
        type:String,
        required:true,
        minlength:6,
        maxlength:255
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    firstname:{
        type:String,
        // required:true
    },
    lastname:{
        type:String,
        // required:true
    },
    number:{
        type:Number
    },
    isAdmin:{
        type:Boolean,
        required:true,
        default:false
    },
    followers:[],
    following:[]
},{timestamps:true})

const User = mongoose.model('User',userSchema)
module.exports = User


