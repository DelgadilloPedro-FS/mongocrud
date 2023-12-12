const express = require("express");
const router = express.Router();



const cat = require("./catRoutes")
const shelter = require("./shelterRoutes")

router.get("/",(req,res)=>{
    res.status(200).json({success:true, message:`${req.method} - request made`})
})

router.use("/cats", cat);
router.use("/shelters", shelter)

module.exports = router;