import React,{useContext,useState} from 'react'
import UserDetailContext from '../../context/UserDetailContext'
import "../Properties/Properties.css"
import useProperties from '../../hooks/useProperties.jsx'
import {PuffLoader} from 'react-spinners'
import SearchBar from '../../components/SearchBar/SearchBar.jsx'
import PropertyCard from '../../components/PropertyCard/PropertyCard.jsx'
const Favourites = () => {
  
    const{data,isError,isLoading}=useProperties() ;
    const [filter, setFilter] = useState("");
  const {
    userDetails: {favourites },
  } = useContext(UserDetailContext);


    if(isError){
      return(
        <div className='wrapper'>
          <span>Error while fetching data </span>
        </div>
      )
    }
    if(isLoading)
    {
   return(
      <div className="wrapper flexCenter" style={{height:"60vh"}}>
        <PuffLoader
        height="80"
        width="80"
        radius={1}
        color="#4066ff"
        aria-label="puff-loading"
        />
       
      </div>
   )

    }
    console.log(data);
    const dataArray=Object.values(data);
    console.log("BOOKINGDATa",dataArray[1]);
    console.log({favourites}) 
    const dataIds= dataArray[1].map(item=>item._id);
    
   // const commonIds = dataIds.filter(id=>favouriteIds.includes(id))
    const commonObjects = dataArray[1].filter(item =>favourites.includes(item._id ));
   console.log("dataIds",dataIds);
   //console.log("favouriteIds",favouriteIds );
   //console.log("commonIds",commonIds);
   console.log("commonObjects",commonObjects)
  return (
    
    <div className="wrapper">
       <div className="flexColCenter paddings innerWidth properties-container">
       <SearchBar filter={filter} setFilter={setFilter}/>
        <div className="paddings flexCenter properties">
          {
          
         
          
          commonObjects
          .filter(
            (property)=>
          property.title.toLowerCase().includes(filter.toLowerCase()) ||
                  property.city.toLowerCase().includes(filter.toLowerCase()) ||
                  property.country.toLowerCase().includes(filter.toLowerCase())
            
          )
            
           // property.title.toLowerCase().includes(filter.toLowerCase()) ||
           // property.city.toLowerCase().includes(filter.toLowerCase())  || 
           // property.country.toLowerCase().includes(filter.toLowerCase())
         // )
         
        .map((card,i)=>
          <PropertyCard card={card} key={i}/> 
            //console.log(`Title ${index+1}:${card.title}`);
            
          )

        
             
            
          }
          
        </div>
       </div>
    </div>
  )
}

export default Favourites 
