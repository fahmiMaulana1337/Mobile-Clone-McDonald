'use strict';

const { hash } = require('../helpers/helper');

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
   let data = [
    {
    email:'admin@gmail.com',
    password:'12345678',
   },
    {
    email:'admin1@gmail.com',
    password:'12345678',
   },
    {
    email:'admin2@gmail.com',
    password:'12345678',
   },
  ];

   data.map(el=>{
    el.createdAt= new Date();
    el.updatedAt= new Date();
    el.password =hash(el.password);
    el.role='Admin';
   })
   await queryInterface.bulkInsert('Users', data, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
  }
};
