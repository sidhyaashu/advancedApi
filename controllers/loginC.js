const User = require('../models/userM.js')
const bcrypt = require('bcrypt')


const login = async(req,res)=>{
    const {email,password} = req.body

    const inputs = Boolean(email) && Boolean(password)
    if(!inputs) return res.status(400).json({message:"Required All Fields"})

    try {

        const foundUser = await User.findOne({email})
        if(!foundUser) return res.status(401).json({message:"User Not Found"})

        const matchPassword = await bcrypt.compare(password,foundUser.password)
        if(!matchPassword) return res.status(400).json({message:"Password dose not matched"})

        res.status(200).json({message:"User succesfully logged in",foundUser})
        
    } catch (error) {
       console.log(error) 
    }
}

module.exports = login