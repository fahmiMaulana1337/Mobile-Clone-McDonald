import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import CardPage from "../components/CardPage";
import SlidePictOrder from "../components/SlidePictOrder";
import { useNavigation } from "@react-navigation/native";


const MenuPage = () => {

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
      <View style={styles.banner}>
      <SlidePictOrder />
      </View>
      <View style={styles.content}>
        <Text style={styles.textHome}>
        Eat Like There are no tomorrows!
        </Text>
        <CardPage />
      </View>
        </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  banner: {
    flex: 1,
  },
  content: {
    flex: 2,
    backgroundColor: "#fff"
  },
  textHome: {
    color: "#C8151D",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 15,
  }
});

export default MenuPage;
