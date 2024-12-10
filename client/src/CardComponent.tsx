import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Country } from "./App";
import { useEffect, useState } from 'react';

interface CardProps{
  country:Country;
  handleClick:(country:Country)=>void;
}

export default function CardComponent({country,handleClick}:CardProps) {
  const [custTime,setCustTime]=useState<string[] | undefined>([])

  // calculate the local date and time for each coutnry
  const calcTime=(timezones?:string[])=>{
    let timezones2:string[] | undefined=[];
    const d = new Date();
    const localTime:number = Number(d.getTime());
    const localOffset:number = Number(d.getTimezoneOffset() * 60000);
    const utc:number = localTime + localOffset;
    timezones?.forEach((time:string)=>{      
      const offset:string = time.slice(3);
      const sign:string=offset.charAt(0)
      const hrs=Number(offset.slice(1,3))
      const min=Number(offset.slice(-2))/60
      let offset2=Number(hrs+min)
      if(sign==='-') offset2=offset2*-1

      const usa = utc + (3600000 * offset2);
      const localTimeNow = new Date(usa).toLocaleString();
      timezones2.push(localTimeNow)
    })
    setCustTime(timezones2);
  }

  const pattern = new RegExp(',')
  useEffect(()=>{
    //calculate date and time for initial load
    calcTime(country.timezones)
  },[])
  return (
    <>{/* Using Card component */}
  <Card className="card1" sx={{ maxWidth: 345 }} onClick={()=>handleClick(country)}>
    <CardContent>
    <div className='cardImg'><img src={country.flags.png}  loading="lazy"/></div>
      <div className='cardTxt'>
      <Typography gutterBottom variant="h5" component="div">
      <label>Name:</label> <span>{country.name.common}</span>
      </Typography>
      <Typography gutterBottom variant="h5" component="div">
      <label>Flag:</label> <span>{country.flag}</span>
      </Typography>
      <Typography gutterBottom variant="h5" component="div">
      <label>Region:</label> <span>{country.region}</span>
      </Typography>
      <Typography gutterBottom variant="h5" component="div">
      <label><p>Local Date & Time:</p></label>
      <span>{custTime&&custTime.length>0?<p>{custTime[0].split(pattern,1)[0]}<br/></p>:''}
      <section>{custTime?.map((time,i)=><p key={i}>
        
        {time.split(pattern,2)[1]}
        
        
        </p>)}</section></span>
      </Typography>
      </div>
    </CardContent>
  </Card></>
  )
}
