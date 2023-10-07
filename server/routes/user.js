const express = require("express");
const {jwtCheck}= require("../config/authOConfig");
const router=express.Router() ;
const{createUser,bookedVisit,cancelBooking,getAllFavourites,toFav,getAllBookings} = require("../controllers/userController");
router.post("/register",createUser);
router.post("/bookVisit/:id",bookedVisit);
router.post("/cancelbooking/:id",cancelBooking)
router.post("/getallfav",getAllFavourites);
router.post("/toFav/:rid",toFav);
router.post("/getallbookings",getAllBookings);
module.exports=router ;