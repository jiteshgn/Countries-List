import { useEffect, useState } from 'react'
import './App.css'
import FilterCountry from './FilterCountry';
import useLoadData from './useLoadData';
import { ColorRing } from "react-loader-spinner";

export type Country={
    name:{
      common:string;
    };
    flag?:string;
    region?:string;
    timezones?:string[];
    capital?: string[];
    population:number;
    currencies:{};
    languages:{};
    flags:{
      png?:string
    }
}
export type ValuesType={
  input1?:string;
  capitalcheck?:string | boolean;
  regions:string;
  timezones:string;
}
function App() {
  const {countries,regionFilt,timezoneFilt,page,setPage}=useLoadData()
  
  const [contName, setContName] = useState<string>('')
  const [filtCountries,setFiltCountries]=useState<Country[]>([])
  const [values,setValues]=useState<ValuesType>({
    input1:'',
    capitalcheck:false,
    regions:'',
    timezones:''
  })
  const [init,setInit]=useState(true)
  const [selRegion,setSelRegion]=useState('All Regions')
  const [selTimezone,setSelTimezone]=useState('All TimeZones')
  const [check,setChecked]=useState(false)
  const [loadCheck,setLoadCheck]=useState(false)  
  const [loading, setLoading] = useState(false);
  const [scrollLoading, setScrollLoading] = useState(false);
  
  //Spinner loaded through useEffect for initial load and change in country list:
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  //initially and change in country list, set the countries variable
  useEffect(() => {
    setFiltCountries(countries)
  }, [countries]);

  useEffect(() => {
    setTimeout(()=>setScrollLoading(false),2000)
  }, [scrollLoading]);

  // any change in variables are captured into values
  const handleChange=(elemname:string,elemvalue:string)=>{
    if(elemname==='input1') setContName(elemvalue)
      if(elemname==='regions') setSelRegion(elemvalue)
      if(elemname==='timezones') setSelTimezone(elemvalue)


      let values1:ValuesType | any={...values};
      if(elemname==='capitalcheck'){
        values1[elemname]=elemvalue;
        setChecked(!check)
      }else{ values1[elemname]=elemvalue;}

      setValues(values1)
  }

  //Country select and form submission through Submit button
  const handleSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    console.log(values)
    let filteredData=countries;
    setInit(false);
    setLoading(true);
    
    //filters for input and select
    if(values?.input1 && !values.capitalcheck){
      filteredData=filteredData.filter(country=>
        values.input1&&country.name.common.toLowerCase().includes(values.input1.toLowerCase())
        )
    }
    
    if(values?.input1 && values.capitalcheck){
      filteredData=filteredData.filter(country=>{
        let capital2=country.capital?.filter(capital=>{
          if(values.input1&&capital.toLowerCase().includes(values.input1.toLowerCase()))return country
      })
      if(capital2?.length&&capital2?.length>0) return capital2
      })
    }

    if(values?.regions && values.regions!=='All Regions'){
      filteredData=filteredData.filter(country=>
          country.region===values.regions
        )
    }
    if(values?.timezones && values.timezones!=='All TimeZones'){
      filteredData=filteredData.filter(country=>
          country.timezones?.includes(values.timezones)
        )
    }
    setFiltCountries(filteredData)

    {(!values?.input1 && values?.regions==='All Regions' && values.timezones==='All TimeZones') ? setFiltCountries(countries):''}

    setTimeout(()=>setLoading(false),500);
  } 
  const [page1,setPage1]=useState(1)
  //function for infinite scroll
  const handleScroll:()=>void=():void=>{
    const {scrollTop,clientHeight,scrollHeight}=document.documentElement
    //  console.log(page,scrollTop,clientHeight,scrollHeight - 10)
    // if(scrollHeight+1 + window.innerHeight >= scrollTop && !scrollLoading ){   
      // if((scrollTop > clientHeight*page1) && !scrollLoading ){  
        if(scrollTop + clientHeight >= scrollHeight - 10 && !scrollLoading ) {
      //scrollHeight - 10 && !scrollLoading   
      // setScrollLoading(true);
      // setPage(prev=>prev+1);
      setPage1(prev=>prev+1);
    }
  }
  //infinite scroll on scrolling
  useEffect(():()=>void=>{
    window.addEventListener("scroll",handleScroll)

    return():void=>{
      window.removeEventListener("scroll",handleScroll)
    }
  },[page1])

  return (
    <>
    {loading ? (
      //load spinner loader
    <div className="loader-container">
      <ColorRing visible={true} height="80" width="80" ariaLabel="blocks-loading" wrapperStyle={{}} wrapperClass="blocks-wrapper" colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}/></div>):<>
    <div className='formwrp'>
      {/* form for country input and select*/}
    <form onSubmit={handleSubmit}>
    {check?
    <>
    <label>Search By Capital</label><br/>
  </>:
    <>
      <label>Search by Country Name</label><br/>
    </>
    }
    <input type="text" onChange={(e:React.ChangeEvent<HTMLInputElement>)=>handleChange(e.target.name,e.target.value)} name="input1" value={contName}/>
    <br/><label className='cpe'>Capital:
    <input type="checkbox" onChange={(e:React.ChangeEvent<HTMLInputElement>)=>handleChange(e.target.name,e.target.checked.toString())} name="capitalcheck" checked={check}/></label><br/>
    <select name="regions" onChange={(e:React.ChangeEvent<HTMLSelectElement>)=>handleChange(e.target.name,e.target.value)} value={selRegion}><option>All Regions</option>
      {regionFilt?.map((region,i)=><option key={i}>{region}</option>)}
    </select>&emsp;
    <select name="timezones" onChange={(e:React.ChangeEvent<HTMLSelectElement>)=>handleChange(e.target.name,e.target.value)} value={selTimezone}><option>All TimeZones</option>
      {timezoneFilt?.map((timezone,i)=><option key={i}>{timezone}</option>)}
    </select>
    <button id="subbtn">Submit</button>
    </form></div>    

    {/* Passing the filtered countries to FilterCountry Component */}
    <FilterCountry countries={filtCountries} loadCheck={loadCheck} setLoadCheck={setLoadCheck}/>

    {filtCountries.length===0 && !init?'No Data Found, please try again':''}
    {scrollLoading?'Loading data...':''}
    </>}
    </>
  )
}

export default App
