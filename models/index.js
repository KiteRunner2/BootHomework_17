const mongoose = require('mongoose');
require('dotenv').config();
const db_user = process.env.DB_USER || '';
const db_pass = process.env.DB_PASS || '';
const db_name = process.env.DB_NAME || 'Workout';
const db_host = process.env.DB_HOST || 'mongodb://localhost/workout';
const options = {
    useNewUrlParser:true,
    user:db_user,
    pass:db_pass,
    authSource:db_name
}
mongoose.connect(db_host,options);

const db = mongoose.connection;
const MySchema = new mongoose.Schema({
    // day:Date,
    // exercises:[
    //     {
    //     type:String,
    //     name:String,
    //     duration:Number,
    //     weight:Number,
    //     reps:Number,
    //     sets:Number
    //     }
    // ]
},{strict:false});
db.Workout = mongoose.model('Workout', MySchema);

module.exports = db