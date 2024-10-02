const crypto = require('crypto');
require('dotenv').config()

const binanceOrderSend = async function(symbol, side, type, quantity, price) {
  console.log(symbol, side, type, quantity, price)
  const apiKey = process.env.BINANCE_API_KEY
  const apiSecret = process.env.BINANCE_API_SECRET
  const endpoint = 'https://fapi.binance.com/fapi/v1/order'
  try{
    let params = {}
    let queryString = ''
      let signature = ''
    if(side === 'BUY'){
      if(type === 'STOP'){
        params = { 
          symbol, 
          side : 'BUY', 
          type : 'STOP', 
          quantity, 
          stopPrice : price, 
          price : price,
          timestamp : Date.now(), 
          timeInForce:'GTC' }
        queryString = Object.keys(params).map(key => `${key}=${encodeURIComponent(params[key])}`).join('&')
        signature = crypto.createHmac('sha256', apiSecret).update(queryString).digest('hex')

      }
    }

      queryString+='&signature='+signature
      const url = endpoint+'?'+queryString
      console.log(queryString, url)
      const request = await fetch(url, {
        method: 'POST',
        headers:{
          'X-MBX-APIKEY' : apiKey,
          'Content-Type' : 'appication/x-www-form-urlencoded'
        }
      })

      const response = await request.json()
      
      return response
    } catch (e) {
    console.log('Error ', e)
  }
}

const binanceFuturesBuy = async function (symbol, side, type, quantity, price) {
    let transaction = await binanceOrderSend(symbol, side, type, quantity, price)
    console.log(transaction)
}
module.exports = binanceFuturesBuy
