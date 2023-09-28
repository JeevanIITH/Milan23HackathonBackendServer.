const express = require('express')
const { default: all_restaurants } = require('./Database/dbconnect')
const app  = express()

require('./Database/dbconnect')
const bookreviewRouter = require('./Routes/bookreview')
const all_books = require('./Database/dbconnect')
app.listen(4000) 

app.get('/all_books',async (req,res)=>{
    await all_books.find({}).then((found)=>{
        console.log(found)
        res.send(found)
    }).catch(err=>console.log("error occured , "+ err))
})

app.use('/bookreview',bookreviewRouter)