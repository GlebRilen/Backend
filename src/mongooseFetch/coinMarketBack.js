const express = require('express')
const app = express()
const cors = require('cors')
app.use(express.json())
app.use(cors())
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // Allow all domains
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
  });
const coinMarketBack = async function(req, res){
    let sym = req.body.sym
    let url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${sym}`
    console.log(url)
    let obj = {
        method: 'GET',
        headers: {
            'accept' : 'application/json',
            'X-CMC_PRO_API_KEY' : 'dd95cdc1-7dff-4353-8a1a-0e74863470c6'
        }
    }
    try{
        let response = await fetch(url, obj)
        if(response.ok) {
            let data = await response.json()
            res.status(200).json(data)
        } else {
            res.status(response.status).json({error : 'something went wrong to fetch coinmarket'})
        }
    } catch (e) {
        console.log('Error', e)
        res.status(500).json({error: 'server error'})
    }
}
  
module.exports = coinMarketBack