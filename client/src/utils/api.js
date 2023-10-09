import axios from 'axios'
import dayjs from 'dayjs'
import {toast} from 'react-toastify'
export const api = axios.create({
    baseURL :"https://real-estate-ten-amber.vercel.app/api"
})

export const getAllProperties = async()=>{
    try{
     const response = await api.get("/residency/allresd",{
        timeout:10*1000,
     });
     if(response.status === 400 )
     {
        throw response.data 
     }
     return response.data 
    }catch(error)
    {
        toast.error("Something went wrong")
        throw error 
    }
}

export const getProperty = async(_id)=>{
    try{
     const response = await api.get(`/residency/${_id}`,{
        timeout:10*1000,
     });
     if(response.status === 400 )
     {
        throw response.data 
     }
     return response.data 
    }catch(error)
    {
        toast.error("Something went wrong")
        throw error 
    }
}

export const createUser = async(email,token)=>{
    try{
     await api.post(`/user/register`,{email},{
        headers:{
            Authorization:`Bearer ${token}`,
        }
        
     })
    }catch(error){
      if(error.message==="Request failed with status code 400") 
      {
        toast.success("You are already registered")
      } else{
        toast.error("Something went wrong,Please try again")
        throw error 
      }
    }
}

export const bookedVisit=async(date,propertyId,email,token)=>{
    try{
   await api.post(
    `/user/bookVisit/${propertyId}`,
    {
        email,
        id:propertyId,
        date:dayjs(date).format("DD/MM/YY")
    },{
        headers:{
            Authorization:`Bearer ${token}`,
        }
    }
   )
    }catch(error)
    {
        toast.error("Something went wrong ,Please try again")
        throw error 
    }  
}

export const removeBooking = async(id,email,token)=>{
    try{
        await api.post(
            `/user/cancelbooking/${id}`,
           {
            email  
           },{
            headers:{
                Authorization:`Bearer ${token}`,
            },
           }
        );
    }catch(error){
        toast.error("Something went wrong,Please try again")
        throw error ;
    }
}

export const toFav = async(id,email,token)=>{
    try{
     await api.post(
        `/user/toFav/${id}`,
        {
            email,
        },
        {
            headers:{
                Authorization :`Bearer ${token}`
            },
        }
     )
    }catch(error)
    {
    toast.error("Something went wrong,Please try again ")
   throw error
    }
}

export const getAllFav = async(email,token)=>{
    if(!token) return 
    try{
      const res = await api.post(
        `/user/getallfav`,
        {
            email,
        },
        {
          headers:{
            Authorization:`Bearer ${token}`
          },
        }
      );
     
      return res.data["favresd"]
    }catch(error)
    {
        toast.error("Something went wrong while fetching data ")
        throw error
    }
}

export const getAllBookings = async(email,token)=>{
    if(!token) return 
    try{
      const res= await api.post(`/user/getallBookings`,
      {
        email,
      },
      {
        headers:{
            Authorization:`Bearer ${token}`,
        },
        
      }
      );
      console.log("data",res.data)
      return res.data


    }catch(error)
    {
        toast.error("Something went wrong while fetching bookings");
        throw error
    }
}

export const createResidency = async(data,token)=>{
    try{
     const res = await api.post(
        `/residency/create` ,
        {
            data,
            
        },
        {
            headers:{
                Authorization:`Bearer ${token}`
            },
        }
     )
     console.log("resdata",data )
     return data ;
    }catch(error)
    {
       throw error 
    }
}