const express = require("express");
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())
let router = express.Router();
let countries = require('./countries');

router
    .route('/')
    .get((req, res) => {res.send(countries)})
    .post((req, res) => {
        const {
            id,
            name,
            alpha2Code,
            alpha3Code,
        } = req.body;
        const addCountry = {
            id,
            name,
            alpha2Code,
            alpha3Code,
        };
        countries.push(addCountry);
        res.send(addCountry)    
    });

router
    .route('/:code')
    .get((req, res) => {
        const code = req.params.code;
        const country = countries.find(country => country.alpha2Code === code || country.alpha3Code === code)
        if(!country){
            return  res.status(404).send('No country found')
        }
        res.send(country)
    })
    .put((req, res) => {
        const code = req.params.code;
        const country = countries.find(country => country.alpha2Code === code || country.alpha3Code === code);
        const { 
            id,
            name,
            alpha2Code,
            alpha3Code,
        } = req.body;

        const updatedField = (val, prev) => !val ? prev : val;
    
        
        const updatedCountry = {
            ...country,
            id: updatedField(id, country.id),
            name: updatedField(name, country.name),
            alpha2Code: updatedField(alpha2Code, country.alpha2Code),
            alpha3Code: updatedField(alpha3Code, country.alpha3Code)
        }
        const countryIndex = countries.findIndex(country => country.alpha2Code === code || country.alpha3Code === code);
        console.log(countryIndex)
        countries.splice(countryIndex, 1, updatedCountry);
        
        if(!country){
            return res.status(404).send('No country found')
        }
        
        res.send(updatedCountry)
    })

    .delete((req, res) => {
        const code = req.params.code;

        let country = countries.find(country => country.alpha2Code === code);
        console.log(country)
        if(country) {
            countries = countries.filter(country => country.alpha2Code !== code)
            res.send(countries)
        } else {
            return res.status(404).send('No country found')
        }

    })
module.exports = router;