"use strict";
const core_models = require('@adopisoft/core/models')
const {machine} = require('@adopisoft/exports')

var FBMessenger = require("./fb_messenger.js");
var model_files = {
  FBMessenger: FBMessenger
};

exports.init = async() => {
  const {sequelize, Sequelize, models} = await core_models.getInstance()
  const db = await sequelize.getInstance()
  const machine_id = await machine.getId()

  if(!models) return

  var keys = Object.keys(model_files);
  for (var i = 0; i < keys.length; i++) {
    var k = keys[i];
    models[k] = model_files[k](db, Sequelize);
    await models[k].sync({
      alter: true
    })
  }
  var default_scope = {
    where: {
      machine_id: machine_id
    }
  };
  models.FBMessenger.addScope("default_scope", default_scope);

  return {sequelize, Sequelize, models} 
};