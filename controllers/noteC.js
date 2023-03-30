const Note = require("../models/noteM.js")


//create post
const createNote = async(req,res)=>{
    const { description ,title} = req.body

    try {
        const newNote = await Note.create({
            description,
            title,
            userId:req.userId
        })

        res.status(201).json({message:"Note create succesfully",newNote})
    } catch (error) {
        res.status(500).json({message:"Somthing wrong"})
    }
}

//get Post
const getNote = async(req,res)=>{
    try{
        const notes = await Note.find({userId:req.userId})
        if(notes){
            res.status(200).json(notes)
        }else{
            res.status(400).json({message:"Notes Not Found"})
        }

    }catch(err){
        res.status(500).json({message:"Something wrong"})
    }
}


//update post
const updateNote = async(req,res)=>{
    const id = req.params.id
    const {title,description} = req.body

    try{
        const updateedNote = {
            title,
            description,
            userId:req.userId
        }

        const result = await Note.findByIdAndUpdate(id,updateedNote,{new:true})
        if(result){
            res.status(200),json({message:"Updated success"})
        }else{
            res.status(200),json({message:"Not Updated"})
        }

    }catch(err){
        res.status(500).json({message:"Something wrong",err})
    }
}



//delete Post
const deleteNote = async(req,res)=>{
    const id = req.params.id

    try{
        const note = await Note.findByIdAndDelete(id)
        res.status(202).json({message:"Deleted",note})

    }catch(err){
        res.status(500).json({message:"Something wrong"})
    }
}



module.exports = {
    createNote,
    getNote,
    updateNote,
    deleteNote
}