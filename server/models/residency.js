const mongoose = require('mongoose');
const residencySchema = new mongoose.Schema(
    {
  title:{
    type:String ,
    required:true,
  },
  description:{
    type:String ,
    required:true,
  } ,
  price:{
    type:Number ,
    required:true,
  },
  address:{
    type:String ,
    required:true,},
  city:{
    type:String ,
    required:true,},

  country:{
    type:String ,
    required:true,},

  image:{
    type:String ,
    required:true ,
  },
  facilities:{
    type: {
      bedrooms: {
        type: Number
      },
      parkings: {
        type: Number
      },
      bathrooms: {
        type: Number
      }
    },
    required: true
  },
  //userEmail:{
  //  type:String ,
  //  required:true,
  //},
  
  createdAt:{
    type:Date,
    default:Date.now
  },
  updatedAt:{
    type:Date,
    default:Date.now 
  }


    }

)
module.exports = mongoose.model("Residency",residencySchema);