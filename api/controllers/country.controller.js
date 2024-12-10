import { errorHandler } from '../../utils/error.js';
import countries from './../../data.json' assert {type: 'json'};


export const fetchAllCountries=(req,res,next)=>{
  // console.log('req ',req.params.page)
  const countries1=[]
  const limit=12;
  const page=req.params.page;
  // if(page*limit>=countries.length)
  //   return next(errorHandler(404,'No more countries'))
  for(let i=(page-1)*limit;i<page*limit;i++){
    countries1.push(countries[i])
  }
  console.log('req11 ',req.params.page,countries1.length)
  return res.status(200).send(countries)
  // return res.json({
  //   countries:countries
  // })
}

export const fetchCountryByCode=(req,res,next)=>{
  try{
  countries.forEach(cnt=>{
    if(req.query.cc===cnt.cca2)
      return res.status(200).send(cnt)
  })
  return next(errorHandler(404,'Country not found'))
  }catch(e){
    next(e);
  }
}
export const fetchCountriesByRegion=(req,res,next)=>{
  try{
    let cntArr=[];
    countries.forEach(cnt=>{
      if(req.query.rg===cnt.region)
        cntArr.push(cnt.name.official)
    })
    if(!cntArr.toString()) 
      return next(errorHandler(404,'Country not found'))
    return re.status(200).send(cntArr.toString())    
  }catch(e){
    next(e);
  }
}
export const fetchCountryByName=(req,res,next)=>{
  try{
    countries.forEach(cnt=>{
      if(req.query.name===cnt.name.common){
        if(req.query.region){
            if(req.query.region===cnt.region)
              return res.status(200).send(cnt)
            else return next(errorHandler(404,'Country not found'))
        }else return res.status(200).send(cnt)
      }
    })  
  }catch(e){ 
    next(e); 
  }
}
export const fetchCountryByCapital=(req,res,next)=>{
  try{
    let cntArr=[]
    countries.forEach(cnt=>{
      if(req.query.capital==cnt.capital){
        cntArr.push(cnt.name.common)
      }
    })
    if(!cntArr.toString()) 
      return next(errorHandler(404,'Country not found'))
    return res.status(200).send(cntArr.toString()); 
  }catch(e){ 
    next(e); 
  }
}
export const fetchCountryByTimeZone=(req,res,next)=>{
  try{
    let cntArr=[]
    countries.forEach(cnt=>{
      if(req.query.timezone==cnt.timezones){
        cntArr.push(cnt.name.common)
      }
    })
    if(!cntArr.toString()) 
      return next(errorHandler(404,'Country not found'))
    return res.status(201).send(cntArr.toString());
  }catch(e){
    next(e); 
  }
}