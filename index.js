//-----------------------------------------------------------IMPORTS MODULES-----------------------------------------------------------
const express = require('express')
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose')





//------------------------------------------------------------MODULE EXPORTS------------------------------------------------------------
const connectDB = require('./configaration/dbConn.js')

//-----------------------------------------------------------CONFIGARATION-----------------------------------------------------------
dotenv.config()
connectDB()



//------------------------------------------------------------------ENV------------------------------------------------------------------
const PORT = process.env.PORT


//---------------------------------------------------------------MIDDLEWARE---------------------------------------------------------------
app.use(express.json())


//-----------------------------------------------------------------ROUTES-----------------------------------------------------------------
app.use('/register',require('./router/registerR.js'))
app.use('/login',require('./router/loginR.js'))
// app.use('/logout',)



app.use('/user',require('./router/userR.js')) //user curd
app.use('/post',require('./router/postR.js')) //post curd
app.use('/note',require('./router/noteR.js')) //note curd

//--------------------------------------------------------------DB CONNECTIONS--------------------------------------------------------------

mongoose.connection.once('open',()=>{
    app.listen(PORT,()=>console.log(`Connected on port ${PORT}`))
})




// const bodyParser = require('body-parser');
// const cors = require('cors');
// const helmet = require('helmet');
// const morgan = require('morgan');