const mongoose = require('mongoose');
const Schema = mongoose.Schema

const tokensSchema = new Schema({
    facebook:{
        type: String,
        required: false,
        default:''
    },
    facebookImgSrc:{
        type: String,
        required: false,
        default:''
    },
    google:{
        type: String,
        required: false,
        default:''
    },
    googleImageSrc:{
        type: String,
        required: false,
        default:''
    },
    user:{
        ref: 'users',
        type: Schema.Types.ObjectId
    }
})

module.exports = mongoose.model('tokens', tokensSchema)