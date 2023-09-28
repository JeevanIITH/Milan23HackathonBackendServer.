const express = require('express')
const all_books = require('../Database/dbconnect')
const bodyParser = require('body-parser')
const { type } = require('express/lib/response')
const router = express.Router()
require('../Database/dbconnect')
router.post('/',bodyParser.json() ,  async (req,res)=>{
    console.log(req.body)
    let bookname = req.body.bookname
    let rating = req.body.bookrating
    console.log(typeof(rating))
    rating = Number(rating)
    let author = req.body.bookauthor
    let review = req.body.bookreview 
        
    
        let qtotalreviews = 1
        let qrating = 1 
        await all_books.findOne({name:bookname}).then((bookdetails)=>{
            qtotalreviews = bookdetails.totalreviews
            qrating = bookdetails.rating
        }).catch((err)=>{res.send('Error occured while updating..')})
        await all_books.findOneAndUpdate({name:bookname},{
            rating: (qtotalreviews*qrating + rating)/(qtotalreviews+1),
            totalreviews: qtotalreviews + 1
        }).then((bookdetails) =>{
            res.send({
                result:"updated",
                details: bookdetails
            }) 
        }) 
        .catch((err)=>{
            res.send('error occured while updating rating' + err)
        })
    

    
    
    
})

router.post('/newreview',bodyParser.json(),async (req,res)=>{
    let bookname = req.body.bookname
    let rating = req.body.bookrating
    rating = Number(rating)
    let author = req.body.bookauthor
    let review = req.body.bookreview 
    let year = req.body.bookyear
    
    const book_exist = all_books.exists({name:bookname})
    if (book_exist){
        res.send("book already exist , please update rating and review only .")
    }
    
    const new_book = new all_books({
    name:bookname,
    rating:rating,
    author:author,
    totalreviews:1,
    year:year,
        })
    new_book.save().then(()=>{
        res.send({
            result:"updated new book review!"
        }) })
        .catch((err)=>{
            res.send('error occured while updating rating' + err)
        })
})
    
    


module.exports = router
