import HomeStack from './navigators/HomeStack';
import client from "./config/apollo"
import { ApolloProvider } from '@apollo/client';
export default function App() {
  return (
    <ApolloProvider client={client}>
      <HomeStack />
    </ApolloProvider>
  );
}


