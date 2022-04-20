const express = require('express');
const mongoose = require('mongoose')
const methodOverride = require('method-override')

const ejs = require('ejs');
const path = require('path');
const postController = require('./controllers/postController')
const pageController = require('./controllers/pageController')


//app değişkenine express fonksiyonunu atama
const app = express();

// Connect DB
mongoose.connect('mongodb://localhost/cleanblog-test-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})


// TEMPLATE ENGINE
app.set('view engine', 'ejs')


//MIDDLEWARES
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true })) //url datasını okumamızı sağlar
app.use(express.json()) //datayı json formatına dönüştürmeyi sağlar
app.use(methodOverride('_method')) //Put(güncelleme) işlemini Post olarak simüle ettik
app.use(
    methodOverride('_method', {
        methods: ['POST', 'GET'], //delete yerine post olarak simüle ettik ve get isteği gönderdik.
    })
)


//Routers
app.get('/', postController.getAllPost) //all post list
app.get('/post/:id', postController.getPost) //post list
app.post('/post', postController.createPost) //create post
app.put('/post/:id', postController.updatePost) //update post
app.delete('/post/:id', postController.deletePost) //delete post

app.get('/about', pageController.getAboutPage)
app.get('/add_post', pageController.getAddPage)
app.get('/post/edit/:id', pageController.getEditPage)


const port = 3000;
app.listen(port, () => {
    console.log(`Sunucu ${port} Portunda Başlatıldı...`);
});