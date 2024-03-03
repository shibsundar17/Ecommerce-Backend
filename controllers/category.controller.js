const category_model = require("../models/category.model")

exports.createNewCategory = async(req,res)=>{
    //read the request body

    const cat_data = {
        name : req.body.name,
        description:req.body.description

    }

    //create the category object


    //insert into mongodb
    try{
    const category = await category_model.create(cat_data)
    return res.status(201).send(category)
    }catch(err){
        console.log("error while creating the category",err)
        res.status(500).send({
            message:"Error while creating the category"
        })
    }
    //return the response of the category object
}