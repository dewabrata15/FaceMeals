'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Meals extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Meals.belongsTo(models.User, {
        foreignKey: 'authorId'
      });
    }
  }
  Meals.init({
    idMeal: DataTypes.INTEGER,
    strMeal: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {
          msg: 'Name is required',
        },
        notEmpty: {
          msg: 'Name is required',
        },
      }
    },
    strCategory: DataTypes.STRING,
    strArea: DataTypes.STRING,
    strInstructions: {
      allowNull: false,
      type: DataTypes.TEXT,
      validate: {
        notNull: {
          msg: 'Description is required',
        },
        notEmpty: {
          msg: 'Description is required',
        },
      }
    },
    strMealThumb: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {
          msg: 'Image is required',
        },
        notEmpty: {
          msg: 'Image is required',
        },
      }
    },
    strTags: DataTypes.STRING,
    strYoutube: DataTypes.STRING,
    strIngredient1: DataTypes.STRING,
    strIngredient2: DataTypes.STRING,
    strIngredient3: DataTypes.STRING,
    strIngredient4: DataTypes.STRING,
    strIngredient5: DataTypes.STRING,
    strIngredient6: DataTypes.STRING,
    strIngredient7: DataTypes.STRING,
    strIngredient8: DataTypes.STRING,
    strIngredient9: DataTypes.STRING,
    strIngredient10: DataTypes.STRING,
    strIngredient11: DataTypes.STRING,
    strIngredient12: DataTypes.STRING,
    strIngredient13: DataTypes.STRING,
    strIngredient14: DataTypes.STRING,
    strIngredient15: DataTypes.STRING,
    strIngredient16: DataTypes.STRING,
    strIngredient17: DataTypes.STRING,
    strIngredient18: DataTypes.STRING,
    strIngredient19: DataTypes.STRING,
    strIngredient20: DataTypes.STRING,
    strMeasure1: DataTypes.STRING,
    strMeasure2: DataTypes.STRING,
    strMeasure3: DataTypes.STRING,
    strMeasure4: DataTypes.STRING,
    strMeasure5: DataTypes.STRING,
    strMeasure6: DataTypes.STRING,
    strMeasure7: DataTypes.STRING,
    strMeasure8: DataTypes.STRING,
    strMeasure9: DataTypes.STRING,
    strMeasure10: DataTypes.STRING,
    strMeasure11: DataTypes.STRING,
    strMeasure12: DataTypes.STRING,
    strMeasure13: DataTypes.STRING,
    strMeasure14: DataTypes.STRING,
    strMeasure15: DataTypes.STRING,
    strMeasure16: DataTypes.STRING,
    strMeasure17: DataTypes.STRING,
    strMeasure18: DataTypes.STRING,
    strMeasure19: DataTypes.STRING,
    strMeasure20: DataTypes.STRING,
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    license: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Meals',
  });
  return Meals;
};