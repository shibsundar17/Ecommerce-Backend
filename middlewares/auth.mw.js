/**
 * \create a mw will check if the request body is proper and correct
 */
const user_model = require("../models/user.model")
const jwt = require("jsonwebtoken")
const auth_config = require("../configs/auth.config")
const verifySignUpBody = async (req, res, next) => {
    try {
        //check for the name
        if (!req.body.name) {
            return res.status(400).send({
                message: "Failed : Name was not provided in request body"
            })
        }
        //check for the email
        if (!req.body.email) {
            return res.status(400).send({
                message: "Failed : Email was not provided in request body"
            })
        }

        //check for the userId
        if (!req.body.userId) {
            return res.status(400).send({
                message: "Failed : userId was not provided in request body"
            })
        }

        //check if the user with the same userId is already present
        const user = await user_model.findOne({ userId: req.body.userId })
        if (user) {
            return res.status(400).send({
                message: "Failed : userId with same userId is already present"
            })
        }

        next()
    } catch (err) {
        console.log("error while validating the request object", err)
        res.send(500).send({
            message: "error while validating the request body"
        })
    }
}

const verifySignInBody = async (req, res, next) => {
    if (!req.body.userId) {
        return res.status(400).send({
            message: "userId is not provided"
        })
    }
    if (!req.body.password) {
        return res.status(400).send({
            message: "password is not provided"
        })
    }
    next()


}

const verifyToken = (req, res, next) => {
    const token = req.headers["x-access-token"]
    if (!token) {
        return res.status(403).send({
            message: "No token found:unauthorized"
        })
    }

    jwt.verify(token, auth_config.secret, async (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "unauthorized !"
            })
        }
        const user = await user_model.findOne({ userId: decoded.id })
        if (!user) {
            return res.status(400).send({
                message: "Unauthorized , this user for this token doesnot exist"
            })
        }
        req.user = user
        next()
    })

}

const isAdmin = (req,res,next)=>{
    const user = req.user
    if(user && user.userType == "ADMIN"){
        next()
    }else{
        res.status(403).send({
            message:"Only ADMIN users are allowed to acesss this endpoint"
        })
    }
}


module.exports = {
    verifySignUpBody: verifySignUpBody,
    verifySignInBody: verifySignInBody,
    verifyToken: verifyToken,
    isAdmin:isAdmin
}



