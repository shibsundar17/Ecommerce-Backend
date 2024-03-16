const prod_model = require("../models/product.model")
const mongoose = require("mongoose")

exports.createNewProduct = async (req, res) => {
    const prod_data = {
        category: req.body.category,
        name: req.body.name,
        price: req.body.price,
        description: req.body.description
    }
    try {
        const product = await prod_model.create(prod_data)
        return res.status(201).send(product)
    } catch (err) {
        return res.status(500).send({
            message: "Product could not added"
        })
    }
}
exports.getAllProducts = async (req, res) => {
    try {
        const products = await prod_model.find()
        return res.status(200).send(products)
    } catch (err) {
        res.status(500).send({
            message: "No products found in the product area",
            err: err.message
        })
    }
}
exports.deleteProducts = async (req, res) => {
    const product_name = { name: req.body.name }
    try {
        const prod = await prod_model.findOneAndDelete(product_name)
        return res.status(201).send({
            message: "product deleted"
        })
    } catch (err) {
        return res.status(500).send({
            message: "product not deleted"
        })
    }
}

exports.editProducts = async (req, res) => {
    const productId = req.params.productId
    const updateData = {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description
    }
    try {
        const updateProduct = await prod_model.findByIdAndUpdate(productId, updateData, { new: true })
        if (!updateProduct) {
            return res.status(400).send({
                message: "product not found"
            })
        }
        return res.status(200).send(updateProduct)
    } catch (err) {
        return res.status(500).send({
            message: "Error while updating"
        })
    }

}