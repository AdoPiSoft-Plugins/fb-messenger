"use strict";
const {app} = require('@adopisoft/exports')
var router = require("./router.js");
var models = require("./models");
module.exports = {
  async init() {
    await models.init();
    app.use(router)
  }
};