'use strict';
const {
  Model
} = require('sequelize');
const { hash } = require('../helpers/helper');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // User.hasMany(models.Item,{foreignKey:'authorId'})
    }
  }
  User.init({
    email: {
      type:DataTypes.STRING,
      allowNull:false,
      unique:true,
      validate:{
        notEmpty:{
          msg:"Email is required"
        },
        notNull:{
          msg:"Email is required"
        },
        isEmail:{
          msg:"Email format invalid"
        }
      }
    },
    password: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          msg:"Password is required"
        },
        len: {
          args: [5],
          msg: 'Please provide field 5characters.'
        },
        notNull:{
          msg:"Password is required"
        }
      },
    },
    role: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });

  User.addHook('beforeCreate', (user, options) => {
    user.password = hash(user.password);
  });
  return User;
};