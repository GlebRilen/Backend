const mongoose = require('mongoose')
const express = require('express')
const app = express()
const dbURL = 'mongodb+srv://glebrilen:zundergitler23071990@telegrampatternbot.otmawsp.mongodb.net/?retryWrites=true&w=majority&appName=TelegramPatternBot'
const Pattern = require('./patternSchema.js')
app.use(express.json())

const mongoUpdateBack = async function(req, res){
    await mongoose.connect(dbURL).then(()=> console.log('connected to db for update'))
    // console.log( req.body, 'Request for update arrive')
    Pattern.findOneAndUpdate({_id : req.body._id}, req.body, {new : true})
        .then((result) => {
            res
                .status(202)
                .json(result)
        })
        .catch(() => console.log('pattern does not saved'))
}
  
module.exports = mongoUpdateBack