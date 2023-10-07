
import Website from './Pages/Website.jsx';
import {Suspense,useState} from "react";
import Layout from './components/Layout/Layout.jsx'
import {BrowserRouter,Routes,Route } from "react-router-dom" ;
import Properties from './Pages/Properties/Properties.jsx';
import {QueryClient, QueryClientProvider} from 'react-query'
import {ReactQueryDevtools} from "react-query/devtools"
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Property from './Pages/Property/Property.jsx';
import UserDetailContext from './context/UserDetailContext.js';
import Bookings from './Pages/Bookings/Bookings.jsx';
import Favourites from './Pages/Favourites/Favourites.jsx';
function App() {
  const queryClient = new QueryClient() 

  const[userDetails,setUserDetails]=useState({
    favourites:[],
    bookings:[],
    token:null
  })
  return (
   <UserDetailContext.Provider value={{userDetails,setUserDetails}}>
    <QueryClientProvider client={queryClient}>
          <BrowserRouter>
    <Suspense fallback={<div>Loading...</div>}>

    <Routes>
      <Route element={<Layout/>}>
    <Route path="/" element={ <Website/>}/>
    <Route path="/properties">
    <Route index element ={<Properties/>} />
      <Route path=":propertyId" element={<Property/>} />
    </Route>
    
    <Route path="/bookings" element={<Bookings/>} />
    <Route path="/favourites" element={<Favourites/>} />
    </Route>
    </Routes>
    </Suspense>
    
     
     </BrowserRouter>
     <ToastContainer/>
     <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>

   </UserDetailContext.Provider>

    
   
   
  );
}

export default App;
