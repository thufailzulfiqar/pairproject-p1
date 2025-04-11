'use strict';
const bcrypt = require('bcryptjs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    let dataCategories = require('../data/categories.json')
    dataCategories = dataCategories.map((el) => {
      delete el.id;
      el.createdAt = el.updatedAt = new Date();
      return el;
    });

    let  dataItems = require('../data/items.json')
    dataItems = dataItems.map((el) => {
      delete el.id;
      el.createdAt = el.updatedAt = new Date();
      return el;
    });

    let dataUsers = require('../data/users.json')
    dataUsers  = dataUsers.map((el) => {
      delete el.id;
      el.createdAt = el.updatedAt = new Date();

      let salt = bcrypt.genSaltSync(10);
      el.password = bcrypt.hashSync(el.password, salt)

      return el;
    });
    
    let dataProfiles = require('../data/profiles.json')
    dataProfiles = dataProfiles.map((el) => {
      delete el.id
      el.createdAt = el.updatedAt = new Date();
      return el;
    });

    let dataFK = require('../data/transactions.json')
    dataFK = dataFK.map(el => {
      el.createdAt = el.updatedAt = new Date();
      return el;
    })

    await queryInterface.bulkInsert("Categories", dataCategories)
    await queryInterface.bulkInsert("Items", dataItems)
    await queryInterface.bulkInsert("Users", dataUsers)
    await queryInterface.bulkInsert("Profiles", dataProfiles)
    await queryInterface.bulkInsert("Transactions", dataFK)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Categories', null, {})
    await queryInterface.bulkDelete('Items', null, {})
    await queryInterface.bulkDelete('Users', null, {})
    await queryInterface.bulkDelete('Profiles', null, {})
    await queryInterface.bulkDelete('Transactions', null,  {})
  }
  
};
