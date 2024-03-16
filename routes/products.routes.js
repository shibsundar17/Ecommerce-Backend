const authMw  = require("../middlewares/auth.mw")


const product_controller = require("../controllers/products.controller")
module.exports =(app)=>{
    app.post("/ecomm/api/v1/products",[authMw.verifyToken,authMw.isAdmin],product_controller.createNewProduct)
    app.get("/ecomm/api/v1/products",product_controller.getAllProducts)
    app.delete("/ecomm/api/v1/products",[authMw.verifyToken,authMw.isAdmin],product_controller.deleteProducts)
    app.put("/ecomm/api/v1/products/:id",[authMw.verifyToken,authMw.isAdmin],product_controller.editProducts)
}