const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
let Workout = require("./models");
const app = express();

mongoose.connect('mongodb://localhost/Workout',{useNewUrlParser:true});

// const db = mongoose.connection;

PORT = process.env.PORT || 3000;

app.use(express.static('public'));
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
 
// parse application/json
app.use(express.json());

app.get('/stats',(req,res)=>{
    const filetoSend = fs.readFileSync('./public/stats.html','utf-8');
    res.send(filetoSend);
});

app.get('/exercise',(req,res)=>{
    const filetoSend = fs.readFileSync('./public/exercise.html','utf-8');
    res.send(filetoSend);
});

app.get('/api/workouts/range',async (req,res)=>{
    console.log('/api/workouts/range call received');
    const result = await Workout.find({});
    console.log(result);
    res.json(result);
})

app.get('/api/workouts',async (req,res)=>{
    console.log('/api/workouts call received');
    console.log('trying to query mongo ...');
    const result = await Workout.find({});
    console.log(result);
    res.json(result);
    
    // console.log(result);
})

app.post('/api/workouts',(req,res)=>{
    console.log(`POST /api/workouts call receieved`);
});

app.put('/api/workouts',(req,res)=>{
    console.log(`PUT /api/workouts call receieved`);
});

app.listen(PORT,(req,res)=>{
    console.log(`started on ${PORT} ...`);
    // console.log(__dirname);
})