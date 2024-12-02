import { useEffect, useState } from 'react'
import { Country } from './App'

export default function useLoadData() {
  const [countries,setCountries]=useState<Country[]>([])
  const [regionFilt,setRegionFilt]=useState<String[] | undefined>([])
  const [timezoneFilt,setTimezoneFilt]=useState<String[] | undefined>([])
  const [page,setPage]=useState(1);
  
  //fetch all countries initial load:
  const fetchCountries = async () => {
    const res = await fetch(`api/country/${page}`, {
      method: 'GET'
    });
    const response=await res.json();
    setCountries(response)
 }

 //fetch list of all regions as array
 const loadAllRegions=()=>{
  try{
    let filteredRegions:string[]=[]

    countries.filter(country=>{
      if(country.region&&filteredRegions&&!filteredRegions.includes(country.region))
        filteredRegions.push(country.region)
    })
    if(filteredRegions.length>0)
      setRegionFilt(filteredRegions)
    else setRegionFilt([])
  }catch(e){
    setRegionFilt([])
  }
 }

 //fetch list of all timezones as array
 const loadAllTimezones=()=>{
  try{
    let filteredTimeZones:string[]=[]

    countries.filter(country=>{
      country.timezones?.forEach(time=>{
      if(!filteredTimeZones.includes(time))
        filteredTimeZones.push(time)
      })
    })
    if(filteredTimeZones.length>0)
      setTimezoneFilt(filteredTimeZones)
    else setTimezoneFilt([])
  }catch(e){
    setTimezoneFilt([])
  }
 }

 //load all changes initial load:
  useEffect(()=>{
    fetchCountries()
  },[])
  
 //re-load region and timezone lists on change in countries and initial load
  useEffect(()=>{
    loadAllRegions()
    loadAllTimezones()
  },[countries])
  return {countries,regionFilt,timezoneFilt,setPage}
}
