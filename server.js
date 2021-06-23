const express = require('express')
const methodOverride = require('method-override')
const app = express()

const mongoose = require('mongoose')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')

mongoose.connect('mongodb://localhost/patient', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true,
    useFindAndModify: false,  })
    
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))



app.get('', (req,res) => {
    res.render('articles/logIn')
})

app.use('/', articleRouter)


app.listen(4000,  ()  => {console.log("Rinning localhost:4000")})