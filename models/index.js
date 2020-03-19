// const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');

const MySchema = new mongoose.Schema({
    day:Date,
    excercises:[
        {
        type:String,
        name:String,
        duration:Number,
        weight:Number,
        reps:Number,
        sets:Number
        }
    ]
},{strict:false});




module.exports = mongoose.model('Workout', MySchema);