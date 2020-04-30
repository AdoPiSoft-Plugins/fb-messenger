'use strict'

var { dbi, machine_id } = require('../../core')
var FBMessenger = require('./fb_messenger.js')

var model_files = {
  FBMessenger
}

exports.init = async () => {
  if(!dbi) return
  var { sequelize, Sequelize } = dbi
  var db = await sequelize.getInstance()

  var keys = Object.keys(model_files)
  for(var i = 0; i < keys.length; i++){
    var k = keys[i]
    dbi.models[k] = model_files[k](db, Sequelize)
    await dbi.models[k].sync({alter: true})
  }

  var default_scope = {
    where: { machine_id }
  }

  dbi.models.FBMessenger.addScope('default_scope', default_scope)
  return dbi
}
