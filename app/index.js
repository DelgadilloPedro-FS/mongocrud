const express = require("express");
const app = express();
const routeHandler = require("./routes");
const morgan = require("morgan");
const cors = require("cors")

app.use(express.json());
app.use(morgan("dev"))
app.use(cors());

app.get("/", (req,res)=>{
    res.status(200).json({message:"server is running", success:true});
})


app.use("/api/v1", routeHandler);

module.exports = app;