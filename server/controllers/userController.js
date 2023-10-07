require("dotenv").config() ;
const User = require("../models/user");

exports.createUser = async(req,res)=>{
     try{
        const{
            name,
            email,
            image,
            bookedVisits,
            favResidenciesID,
            ownedResidencies 
        }=req.body ;
        if(!email)
        {
         return res.status(403).send({
            success:false,
            message:"All fields are required"
         })
        }
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success:true ,
                message:"User already exists "
            });
        }
        else{
            const user = await User.create({
            name,
            email,
            image,
            bookedVisits,
            favResidenciesID,
            ownedResidencies 
            })
            return res.status(200).json({
                success:true ,
                user,
                message:"user registered successfully "
            });
        }
    }catch(error)
    {
    return res.status(500).json({
    success:false ,
    message:("User not registered",error.message )
    });
    }
}
        

exports.bookedVisit = async(req,res)=>{
    const{email,date}= req.body ;
    const{id}=req.params;
    try{
        const user = await User.findOne({
            email 
        });
        if(!user){
            return res.status(404).json({
                message:"User not exist "
            });

        }
        const alreadyBooked=(user.bookedVisits.some(visit => visit.id === id ));
        if(alreadyBooked)
        {
            return res.status(400).json({
                message:"This residency is already booked by you"
            });
        }else{
            user.bookedVisits.push({id,date});
            await user.save() ;
            return res.status(200).send("Your visit is booked successfully ")
        }
    }catch(error)
    {
     return res.status(500).json({
        error:error.message
      });
    }
}

exports. cancelBooking=async(req,res)=>{
    const{email}= req.body ;
    const{id} = req.params ;
    try{
        const user= await User.findOne({
           email,
           
        })
        if(!user)
        {
            return res.status(404).json({
               message: "user doesn't exist " 
            })
        }
        const bookingindex=  user.bookedVisits.findIndex(
        (visit) => visit.id===id 
        );
        if(bookingindex === -1){
            return res.status(404).json({message:"Booking not found"});
        }else{
            user.bookedVisits.splice(bookingindex,1);
        }
        await User.findOneAndUpdate(
            {email},
            {
              bookedVisits :user.bookedVisits 
            },
            {new:true}
        );
        return res.status(200).json({message:"Booking cancelled successfully"});
        
    }catch(error)
    {
        return res.status(500).json({
            error:error.message
        })
    }
}

exports.getAllFavourites = async(req,res)=>{
    try{
      const {email} = req.body ;
      const existingUser = await User.findOne({email});
      if(existingUser)
      {
        const favresd = await existingUser.favResidenciesID ;
        return res.status(200).json({
         favresd 
        })
      }
      else{
        return res.status(400).json({
         message:"User don't exist "
        })
      }
    }catch(error)
    {
     return res.status(404).json({
        message:"Can't fetch fav residency details ",
        error:error.message
     })
    }
}


exports.toFav = async(req,res)=>{
    const{email}=req.body ;
    const{rid} = req.params ;

    try{
        const user = await User.findOne({ email });

        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
    
        const isFavorite = user.favResidenciesID.includes(rid);
    
        let updateUser;
    
        if (isFavorite) {
          // Remove the residency ID from favorites
          user.favResidenciesID = user.favResidenciesID.filter(id => id !== rid);
          updateUser = await user.save();
          return res.status(200).json({ message: "Removed from favorites", user: updateUser });
        } else {
          // Add the residency ID to favorites
          user.favResidenciesID.push(rid);
          updateUser = await user.save();
          return res.status(200).json({ message: "Added to favorites", user: updateUser });
        }
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    };

    exports.getAllBookings = async (req, res) => {
        const { email } = req.body;
      
        try {
          // Find the user by email and select their booked visits
          const user = await User.findOne({ email }, { bookedVisits: 1 });
      
          if (!user) {
            return res.status(404).json({ message: "User not found" });
          }
      
          // Return the user's booked visits
          return res.status(200).json(user.bookedVisits);
        } catch (error) {
          return res.status(500).json({ error: error.message });
        }
      };