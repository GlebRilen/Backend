const mongoose = require('mongoose')
const express = require('express')
const app = express()
const dbURL = 'mongodb+srv://glebrilen:zundergitler23071990@telegrampatternbot.otmawsp.mongodb.net/?retryWrites=true&w=majority&appName=TelegramPatternBot'
const Pattern = require('./patternSchema.js')
app.use(express.json())

const mongoFindBack = async function(req, res){
    await mongoose.connect(dbURL).then(()=> console.log('connected to db to find one'))
    let ex = req.query.ex
    let ticker = req.query.ticker
    let tf = req.query.tf
    let top = req.query.top
    Pattern
        .findOne({ticker : ticker, EX : ex, timeFrame : tf, top : top})
        .then((result) => {
            console.log(result, 'pattern document found in mongoDB')
            res
                .status(201)
                .json(result)
        })
        .catch(() => console.log('pattern does not saved'))
}
  
module.exports = mongoFindBack