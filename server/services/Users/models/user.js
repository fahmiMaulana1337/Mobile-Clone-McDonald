const { ObjectId } = require("mongodb");
const { getDatabase } = require("../config/mongoConnection");

class User {
  static getCollections() {
    const db = getDatabase();
    const users = db.collection("users");
    return users;
  }

  static async findAll() {
    return this.getCollections().find().toArray();
  }

  static async createUser(user) {
    return this.getCollections().insertOne({
      email: user.email,
      password: user.password,
    });
  }

  static async findById(objectId) {
    return this.getCollections().findOne({
      _id: new ObjectId(objectId),
    });
  }
  static async deleteUserById(id) {
    const collect = this.getCollections()
    const user = await collect.deleteOne({ _id: new ObjectId(id) })
    return user
  }
}

module.exports = User;
