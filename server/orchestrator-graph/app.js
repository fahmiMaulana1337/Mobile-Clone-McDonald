if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
  }
  
  const { ApolloServer } = require("@apollo/server");
  const { startStandaloneServer } = require("@apollo/server/standalone");
  
  const PORT = process.env.PORT || 4000;
  
  const {
    typeDefs: userTypeDefs,
    resolvers: userResolvers,
  } = require("./schema/user");
  
  const {
    typeDefs: itemTypeDefs,
    resolvers: itemResolvers,
  } = require("./schema/item");
  
  const server = new ApolloServer({
    typeDefs: [userTypeDefs, itemTypeDefs],
    resolvers: [userResolvers, itemResolvers],
    introspection: true,
  });
  
  startStandaloneServer(server, {
    listen: { port: PORT },
  })
    .then(({ url }) => {
      console.log(`🚀  Server ready at: ${url}`);
    })
    .catch((err) => {
      console.log(err);
    });
  