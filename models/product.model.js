const mongoose = require("mongoose")
const ProductSchema = new mongoose.Schema({
    category:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true

    },
    description:{
        type:String,
        required:true
    }
},{timestamps:true,versionKey:false})

module.exports = mongoose.model("products",ProductSchema)