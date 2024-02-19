'use strict';
const axios = require('axios')
const fs = require('fs');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
      const meals = [];

      for (const letter of alphabet) {
      const { data } = await axios.get (`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);

      if (data?.meals?.length) {
        meals.push (...data.meals);
        console.log (`Fetched meals starting with letter ${letter}`)
     } 
    }

    meals.forEach(meal => {
      meal.createdAt = new Date();
      meal.updatedAt = new Date();
      meal.authorId = Math.floor((Math.random() * 3) + 1)
      meal.license = true
    })

    await queryInterface.bulkInsert('Meals', meals, {});
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Meals', null, {
      truncate: true,
      restartIdentity: true,
      cascade: true
    })
  }
};
