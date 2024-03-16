const mongoose = require("mongoose")
const category_model = require("../models/category.model")

exports.createNewCategory = async (req, res) => {
    //read the request body

    const cat_data = {
        name: req.body.name,
        description: req.body.description

    }

    //create the category object


    //insert into mongodb
    try {
        const category = await category_model.create(cat_data)
        return res.status(201).send(category)
    } catch (err) {
        console.log("error while creating the category", err)
        res.status(500).send({
            message: "Error while creating the category"
        })
    }
    //return the response of the category object
}

exports.deleteCat = async (req, res) => {
    const cat_data = req.body.name

    try {
        const category = await category_model.deleteOne(cat_data)
        return res.status(201).send(category)({
            message: "category is deleted"
        })
    } catch (error) {
        return res.status(501).send({
            message: "Error while deleting the category"
        })

    }
}

// exports.deleteCategory = async(req,res)=>{
//     const categoryId = req.body.name

//     if(categoryId && !isValidObjectId(categoryId)){
//         return res.status(400).send({
//             message:"Invelid category ID"
//         })
//     }

//     try{

//         const deletedCategory = await category_model.findByIdAndDelete(categoryId)
//         if(!deletedCategory){
//             return res.status(404).send({
//                 message:"category not found"
//             })
//         }
//         return res.status(200).send({
//             message:"category deleted successfully",deletedCategory
//         })

//     }catch(err){
//         console.error("Error while deleting category",err)
//         res.status(500).send({message:"error deleting category"})
//     }

// }