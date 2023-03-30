const mongoose = require('mongoose')
const Schema  = mongoose.Schema

const noteSchema = new Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:"User"
    },
    description:{
        type:String,
        required:true
    },
    title:{
        type:String,
    }
},{timestamps:true})


const Note = mongoose.model('Note',noteSchema)
module.exports = Note