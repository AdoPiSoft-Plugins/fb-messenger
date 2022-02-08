"use strict"; 
const {machine} = require('@adopisoft/exports')
const db = require('@adopisoft/core/models')
exports.get = async(req, res, next) => {
  try {
    const machine_id = await machine.getId()
    const dbi = await db.getInstance()

    var [cfg] = await dbi.models.FBMessenger.findOrCreate({
      where: {
        machine_id: machine_id
      }
    });
    res.json({
      facebook: cfg.facebook || "712346362287169",
      position: cfg.position || "left",
      call_to_action: cfg.call_to_action || "Message us",
      hide_on_offline: cfg.hide_on_offline
    })
  } catch (e) {
    next(e)
  }
};
exports.update = async(req, res, next) => {
  try {
    const machine_id = await machine.getId()
    const dbi = await db.getInstance()
    var [cfg] = await dbi.models.FBMessenger.findOrCreate({
      where: {
        machine_id: machine_id
      }
    });
    await cfg.update(req.body);
    res.json({})
  } catch (e) {
    next(e)
  }
};