import express from "express";
import fs from 'fs';
const data='./data.json'
const url='https://restcountries.com/v3.1/all';

//get the countries list from the url and cache into data.json for subsequent uses
export default function getListings(){
  try{
  fs.readFile(data,async(err,result)=>{
    if(err) console.log('Error')
      else{ 
        if(Object.keys(result).length == 2){
          const listing=await fetch(url)
            .then(res=>res.json())
            fs.writeFile(data, JSON.stringify(listing), 'utf8', (err) => {
              if (err) {
                  console.error('Error writing to file', err);
              } else {
                  console.log('Data written to file');
              }
          });
        }}
    })
  }catch(e){}
}