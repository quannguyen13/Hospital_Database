const express = require('express')
const Article = require('../models/article')
const router = express.Router()

router.get('/new',(req,res) => {
    res.render('articles/new', {article: new Article()})
})



router.get('/:slug', async (req,res) => {
    const article = await Article.findOne({slug: req.params.slug})
    if(article == null) res.redirect('/')
 res.render('articles/show', { article: article})
})



router.get('/edit/:id', async (req,res) => {
    const article = await Article.findById(req.params.id)
 res.render('articles/edit', {article: article})
})



router.post('/', async (req,res) => {
let article = new Article({
    title: req.body.title,
    description: req.body.description,
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






router.put('/edit/:id', async (req,res) => {
  let article = await Article.findByIdAndUpdate(
    {_id: req.params.id},
    {title: req.body.title,
    description: req.body.description,
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











router.delete('/:id', async (req,res) =>{
    await Article.findByIdAndRemove(req.params.id)
    res.redirect('/')
})


// function saveArticleAndRedirect(path){}

module.exports = router