'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Meals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idMeal: {
        type: Sequelize.INTEGER
      },
      strMeal: {
        type: Sequelize.STRING
      },
      strDrinkAlternate:{
        type: Sequelize.STRING
      },
      strCategory: {
        type: Sequelize.STRING
      },
      strArea: {
        type: Sequelize.STRING
      },
      strInstructions: {
        type: Sequelize.TEXT
      },
      strMealThumb: {
        type: Sequelize.STRING
      },
      strTags: {
        type: Sequelize.STRING
      },
      strYoutube: {
        type: Sequelize.STRING
      },
      strIngredient1: {
        type: Sequelize.STRING
      },
      strIngredient2: {
        type: Sequelize.STRING
      },
      strIngredient3: {
        type: Sequelize.STRING
      },
      strIngredient4: {
        type: Sequelize.STRING
      },
      strIngredient5: {
        type: Sequelize.STRING
      },
      strIngredient6: {
        type: Sequelize.STRING
      },
      strIngredient7: {
        type: Sequelize.STRING
      },
      strIngredient8: {
        type: Sequelize.STRING
      },
      strIngredient9: {
        type: Sequelize.STRING
      },
      strIngredient10: {
        type: Sequelize.STRING
      },
      strIngredient11: {
        type: Sequelize.STRING
      },
      strIngredient12: {
        type: Sequelize.STRING
      },
      strIngredient13: {
        type: Sequelize.STRING
      },
      strIngredient14: {
        type: Sequelize.STRING
      },
      strIngredient15: {
        type: Sequelize.STRING
      },
      strIngredient16: {
        type: Sequelize.STRING
      },
      strIngredient17: {
        type: Sequelize.STRING
      },
      strIngredient18: {
        type: Sequelize.STRING
      },
      strIngredient19: {
        type: Sequelize.STRING
      },
      strIngredient20: {
        type: Sequelize.STRING
      },
      strMeasure1: {
        type: Sequelize.STRING
      },
      strMeasure2: {
        type: Sequelize.STRING
      },
      strMeasure3: {
        type: Sequelize.STRING
      },
      strMeasure4: {
        type: Sequelize.STRING
      },
      strMeasure5: {
        type: Sequelize.STRING
      },
      strMeasure6: {
        type: Sequelize.STRING
      },
      strMeasure7: {
        type: Sequelize.STRING
      },
      strMeasure8: {
        type: Sequelize.STRING
      },
      strMeasure9: {
        type: Sequelize.STRING
      },
      strMeasure10: {
        type: Sequelize.STRING
      },
      strMeasure11: {
        type: Sequelize.STRING
      },
      strMeasure12: {
        type: Sequelize.STRING
      },
      strMeasure13: {
        type: Sequelize.STRING
      },
      strMeasure14: {
        type: Sequelize.STRING
      },
      strMeasure15: {
        type: Sequelize.STRING
      },
      strMeasure16: {
        type: Sequelize.STRING
      },
      strMeasure17: {
        type: Sequelize.STRING
      },
      strMeasure18: {
        type: Sequelize.STRING
      },
      strMeasure19: {
        type: Sequelize.STRING
      },
      strMeasure20: {
        type: Sequelize.STRING
      },
      strSource:{
        type: Sequelize.STRING
      },
      strImageSource:{
        type: Sequelize.STRING
      },
      strCreativeCommonsConfirmed: {
        type: Sequelize.STRING
      },
      dateModified:{
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Meals');
  }
};