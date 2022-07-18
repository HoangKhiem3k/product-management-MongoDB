var express = require('express');
const { render } = require('../app');
var router = express.Router();
// Load page model
const Page = require("../models/page")



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('admin/pages', { title: 'ADMIN AREA' });
});

// Hien thi trang addPage
router.get('/add-page', function(req, res, next) {
  var title = '';
  var slug = '';
  var content = '';
  res.render('admin/addPage', { 
    title,slug  ,content
  });
})


// Them moi page
router.post('/add-page', function(req, res, next) {
  req.checkBody('title', 'Title must have a value').notEmpty();
  req.checkBody('content', 'Content must have a value').notEmpty();

  var title = req.body.title;
  var slug = req.body.slug.replace(/\s+/g, '-').toLowerCase();
  if(slug == '') slug = title.replace(/\s+/g, '-').toLowerCase();
  var content = req.body.content;

  var errors = req.validationErrors();

  if(errors){
    console.log(errors);
    res.render('admin/addPage', { 
      errors,title,slug  ,content
    });
  }else{
    Page.findOne({slug},(err,page)=>{
      if(page){
        req.flash('danger',"Page slug exists, choose another one");
        res.render('admin/addPage', { 
          title,slug,content
        })
      }
      else{
        var newPage = new Page({
          title,slug,content
        })
        newPage.save(err =>{
          if(err){
            return console.log(err);;
          }
          req.flash('Success',"Page added successfully");
          res.redirect('/admin/pages');
        })
      }
    })
  }

  res.render('admin/addPage', { 
    title,slug  ,content
  });
})

module.exports = router;
