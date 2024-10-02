const mongoose = require('mongoose')
const Schema = mongoose.Schema
const patternSchema = new Schema({
            array : Array,
            ticker : String,
            EX : String,
            timeFrame: Number,
            patternFindTime: Number,
            top : Number,
            stage : Number,
            data : {
                confirm   : Boolean,
                target138 : Boolean,
                target261 : Boolean,
                cancell   : Boolean,
                SL        : Boolean,
            },
            TP : Number,
            TP138 : Number,
            pattern : Object,
})

const Pattern = mongoose.model('Triangle', patternSchema)
module.exports = Pattern