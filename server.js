const express = require('express')
const methodOverride = require('method-override')
const app = express()

const mongoose = require('mongoose')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')

const mongoURI =
process.env.NODE_ENV === 'production'
? process.env.DB_URL
: 'mongodb://localhost/patient'

mongoose.connect(mongoURI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true,
    useFindAndModify: false,  
})
.then((instance) =>
console.log(`Connected to db: ${instance.connections[0].name}`)
)
.catch((error) => console.log('Connection failed!', error));

app.set("port", process.env.PORT || 4000 )



    
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))



app.get('', (req,res) => {
    res.render('articles/logIn')
})

app.use('/', articleRouter)


app.listen(app.get("port"), () => {console.log(`Running port @ ${app.get("port")}`);})