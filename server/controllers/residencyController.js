

require("dotenv").config() ;
const Residency= require('../models/residency')

exports.createResidency=async(req,res)=>{
    
    const
    {
      title,
      description,
      price,
      address,
     country,
      city,
     facilities,
     image,
      userEmail}= req.body.data ;
      console.log(req.body.data) ;
   try{
    const newresidency = new  Residency({
      
        title,
       description,
         price,
        address,
        country,
        city,
        facilities,
        image,
       userEmail,
      
      }
    );
    await newresidency.save() ;
   return res.status(200).json({
      success:true ,
      message:"residence created successfully",newresidency
      
    })
   } catch(error){
    res.status(500).json({
    success:false,
    message:"Internal server error",
    error:error.message,
    } );

  } 
}

exports.getAllResidencies=async(req,res)=>{
    try{
      const residencies=await Residency.find({}) ;
    
    return res.status(200).json({
      success:true,
      data:residencies

    })
  }catch(error)
  {
    return res.status(400).json({
      success:false ,
      message:`can't get data`,
    })
  }
}

exports.getResidency=async(req,res)=>{
    const {id} = req.params ;
    try{
      const residency = await Residency.findById(id)
      res.send(residency)
    }catch(err){
      throw new Error(err.message ) ;
    }
  }
