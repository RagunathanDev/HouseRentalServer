const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    //one type form

    // title:String,
    // description:String,
    // date:Date.now

    //Another type form
    title: {
        type: String,
        required:true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }


});



module.exports = mongoose.model('posts',postSchema);