'use strict'
var core = require('plugin-core')
var {machine_id} = core

exports.get = async (req, res, next) => {
  try {
    var [cfg] = await core.dbi.models.FBMessenger.findOrCreate({where: {machine_id}})
    res.json({
      facebook: cfg.facebook || '712346362287169',
      position: cfg.position || 'left',
      call_to_action: cfg.call_to_action || 'Message us',
      hide_on_offline: cfg.hide_on_offline
    })
  } catch (e) {
    next(e)
  }
}

exports.update = async (req, res, next) => {
  try {
    var [cfg] = await core.dbi.models.FBMessenger.findOrCreate({where: {machine_id}})
    await cfg.update(req.body)
    res.json({})
  } catch (e) {
    next(e)
  }
}
