const axios = require("axios");
const redis = require("../configs/redisConnection");
const serverUser = "http://users:4001";

const typeDefs = `#graphql
type Query {
    users: [Users]
    user(id: ID): User
}
type Users {
    _id : String
    email : String
    password : String
}
type User {
    _id: String,
    email: String,
    password: String,
}
type createUser {
    _id: String,
    email: String
}
type deleteUser {
    message: String
}
input newUser {
    email: String,
    password: String,
    role: String,
    phoneNumber: String,
    address: String
}
type Mutation {
    addUser(inputValue: newUser): createUser
    deleteUser(id: ID): deleteUser
}
`;

const resolvers = {
  Query: {
    users: async () => {
      try {
        const cacheUsers = await redis.get("users");

        if (cacheUsers) {
          const users = JSON.parse(cacheUsers);
          return users;
        }

        const {data} = await axios({
          method: "get",
          url: `${serverUser}/users`,
        });
        console.log(data, "data dari server ")
        await redis.set("users", JSON.stringify(data.data));
        return data.data;
      } catch (error) {
        console.log(error)
        throw error.response.data
      }
    },
    user: async (_, args) => {
      try {
        const { id } = args;
        // console.log(id)
        // const cacheUser = await redis.get("userDetail");
        // if (cacheUser.id === id) {
        //   const user = JSON.parse(cacheUser);
        //   return user;
        // }
        console.log("masuk")
        const response  = await axios({
          method: "get",
          url: `${serverUser}/users/${id}`,
        });
        console.log(response)
        const data = response.data;
        // await redis.set("userDetail", JSON.stringify(data.data));
        return data.data;
      } catch (error) {
        console.log(error)
        throw error.response.data
      }
    },
  },
  Mutation: {
    addUser: async (_, args) => {
      try {
        const { username, email, password, role, phoneNumber, address } =
          args.inputValue;
        const { data } = await axios({
          method: "POST",
          url: `${serverUser}/users`,
          data: {
            username,
            email,
            password,
            role,
            phoneNumber,
            address,
          },
        });
        await redis.del("users");
        return data;
      } catch (error) {
        throw error.response.data
      }
    },
    deleteUser: async (_, args) => {
      try {
        const { id } = args
        const { data } = await axios({
          method: "delete",
          url: `${serverUser}/users/${id}`,
        })
        await redis.del("users")
        return data
      } catch (error) {
        throw error.response.data
      }
    }
  },
};

module.exports = { typeDefs, resolvers };
