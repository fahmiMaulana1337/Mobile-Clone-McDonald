import { ApolloClient, InMemoryCache } from "@apollo/client";


const client = new ApolloClient({
  uri: "https://xxx.mekdi-keknya.shop/",
  cache: new InMemoryCache(),
});

// console.log(client);
// console.log(client.cache);
export default client;
