'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Item.belongsTo(models.User,{foreignKey:'authorId'})
      Item.belongsTo(models.Category,{onDelete: 'cascade',foreignKey:"categoryId"})
      Item.hasMany(models.Ingredient,{onDelete: 'cascade',foreignKey:'itemId',hooks:true})
    }
  }
  Item.init({
    name:  {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          msg:"Name is required"
        },
        notNull:{
          msg:"Name is required"
        }
      },
    },
    description:  {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          msg:"Description is required"
        },
        notNull:{
          msg:"Description is required"
        }
      },
    },
    price: {
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notEmpty:{
          msg:"Price is required"
        },
        min: {
          args: 1,
          msg: 'Minimal Price is 1'
        },
        notNull:{
          msg:"Price is required"
        }
      },
    },
    imgUrl: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          msg:"Image Url is required"
        },
        notNull:{
          msg:"Image Url is required"
        }
      },
    },
    authorId: {
      type:DataTypes.INTEGER,
    },
    categoryId: {
      type:DataTypes.INTEGER,
      references:{
        model:'Categories',
        key:'id'
      }
    },
  }, {
    sequelize,
    modelName: 'Item',
  });
  return Item;
};