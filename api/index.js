import express from 'express';
import countryRouter from './routes/country.routes.js';
import  getListings from './models/countries.model.js';

const app=express();

app.use(express.json());
getListings()

app.listen(3000,()=>{
  console.log('Server is running on port 3000!!')
})

//routed to CountryRouter
app.use('/api/country',countryRouter);

//error check
app.use((err,req,res,next)=>{
  const statusCode=err.statusCode || 500;
  const message=err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success:false,
    statusCode,
    message
  })
})


