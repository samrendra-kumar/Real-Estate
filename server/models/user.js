
const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    name:{
        type:String,
       
    },
    email:{
        type:String ,
        required:true
    },
    image:{
        type:String
    },
    bookedVisits:[{
    type:mongoose.Schema.Types.Mixed
    }],
    favResidenciesID:[
    {
    type:String 
    }],
    ownedResidencies:[{
        type:mongoose.Schema.Types.ObjectId ,
        ref:"Residency"
    }
    ]
    
})
module.exports= mongoose.model("User",UserSchema)