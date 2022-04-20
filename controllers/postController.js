const Post = require('../models/Post')


// All Post list
exports.getAllPost = async(req, res) => {
    const posts = await Post.find({}) //veritabanına gönderilen postları  index.ejs dosyasında göstermek istiyoruz.
    res.render('index', { //Uygulamamızdaki .get metodunu düzenlersek, bu şekilde '/' isteğine karşılık index.ejs dosyasını render ederiz.
        posts
    })
}


// Tekil Post sayfası oluşturma. id değeri yakalanıp o id'ye ait post için post.ejs dosyasını render etme
exports.getPost = async(req, res) => {
    const post = await Post.findById(req.params.id)
    res.render('post', {
        post
    })
}

// Create Post
exports.createPost = async(req, res) => {
    await Post.create(req.body)
    res.redirect('/')
}

// Update Post
exports.updatePost = async(req, res) => {
    const post = await Post.findOne({ _id: req.params.id })
    post.title = req.body.title;
    post.detail = req.body.detail;
    post.save();

    res.redirect(`/post/${req.params.id}`)
}

// Delete Post
exports.deletePost = async(req, res) => {
    await Post.findByIdAndRemove(req.params.id)
    res.redirect('/')
}