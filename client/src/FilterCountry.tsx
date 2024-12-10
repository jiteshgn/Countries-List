import { lazy, Suspense, useEffect, useState } from "react";
import { Country } from "./App";
import CountryDetails from "./CountryDetails";
const MyCardComponent = lazy(() => import('./CardComponent'));

interface FilterProps{
  countries:Country[];
  loadCheck:boolean;
  setLoadCheck:(loadCheck:boolean)=>void;
}
export default function FilterCountry({countries,loadCheck,setLoadCheck}:FilterProps) {
  const [details,setDetails]=useState(false)
  const [currentCountry,setCurrentCountry]=useState<Country | any>()
  const limit=5;
  const [count,setCount]=useState(1)
  const [limitedCountries,setLimitedCountries]=useState<Country[]>([])
  const [noData,setNoData]=useState(false)
  
  //handles the click on country to fetch the country details
  const handleClick=(country:Country)=>{
    setDetails(true)
    setCurrentCountry(country)
  }
  //close details popup
  const clkClsBtn=()=>{
    setDetails(false)
  }
  //load the countries on initial load and change in countries in useEffect() below
  const initData=()=>{
    let countries2:Country[]=[]
    if(countries.length>0){
      for(let i=0;i<limit;i++){
        countries2.push(countries[i])
      }      
      {loadCheck?setLimitedCountries(countries2):setLimitedCountries(countries)}
    }
  }
  useEffect(()=>{
    initData()
  },[countries,loadCheck])

  //fetch more countries based on the limit value and increment the count
  const fetchMoreData=()=>{
    let countries3:Country[]=[]
    if(countries.length>0){
      for(let i=count*limit;i<((count+1)*limit);i++){
        countries[i]?countries3.push(countries[i]):''
      }      
      {loadCheck?setLimitedCountries([...limitedCountries,...countries3]):''} 
      setCount(count+1)
    }
  }
  //refetch the data on change in count variable and initial load, also set the no data to true if no more countries
  useEffect(()=>{
    fetchMoreData    
    if((count)*limit>=(countries.length) && countries.length!==0) setNoData(true)
  },[count])
  return (
    
    <><div id="loadmorediv"><label className='cpe'><p>Load More Countries</p><input onChange={()=>setLoadCheck(!loadCheck)} name="loadcheck" checked={loadCheck} type="checkbox" id="loadmorecheck"/></label>
    {countries.length>0 && loadCheck?
    <><button className="loadMoreData" onClick={fetchMoreData} disabled={noData}>Load More Countries</button><span>({countries.length%limit!=0 && count*limit>=countries.length?((count-1)*limit)+(countries.length%limit):(count)*limit}/{countries.length})</span></>:''}</div>
    <div className='searchresults'>
      {/* fetch the country details when clicked */}
      {details?      
      <CountryDetails currentCountry={currentCountry} clkClsBtn={clkClsBtn}/>:''}
       <>
       {/* show the list of countries based on criteria */}
      <Suspense fallback={<div>Loading...</div>}>   
    {limitedCountries?.map((country:Country,index:number)=>country?<div key={index} className='carddiv'>   
      <MyCardComponent country={country} handleClick={handleClick}/>
    </div>:'')}
    </Suspense>
    </>
    </div>
    {noData?<div className="nomoredata">No More Data Found</div>:''}</>
  )
}
