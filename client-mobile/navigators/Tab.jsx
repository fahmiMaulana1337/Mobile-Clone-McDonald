import Homepage from "../screens/HomePage";
import MenuPage from "../screens/MenuPage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from 'react-native-vector-icons/Ionicons';
import LandingPage from "../screens/LandingPage";
const Tab = createBottomTabNavigator()

export default TabBottom = () => {
    return (
          <Tab.Navigator
          screenOptions={({ route }) => ({
            headerStyle: {
                backgroundColor: "#B70102",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
  
              if (route.name === 'Home') {
                iconName = focused
                  ? 'ios-restaurant'
                  : 'ios-restaurant-outline';
              } else if (route.name === 'Menu') {
                iconName = focused ? 'ios-fast-food' : 'ios-fast-food-outline';
              }
              return <Ionicons name={iconName} size={size} color={"#C8151D"} />;
            },
            tabBarActiveTintColor: "#b2498b"
          })}
          >    
            <Tab.Screen
              name="Home"
              component={LandingPage}
              options={{
                title: "About",
              }}
            />
            <Tab.Screen
              name="Menu"
              component={MenuPage}
              options={{
                title: "Our Menu",
              }}
            />
          </Tab.Navigator>
      );
}

