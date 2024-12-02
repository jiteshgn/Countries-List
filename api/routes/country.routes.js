import express from "express";
import { fetchAllCountries,fetchCountryByCode,fetchCountriesByRegion,fetchCountryByName,fetchCountryByCapital,fetchCountryByTimeZone } from "../controllers/country.controller.js";
const router=express.Router();

//routes for various APIs
router.get('/:page/',fetchAllCountries)
router.get('/code/',fetchCountryByCode)
router.get('/region/',fetchCountriesByRegion)
router.get('/name/',fetchCountryByName)
router.get('/capital/',fetchCountryByCapital)
router.get('/timezone/',fetchCountryByTimeZone)

export default router;