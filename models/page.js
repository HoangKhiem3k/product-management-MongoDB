var mongoose = require('mongoose');

var PageSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    slug:{
        type: String,
    },
    content: {
        type: String,
        required: true
    }
})

var Page = mongoose.model('Page', PageSchema);
module.exports = Page;