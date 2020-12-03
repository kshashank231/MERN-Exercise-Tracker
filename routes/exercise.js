const express = require('express')
let router = express.Router()

let Exercise = require('../models/exercise.model')

router
    .route('/')
    .get(async (req,res)=>{
        const exercises = await Exercise.find()
        if (!exercises) return res.status(404).send('No exercises found')
        res.send(exercises)
    });
router
    .route('/add')
    .post((req,res) => {
        let username = req.body.username
        let description = req.body.description
        let duration = Number(req.body.duration)
        let date = Date.parse(req.body.date)

        const newExercise = new Exercise({
            username,
            description,
            duration,
            date
        })
        newExercise.save((err, result)=>{
            if(!err){
                res.json('Exercise Added!')
            } else {
                res.status(400).json({'error':err})
            }
        })
    });

router
    .route('/:id')
    .get(async (req,res)=>{
        const exercises = await Exercise.find({_id:req.params.id})
        if (!exercises) return res.status(404).send('No exercises found for given user')
        res.send(exercises)
    })
    .delete((req,res) =>{
        Exercise.findByIdAndDelete(req.params.id)
        .then(() => res.json('Exercise Deleted'))
        .catch(err => res.status(400).json('Error: '+err))
    })

    .post((req,res)=>{
        Exercise.findById(req.params.id)
        .then(exercise =>{
            exercise.username = req.body.username
            exercise.description = req.body.description
            exercise.duration = Number(req.body.duration)
            exercise.date = Date.parse(req.body.date)
    

            exercise.save((err, result)=>{
                if(!err){
                    res.json('Exercise Updated!')
                } else {
                    res.status(400).json({'error':err})
                }
            })

        })
        .catch(err => res.status(400).json('Error: '+err))
    })


module.exports = router