'use strict'

var core = require('../core')
var { router, middlewares } = core
var { express, bodyParser } = middlewares

var fb_chat_ctrl = require('./controllers/fb_chat_ctrl.js')

router.get('/fb-chat-config', express.urlencoded({ extended: true }), bodyParser.json(), fb_chat_ctrl.get)
router.post('/fb-chat-config', express.urlencoded({ extended: true }), bodyParser.json(), core.middlewares.auth, fb_chat_ctrl.update)

module.exports = router
