const { Router } = require('express')
const tgPost = require('./tgpost.js');
// const tgSendMSG = require('./tgpost.js')
const mongoCreateBack = require('./mongooseFetch/mongoCreateBack.js');
const mongoFindBack = require('./mongooseFetch/mongoFindBack.js');
const mongoFetchAllBack = require('./mongooseFetch/mongoFetchAllBack.js');
const mongoUpdateBack = require('./mongooseFetch/mongoUpdateBack.js');
const coinMarketBack = require('./mongooseFetch/coinMarketBack.js')
const router = Router();
router.post('/tgpost', tgPost)
router.post('/coinMarketBack', coinMarketBack)
router.post('/mongoCreateBack', mongoCreateBack)
router.get('/mongoFindBack', mongoFindBack)
router.get('/mongoFetchAllBack', mongoFetchAllBack)
router.post('/mongoUpdateBack', mongoUpdateBack)
// router.post('/tgSendMSG', tgSendMSG)
module.exports = router;