"use strict";
const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const fb_chat_ctrl = require("./controllers/fb_chat_ctrl.js");
const auth = require('@adopisoft/core/middlewares/auth.js')

router.get("/fb-chat-config", express.urlencoded({
  extended: true
}), bodyParser.json(), fb_chat_ctrl.get);

router.post("/fb-chat-config", express.urlencoded({
  extended: true
}), bodyParser.json(), auth, fb_chat_ctrl.update);

module.exports = router;