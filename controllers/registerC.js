const bcrypt = require('bcrypt')
const User = require('../models/userM.js')


const register = async(req,res)=>{
    const {password,email} = req.body

    const allInputs = Boolean(password) && Boolean(email)
    if(!allInputs) return res.status(400).json({message:"Required All Fields"})


    const re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(!(email.match(re))) return res.status(400).json({message:"Enter valid email format"})

    try {
        const existUser = await User.findOne({email})

        if(existUser) res.status(400).json({message:"User Already exist"})


        //hashedpassword
        const hashPassword = await bcrypt.hash(password,10)

        const newUser = await User.create({
            password:hashPassword,
            email
        })

        res.status(201).json({message:"User Created succesfully",newUser})
    } catch (error) {
        console.log(error)
    }
}


module.exports = register



