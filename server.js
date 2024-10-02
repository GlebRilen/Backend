const express = require('express')
require('dotenv').config()
const port = process.env.PORT
const getOrderData = require('./src/router.js');
const cors = require('cors')
const app = express()
let bodyParser = require('body-parser')
let jsonParser = bodyParser.json({ limit: '9000kb' })
app.use(cors())
const start = async function(){
    app.listen(port, () => console.log('server has been started at port: '+port))
}
start()
app.use('/api/v1/crypto', jsonParser, getOrderData)
app.use(express.json())
