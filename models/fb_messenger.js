'use strict'
var model_name = 'FBMessenger'
var table_name = 'fb_messengers'
var opts = {
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  underscored: true,
  timestamps: true,
  tableName: table_name
}

module.exports = (sequelize, Sequelize) => {
  var model = sequelize.define(model_name, {
    machine_id: {
      type: Sequelize.STRING
    },
    facebook: {
      type: Sequelize.STRING,
    },
    call_to_action: {
      type: Sequelize.STRING
    },
    position: {
      type: Sequelize.STRING
    },
    created_at: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updated_at: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }, opts);

  return model;
}
