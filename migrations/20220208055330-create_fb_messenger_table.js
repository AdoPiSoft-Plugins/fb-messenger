'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('fb_messengers',{
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        unique: true
      },
      machine_id: {
        type: Sequelize.STRING
      },
      facebook: {
        type: Sequelize.STRING
      },
      call_to_action: {
        type: Sequelize.STRING
      },
      position: {
        type: Sequelize.STRING
      },
      hide_on_offline: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('fb_messengers')
  }
};
