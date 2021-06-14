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




app.get('/', async (req,res) => {
    const articles = await Article.find().sort( {createdAt: 'desc' })
res.render('articles/index',{ articles: articles})
})
app.use('/articles', articleRouter)


app.listen(5000)