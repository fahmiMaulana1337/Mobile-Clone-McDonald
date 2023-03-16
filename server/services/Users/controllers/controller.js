const { getDatabase } = require("../config/mongoConnection");
const { ObjectId } = require("mongodb");
const User = require("../models/user");
const { hash } = require("../helpers/helper");

module.exports = {
  findAllUsers: async (req, res, next) => {
    try {
      const data = await User.findAll();

      res.status(200).json({
        data
      });

    } catch (error) {
      console.log(error)
      next(error);
    }
  },
  createUser: async (req, res, next) => {
    try {
      let { email, password } = req.body;
      if (!email || !password) {
        throw { name: 'BadRequest' }
      }
      password = hash(password)
      const newUser = await User.createUser({
        email,
        password
      });

      res.status(201).json({
        statusCode: 201,
        id: newUser.insertedId,
        email,
        password,
      });

    } catch (error) {
      console.log(error)
      next(error)
    }
  },
  findUserById: async (req, res, next) => {
    try {
      const { id } = req.params;
  
      const foundUser = await User.findById(id);

      res.status(200).json({
        statusCode: 200,
        data: foundUser,
      });

    } catch (error) {
      console.log(error)
      next(error)
    }
  },
  deleteUser: async (req, res, next) => {
    try {
      const { id } = req.params
      const user = await User.deleteUserById(id)
      res.status(200).json({ message: "User has been deleted" })
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
};
