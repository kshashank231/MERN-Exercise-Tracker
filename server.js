require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
// const cors = require('cors')


const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 5000


const uri = process.env.ATLAS_URI
mongoose.connect(uri, {useNewUrlParser:true, useUnifiedTopology: true, useCreateIndex: true})

const connection = mongoose.connection
connection.once('open',()=>{
    console.log('MongoDB connection established sucsessfully')
})

const users = require('./routes/users')
const exercise = require('./routes/exercise')

app.use('/api/users', users)
app.use('/api/exercise', exercise)


app.listen(port, err => {
    if(err) {
        return console.log(err)
    } else {
        console.log('Server successfully started')
    }
})
