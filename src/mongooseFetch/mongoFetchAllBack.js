const mongoose = require('mongoose')
const express = require('express')
const app = express()
const dbURL = 'mongodb+srv://glebrilen:zundergitler23071990@telegrampatternbot.otmawsp.mongodb.net/?retryWrites=true&w=majority&appName=TelegramPatternBot'
const Pattern = require('./patternSchema.js')
app.use(express.json())

const mongoFetchAllBack = async function(req, res){
    await mongoose.connect(dbURL).then(()=> console.log('connected to db to fethc all'))
    Pattern
        .find({'data.SL' : false, 'data.target261' : false, 'data.cancell' : false})
        .then((result) => {
            res
                .status(200)
                .json(result)
        })
        .catch(() => console.log('failed to fetch all patterns'))
}
  
module.exports = mongoFetchAllBack