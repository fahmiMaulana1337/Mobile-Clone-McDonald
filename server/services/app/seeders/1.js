'use strict';

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
   let data=[
    {
      name:'Ice Cream',
    },
    {
      name:'Burger',
    },
    {
      name:'Meals',
    },
    {
      name:'Rice',
    },
    {
      name:'Drinks',
    },
   ]

   data.map(el=>{
    el.createdAt= new Date();
    el.updatedAt= new Date();
   })
   await queryInterface.bulkInsert('Categories', data, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
