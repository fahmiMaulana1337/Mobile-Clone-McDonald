import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import TabBottom from "./Tab";
import Homepage from "../screens/HomePage";
import { View } from "react-native";
import Detail from "../screens/Detail";


const Stack = createNativeStackNavigator();

export default HomeStack = () => {
  return (

    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Homepage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TabBottom"
          component={TabBottom}
          options={{ title: "Our Menu", headerShown: false }}
        />
        <Stack.Screen
          name="Detail"
          component={Detail}
          options={{
            title: "Mc Donalds",
            headerStyle: {
              backgroundColor: "#C8151D",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>

  );
};
