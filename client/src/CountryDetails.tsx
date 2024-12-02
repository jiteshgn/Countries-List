import { useEffect, useState } from "react";
import { ColorRing } from "react-loader-spinner";

type CountryType={
  currentCountry:{
    name:{
      common:string;
    };
    currencies?:[{
      name?:string,
      symbol?:string
    }],
    population?:number;
    flag?:string;
    region?:string;
    flags?:{
      png?:string
    }
    languages?:{};
  };
  clkClsBtn:()=>void;
}
export default function CountryDetails({currentCountry,clkClsBtn}:CountryType) {
  const [loading, setLoading] = useState(false);
  const [currencyArr,setCurrencyArr]=useState<[{name1:string,name:string,symbol:string}] | any>([{
      name1:"",
      name:"",
      symbol:""
  }])
  const [languageArr,setLanguageArr]=useState<[{name:string,short:string}] | any>([{
      name:"",
      short:""
  }])

  //fetch the currency list as array
  const fetchCurrencies=()=>{    
    let curArr:{name1:string,name:string,symbol:string}[]=[]
    {currentCountry?.currencies&&Object.keys(currentCountry?.currencies).map((elem:any) => {
      curArr.push({
          name1:elem,
          name:elem.name,
          symbol:elem.symbol
        }) 
    })

    setCurrencyArr(curArr) 
  }}

  //fetch the language list as array
  const fetchLanguages=()=>{  
    let lngArr:{name:string,short:string}[]=[]
    {currentCountry?.languages&&Object.keys(currentCountry?.languages).map((elem:any) => {   
        lngArr.push({
          name:elem,
          short:elem
        }) 
    })

    setLanguageArr(lngArr) 
  }}
  //fetch the currency and language list on change of country and initial load
  useEffect(()=>{
    fetchCurrencies()
    fetchLanguages()
},[currentCountry])

  return (<>
  {/*show loading spinner*/}
  {loading?<div className="loader-container">
          <ColorRing visible={true} height="80" width="80" ariaLabel="blocks-loading" wrapperStyle={{}} wrapperClass="blocks-wrapper" colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}/></div>:    
    <>{/* show the coutnry details as popup on clicking country list */}
    <div className="countrydetailswrp">
    <div className="countrydetails">
      <button className="closebtn" onClick={clkClsBtn}><span>x</span></button>
      <div>
      <h4>Country Details</h4><br/>
      <img src={currentCountry?.flags?.png} loading="lazy"/>      
      <div><label>Name:</label><p>{currentCountry?.name?.common}</p></div><hr/>
      <div><label>Population:</label><p>{currentCountry.population}</p></div><hr/>
      <div>{currencyArr.map((currency:{name1:string,name:string,symbol:string},i:number)=><div className="curdiv" key={i}>
        <u>Currency:</u>
        <label>Currency: </label><p>{currency.name1}</p><br/>
        <label>Name: </label><p>{currency.name}</p><br/>
        <label>Symbol: </label><p>{currency.symbol}</p><br/>        
        </div>
      )}</div><hr/>
      <div>
      <u>Languages:</u>
      <div className="lngdetailsdiv"><label>&emsp;</label><p className="lnginnerdiv">{languageArr.map((lng:{name:string,short:string},i:number)=><span key={i}>
        {lng.name} (<span>{lng.short}</span>)
        {i!==languageArr.length-1?<>,<br/></>:''}       
        </span>
      )}</p></div></div><hr/>
      <div><label>Flag:</label><p>{currentCountry.flag}</p>
      </div><hr/>
      <div><label>Region:</label><p>{currentCountry.region}</p>
      </div><hr/>
      </div>
      </div>
    </div></>}
  </>)
}
