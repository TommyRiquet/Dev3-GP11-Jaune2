var express = require('express');
var router = express.Router();
let Book = require('../models/books.model')


router.get('/getBooks', function(req, res, next) {
    Book.find({type:req.query.type},(err, DBres)=>{
        if (err) return handleError(err);
        res.send(DBres);
    })

});

router.route('/addBook').post((req, res) =>{

const NewType = req.body.type;
const Newname = req.body.name;
const Newlink = req.body.link;

console.log(req)

const newBook = new Book({
  type : NewType,
  name : Newname,
  link : Newlink
});

console.log(newBook)

newBook.save()
.then(() => res.json('Book ajouté'))
.catch(err => res.status(400).json('Error ' + err)) 
})

module.exports = router;
