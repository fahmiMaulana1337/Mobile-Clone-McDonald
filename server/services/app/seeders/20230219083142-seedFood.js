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
   let data =[
    {
      
      "name": "Big Mac",
      "price": 200000,
      "imgUrl":"https://nos.jkt-1.neo.id/mcdonalds/foods/October2019/AZa7XBfA0ADkUbSdnQOW.png",
      "description": "Burger ayam renyah yang disajikan dengan irisan selada segar dan tomat.",
      "categoryId": "1",
      "authorId": "1",
    },
    {
      
      "name": "Mc Muffin",
      "price": 200000,
      "imgUrl":"https://nos.jkt-1.neo.id/mcdonalds/foods/August2019/oOqk0inorO5YNcw5S2iG.png",
      "description": "Burger ayam renyah yang disajikan dengan irisan selada segar dan tomat.",
      "categoryId": 1,
      "authorId": 1
    },
    {
      
      "name": "Sundae",
      "price": 200000,
      "imgUrl":"https://nos.jkt-1.neo.id/mcdonalds/foods/August2020/h3cZg2TVvmjkBHJYRpfw.png",
      "description": "Burger ayam renyah yang disajikan dengan irisan selada segar dan tomat.",
      "categoryId": 1,
      "authorId": 1,
    },
    {
      
      "name": "Big Mac",
      "price": 200000,
      "imgUrl":"https://nos.jkt-1.neo.id/mcdonalds/foods/August2019/Lff4QebQnB9aToyb5wtJ.png",
      "description": "Burger ayam renyah yang disajikan dengan irisan selada segar dan tomat.",
      "categoryId": 1,
      "authorId": 1
    },
    {
      
      "name": "Big Mac",
      "price": 200000,
      "imgUrl":"https://nos.jkt-1.neo.id/mcdonalds/foods/August2019/MEuiwOf0P9leTe7ZIgbS.png",
      "description": "Burger ayam renyah yang disajikan dengan irisan selada segar dan tomat.",
      "categoryId": 1,
      "authorId": 1
    }
  ]
    data.map(el=>{
      el.createdAt= new Date()
      el.updatedAt= new Date()
    })

    await queryInterface.bulkInsert('Items', data, {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Items', null, {})
  }
};
