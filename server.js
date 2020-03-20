const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
let db = require("./models");
const app = express();


// const db = mongoose.connection;

PORT = process.env.PORT || 3000;

app.use(express.static('public'));
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
 
// parse application/json
app.use(express.json());

app.get('/stats', (req,res)=>{
    const filetoSend = fs.readFileSync('./public/stats.html','utf-8');
    res.send(filetoSend);
});

app.get('/exercise',(req,res)=>{
    const filetoSend = fs.readFileSync('./public/exercise.html','utf-8');
    res.send(filetoSend);
});

app.get('/api/workouts/range',async (req,res)=>{
    // console.log('/api/workouts/range call received');
    const result = await db.Workout.find({});
    // console.log(result);
    res.json(result);
})

app.get('/api/workouts',async (req,res)=>{
    // console.log('/api/workouts call received');
    // console.log('trying to query mongo ...');
    const result = await db.Workout.find({});
    // console.log(result);
    res.json(result);
    
    // console.log(result);
})

app.post('/api/workouts',async (req,res)=>{
    console.log(`POST /api/workouts call receieved`);
    console.log(req.body);
    // const result = await db.Workout.create(req.body);
    // return result;
});

app.put('/api/workouts/:id',async (req,res)=>{
    console.log(`PUT /api/workouts call receieved`);
    // console.log(req.body);
    if (req.params.id != 'undefined') {
        console.log(`need update query with id ${req.params.id}`);
        const filter = {_id:req.params.id};
        const update = {
            $push:{exercises:{name:req.body.name,duration:req.body.duration}}
        }
        console.log(update);
        const result = await db.Workout.updateOne(filter,update,{useFindAndModify:false});
        console.log(result);
        res.json(result);
    } else
    {
        console.log('need to insert new workout!');
        let data = {
            day:new Date().setDate(new Date().getDate()),
            exercises:[{
                type:req.body.type,
                name:req.body.name,
                duration:req.body.duration,
                weight:req.body.weight,
                reps:req.body.reps,
                sets:req.body.sets
            }
            ]
        }
        // console.log(data);
        const result = await db.Workout.create(data);
        console.log('result from creating workout in mongo',result);
        res.json(result);
    }
    // console.log(req.params);
    
});

app.listen(PORT,(req,res)=>{
    console.log(`started on ${PORT} ...`);
    // console.log(__dirname);
})