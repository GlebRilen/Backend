const express = require('express')
const app = express()
const cors = require('cors');
app.use(cors())
const TelegramBot = require('node-telegram-bot-api');
const binanceFuturesBuy = require('./binanceFuturesBuy.js');
const tokenGroup = '7059940751:AAHruorzCgdc7Ty5BmEG93IH6Yz8BJ9wT2A'
const tokenFut = '7312827161:AAFEmsWQpjAg9lFRu6ZKBbZRsMsd9L-VtWs' //BinFutOrdBot
const botFut = new TelegramBot(tokenFut, {polling: true})
const botGroup = new TelegramBot(tokenGroup, {polling: true})
const chatIdFut = 373193638 // Replace 'YOUR_CHAT_ID' with the chat ID where you want to send the picture  // MyBotZettaSpy
const chatIdGroup = -1002234373641 // Replace 'YOUR_CHAT_ID' with the chat ID where you want to send the picture  //Group GlebRilenBot

botFut.on('callback_query', qu => {
    let arr = JSON.parse(qu.data)
    let symbol = `${arr[0]}`
    let side = `${arr[1]}`
    let type = `${arr[2]}`
    let quantity = `${arr[3]}`
    let price = `${arr[4]}`
    console.log(symbol, side, type, quantity, price)
    binanceFuturesBuy(symbol, side, type, quantity, price)

})

async function sendPictureToBot(chatIdGroup, chatIdFut, base64Image, captBody) {
   
    let answer = null
    let capt = captBody.caption  // caption for picture sent to telegram
    let patternObject = captBody.body['ob'] //Object of all data
    let SL = patternObject.pattern['P1P']*1
    let TP138price = patternObject.pattern['PAP']*1
    let EXCHANGE = patternObject.EX.split('_')[0]
    let ASSET = patternObject.EX.split('_')[1]
    let SYMBOL = patternObject.ticker
    let SIDE = 'BUY'
    let TYPE = 'STOP'
    let PRICE = patternObject.top
    // let QUANTYTY = 20/(PRICE - SL)
    let QUANTYTY = PRICE - SL
    // let buyStopPrice = patternObject.top
    // let quantity = 20/(PRICE - SL)
    console.log(SYMBOL, QUANTYTY, PRICE, SL)
    try {
        console.log('sendPictureToBot')
        answer = await botGroup.sendPhoto(chatIdGroup, base64Image, capt);
        if(ASSET === 'FUTURES'){
        await botFut.sendPhoto(chatIdFut, base64Image, capt);
        await botFut.sendMessage(chatIdFut, 'Как поступим?', {
            reply_markup: {
                inline_keyboard: [
                    [{
                        text: `["${SYMBOL}", "${SIDE}", "${TYPE}", ${Math.round(10/QUANTYTY)}, ${PRICE}]`,
                        callback_data: `["${SYMBOL}", "${SIDE}", "${TYPE}", ${Math.round(10/QUANTYTY)}, ${PRICE}]`
                    }],
                    [{
                       text: `["${SYMBOL}", "${SIDE}", "${TYPE}", ${Math.round(20/QUANTYTY)}, ${PRICE}]`,
                        callback_data: `["${SYMBOL}", "${SIDE}", "${TYPE}", ${Math.round(20/QUANTYTY)}, ${PRICE}]`
                    }],
                    [{
                        text: `["${SYMBOL}", "${SIDE}", "${TYPE}", ${Math.round(50/QUANTYTY)}, ${PRICE}]`,
                        callback_data: `["${SYMBOL}", "${SIDE}", "${TYPE}", ${Math.round(50/QUANTYTY)}, ${PRICE}]`
                    }]
                ]
            }
        })
        }
        // console.log(keyboard)
        console.log('Picture sent successfully.');
    } catch (error) {
        answer = 'error'
        console.log('Error sending picture:', error);
    }
    return answer
}
const sendPic = async function(body) {
    let answer = null
    // try{
        console.log('trying to fetch image in sendPic')
        let coin = body.ob.coin,
            tf = body.tf,
            circCap = body.circCap,
            percent = body.percent,
            exName = body.exName,
            urlRef    = 'https://binance.com',
            TP     = body.ob.TP,
            TP138  = body.ob.TP138,
            goal   = body.goal,
            TPText = null,
            urlCoin = null,
            exchange = ''
            if(exName === 'BINANCE_SPOT') {
                urlCoin  = `https://www.binance.com/ru/trade/${coin}_USDT?type=spot`
                exchange = 'BINANCE.COM'
                urlRef   = 'https://accounts.binance.com/register?ref=BO9V7HY6'
            }
            if(exName === 'BINANCE_FUTURES') {
                urlCoin  = `https://www.binance.com/ru/futures/${coin}_USDT`
                exchange = 'FUTURES BINANCE.COM'
                urlRef   = 'https://accounts.binance.com/register?ref=BO9V7HY6'
            }
            if(exName === 'BYBIT_SPOT') {
                urlCoin  = `https://www.bybit.com/uk-UA/trade/spot/${coin}/USDT`
                exchange = 'BYBIT.COM'
                urlRef   = 'https://www.bybit.com/invite?ref=OPJZNN'

            } 
            if(exName === 'OKX_SPOT')  {
                urlCoin  = `https://www.okx.com/ru/trade-spot/${coin}-usdt`
                exchange = 'OKX.COM'
                urlRef   = 'https://www.okx.com/join/9519544'
            }
            // https://www.binance.com/en/futures/WIFUSDT
///////////////

let pribil = body.ob.pattern['PAP']*1
let entrypoint = body.ob.top*1
let stopLoss = body.ob.pattern['P1P']
let TPSLratio = ((pribil - entrypoint)/(entrypoint - stopLoss)).toFixed(2)
if(body.ob.stage === 100 && goal !== 'S' && goal !== 'T') TPText = 
`<b>TRIANGLE FOR ${coin}:</b>
Buy: <b>${body.ob.top}</b> 
TP: <b>${body.ob.pattern['PAP'].toString().slice(0, 7)}</b>
SL: <b>${body.ob.pattern['P1P'].toString().slice(0, 7)}</b>
Profit: <b>+${TP138}%</b>
TP/SL Ratio: <b>${TPSLratio}</b>\n`

if(goal === 'S' && body.ob.data.cancell === true) TPText = 
`<b>Order cancelled:</b> price did'n reach entry point\n`

if(goal === 'S' && body.ob.data.cancell === false) TPText = 
`Order reach SL:
at level: <b>${body.ob.pattern['P1P'].toString().slice(0, 7)}</b>, <b>-${(((body.ob.top*1)/body.ob.pattern['P1P']*1 - 1)*100).toFixed(1)*1}%</b> 
Keep in mind: risk-management...\n`

if(goal === 'T' && body.ob.data.target138 === true && body.ob.data.target261 === false) TPText = 
`Price reach the goal:
TP: <b>${body.ob.pattern['PAP'].toString().slice(0, 7)}</b>
Earned: <b>+${TP138}%</b>
TP/SL: <b>${TPSLratio}</b>
My congratulations!\n</b>`
////////////////////////////////////////////////////////////////////////////////
            //\n - перенос строки
            let timeFrame = '5m'
            if(tf === 5) timeFrame = '5m'
            if(tf === 15) timeFrame = '15m'
            if(tf === 30) timeFrame = '30m'
            if(tf === 60) timeFrame = '1H'
            if(tf === 240) timeFrame = '4H'
            if(tf === 1440) timeFrame = 'D'

            let captBody = {
                body : body,
            caption : {
                caption : 
`${TPText}
\uD83D\uDE80 Coin: <b><a href="${urlCoin}">${coin}</a></b>
\uD83D\uDD5B TimeFrame: <b>${timeFrame}</b>
\uD83C\uDFE6 Capitalization: <b>${circCap}</b>
\uD83C\uDF55 Circulation: <b>${percent}%</b>
\uD83D\uDCC8 Exchange: <b><a href="${urlRef}">${exchange}</a></b>`,
                parse_mode : 'HTML'
            }
            
        }
        let splitter = 'data:image/png;base64,'
        let bodyString = body.pic
        let base64Image = Buffer.from(bodyString.split(splitter)[1], 'base64')
        console.log('function working')
        answer = sendPictureToBot(chatIdGroup, chatIdFut, base64Image, captBody);
    return answer
}

const tgPost = async function(req, res) {
    let answer = null
    if(req.body.action === 'sendPic') answer = await sendPic(req.body)
    res.send(answer)
}
module.exports = tgPost