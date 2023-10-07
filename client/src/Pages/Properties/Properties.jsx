import React,{useState}from 'react'
import SearchBar from "../../components/SearchBar/SearchBar.jsx"
import './Properties.css' 
import useProperties from '../../hooks/useProperties'
import {PuffLoader} from 'react-spinners'
import PropertyCard from '../../components/PropertyCard/PropertyCard.jsx'

const Properties = () => {
  
    const{data,isError,isLoading}=useProperties() ;
    const[filter,setFilter] = useState("") ;
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
    console.log(dataArray[1]);
  return (
    
    <div className="wrapper">
       <div className="flexColCenter paddings innerWidth properties-container">
        <SearchBar filter={filter} setFilter={setFilter}/>
        <div className="paddings flexCenter properties">
          {
          
          dataArray[1]
          .filter((property)=>
          property.title.toLowerCase().includes(filter.toLowerCase()) ||
          property.city.toLowerCase().includes(filter.toLowerCase()) ||
          property.country.toLowerCase().includes(filter.toLowerCase()))
          
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

export default Properties