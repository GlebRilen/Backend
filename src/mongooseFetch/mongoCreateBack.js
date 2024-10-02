const mongoose = require('mongoose')
const express = require('express')
const app = express()
const dbURL = 'mongodb+srv://glebrilen:zundergitler23071990@telegrampatternbot.otmawsp.mongodb.net/?retryWrites=true&w=majority&appName=TelegramPatternBot'
const Pattern = require('./patternSchema.js')
app.use(express.json())

const mongoCreateBack = async function(req, res){
    await mongoose.connect(dbURL).then(()=> console.log('connected to db to create new pattern'))
    const pattern = new Pattern(req.body)
    pattern
        .save()
        .then((result) => {
            res
                .status(201)
                .json(result)
        })
        .catch(() => console.log('pattern does not saved'))
}
  
module.exports = mongoCreateBack