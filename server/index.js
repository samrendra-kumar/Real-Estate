const database=require("./config/database")
const residencyRoute= require("./routes/residencyRoute.js")
const userRoute=require("./routes/user");
const express = require("express");
const cors= require("cors");
const app=express() ;
app.use(express.json());
const dotenv= require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 4000 ;
database.connect();
app.use(cors());
app.listen(PORT,()=>{
    console.log(`App is running at ${PORT}`);
})
app.use("/api/residency",residencyRoute)
app.use("/api/user",userRoute)

