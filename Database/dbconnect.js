// this program will connect to cloud mangodb database.
// connect to mangodb 
const { all } = require('express/lib/application');
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://cs20btech11047:WZQaQJgh9SzICgzf@cluster0.zq390ml.mongodb.net/?retryWrites=true&w=majority').then(()=>{
    console.log("connected to database.")
}).catch(()=>{
    console.log('error while connecting to database')
})






const all_books_schema = new mongoose.Schema({
    name:String,
    rating:Number,
    author:String,
    totalreviews:Number,
    year:Number
})

const all_books = mongoose.model('all_books',all_books_schema)
module.exports = all_books;