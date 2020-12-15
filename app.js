const express = require('express');
const axios = require('axios')

const fs = require('fs');
const app = express();

//middleware 
app.use(express.urlencoded({extended: true}));

//connection to MongoDB && models
const mongoose = require('mongoose')
const mongoURI = 'mongodb+srv://blog-user-1:test123@node-blog.ggcm8.mongodb.net/node-blog?retryWrites=true&w=majority';

mongoose.connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(result => app.listen(3001))
  .catch(err => console.log(err));

const Blog = require('./models/blogs');
const { ESRCH } = require('constants');
const { concat } = require('lodash');

//EJS 
app.set('view engine', 'ejs');

//WITH MONGODB

app.get('/posts', (req, res) => {
  Blog.find()
    .then(posts => {
      res.render('posts', {title: 'Posts', posts});
    }).catch(err => console.log(err));
})
app.post('/posts', (req, res) => {
  // console.log(req);
  const post = new Blog({
    title: req.body.title,
    body: req.body.body
  })
  post.save()
    .then(result => res.redirect('/posts'))
    .catch(err => console.log(err));
})


app.get('/posts/:post_id', (req, res) => {
  Blog.findById(req.params.post_id)
    .then(post => {
      res.render('post', {title: post.id, post });
    }).catch(err => {
      console.log(err, 'afaaffafaaAA');
      res.status(404).render('404', {title: '404'});
    });
})
app.delete('/posts/:post_id', (req, res) => {
  console.log('REACHED');
  Blog.findByIdAndDelete(req.params.post_id)
    .then(result => res.json('/posts'))
    .catch(err => console.log(err));
})

//WITH AXIOS

// app.get('/posts', (req, res) => {
//   axios.get('https://jsonplaceholder.typicode.com/posts/')
//     .then(data => {
//       // console.log(data.data.slice(0,10));
//       res.render('posts', {title: 'Posts', posts: data.data.slice(0,10)});
//     })
// })

// app.get('/posts/:post_id', (req, res) => {
//   // console.log(req.params.post_id);
//   let post_id = req.params.post_id;
//   axios.get('https://jsonplaceholder.typicode.com/posts/' + post_id)
//     .then(data => {
//       res.render('post', {title: data.data.id, post: [data.data]});
//     })
// })

//actual routing

app.get('/', (req, res) => {
  // fs.readFile('./views/index.html', (err, data)=>{
  //   if(err) console.log(err);
  //   res.send(data);
  // })
  res.render('index', {title: 'Index'});
});

app.get('/about', (req, res ) => {
  // res.sendFile('./views/about.html', {root: __dirname});
  res.render('about', {title: 'About'});
})

app.get('/add-blog', (req, res) => {
  res.render('add-blog', {title: 'Add Blog'});
})

app.use((req, res ) => {
  res.status(404).render('404', {title: '404'});
})
