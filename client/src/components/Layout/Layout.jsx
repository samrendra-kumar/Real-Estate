import React from 'react'
import Header from '../Header/Header.jsx'
import Footer from '../Footer/Footer.jsx';
import { Outlet, createHashRouter } from 'react-router-dom';
import {useAuth0} from "@auth0/auth0-react" ;
import UserDetailContext from '../../context/UserDetailContext.js';
import {useMutation} from "react-query";
import { createUser } from '../../utils/api.js';
import { useEffect,useContext } from 'react';
import useFavourites from '../../hooks/useFavourites.jsx';
import useBookings from '../../hooks/useBookings.jsx';
const Layout = () => {

  useFavourites()
  useBookings()
  const{isAuthenticated,user,getAccessTokenWithPopup}=useAuth0() 
  const {setUserDetails}=useContext(UserDetailContext)
  const{mutate}=useMutation({
    mutationKey:[user?.email],
    mutationFn:(token) => createUser(user?.email,token),
  })
  useEffect(()=>{
    const getTokenAndRegister=async()=>{
      const res= await getAccessTokenWithPopup({
        authorizartionParams:{
          audience:"http://localhost:4000",
          scope:"openid profile email"
        }
      })
    
    localStorage.setItem("access_token",res)
    setUserDetails((prev)=>({...prev,token:res}));
    
    mutate(res);
    };
    isAuthenticated && getTokenAndRegister()
  },[isAuthenticated])
  return (
    <>
    <div style={{background:"var(--black)",overflow:"hidden"}}>
        <Header/>
        <Outlet/>
        </div>
        <Footer/>
   </>
  )
}

export default Layout