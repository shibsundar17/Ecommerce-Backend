/**
 * this will be the starting file of the project
 */
const express = require("express")
const mongoose = require("mongoose")
const server_config = require("./configs/server.config")
const db_config = require("./configs/db.config")
const user_model = require("./models/user.model")
const bcrypt = require("bcryptjs")


const app = express()

app.use(express.json())

/**
 * create the admin user at the starting of the application
 * if not  already present
 */


//connection with mongodb database

mongoose.connect(db_config.DB_URL)

const db = mongoose.connection

db.on("error", () => {
    console.log("error while connecting to the mongoDB")
})
db.once("open", () => {
    console.log("connected to the monogDB")
    init()
})

//stich the route to the server
require("./routes/auth.routes")(app)
require("./routes/category.routes")(app)

/**
 * start the server
 */

app.listen(server_config.PORT, () => {
    console.log("server started at port num: ", server_config.PORT)
})


async function init(){
    try{
    let user = await user_model.findOne({userId:"admin"})
    if(user){
        console.log("admin is already present")
        return
    }
}catch(err){
    console.log("Error while reading the data ",err)
}

    try{
        user = await user_model.create({
            name:"Shibsundar",
            userId:"admin",
            email:"xyzabc123@gmail.com",
            userType:"ADMIN",
            password:bcrypt.hashSync("User@1234",8)
        })
        console.log("admin is created ", user)

    }catch(err){
        console.log('error while createing admin',err)
    }
}


