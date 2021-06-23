const express = require('express')
const Article = require('../models/article')
const router = express.Router()






router.get('/index', async (req,res) => {
    const articles = await Article.find().sort( {createdAt: 'desc' })
res.render('articles/index',{ articles: articles})
})



///-----------------Add "new" page----------------------------///
router.get('/articles/new',(req,res) => {
    res.render('articles/new', {article: new Article()})
})


//-----------------------Show Data-------------------------//////
router.get('/articles/:slug', async (req,res) => {
    const article = await Article.findOne({slug: req.params.slug})
    if(article == null) res.redirect('/')
 res.render('articles/show', {article})
})




//--------------------create new data-----------------------///
router.post('/articles', async (req,res) => {
let article = new Article({
    title: req.body.title,
    dob: req.body.dob,
    phone: req.body.phone,
    description: req.body.description,
    treatment: req.body.treatment,
    markdown: req.body.markdown
})
try {
   article =  await article.save()
    res.redirect(`/articles/${article.slug}`)
} catch (e){
    console.log(e);
    res.render('articles/new', {article: article })
}
})




//--------------------Edit data-----------------------///
router.get('/articles/edit/:id', async (req,res) => {
    const article = await Article.findById(req.params.id)
 res.render('articles/edit', {article: article})
})






//--------------------update data-----------------------///
router.put('/articles/edit/:id', async (req,res) => {
  let article = await Article.findByIdAndUpdate(
    {_id: req.params.id},
    {
        title: req.body.title,
        dob: req.body.dob,
        phone: req.body.phone,
        description: req.body.description,
        treatment: req.body.treatment,
        markdown: req.body.markdown
    },
    {new:true}
    )
    try {
        article =  await article.save()
         res.redirect(`/articles/${article.slug}`)
     } catch (e){
         console.log(e);
      
     }
})






//--------------------delete data-----------------------///
router.delete('/articles/:id', async (req,res) =>{
    await Article.findByIdAndRemove(req.params.id)
    res.redirect('/index')
})







module.exports = router


