const express = require('express')
let router = express.Router()

let User = require('../models/user.model')

router
    .route('/')
    .get(async (req,res)=>{
        const users = await User.find()
        if (!users) return res.status(404).send('No users Found')
        res.send(users)
    });
router
    .route('/add')
    .post(async (req,res) => {
        const username = req.body.username
        let newUser = new User({username})
        newUser = await newUser.save()
        res.json('User Added!')
    });


module.exports = router