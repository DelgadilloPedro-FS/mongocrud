const express = require("express");
const router = express.Router();



const cat = require("./catRoutes")
const shelter = require("./shelterRoutes")
const user = require("./userRoutes")

router.get("/",(req,res)=>{
    res.status(200).json({success:true, message:`${req.method} - request made`})
})

router.use("/cats", cat);
router.use("/shelters", shelter)
router.use("/users", user)

module.exports = router;