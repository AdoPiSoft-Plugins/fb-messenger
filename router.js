'use strict'

var core = require('../core')
var { router } = core
var fb_chat_ctrl = require('./controllers/fb_chat_ctrl.js')

router.get('/fb-chat-config', fb_chat_ctrl.get)
router.post('/fb-chat-config', core.middlewares.auth, fb_chat_ctrl.update)

module.exports = router
