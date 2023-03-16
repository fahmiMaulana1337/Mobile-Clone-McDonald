import { StyleSheet, Text, View, SafeAreaView, Button, TouchableOpacity } from "react-native";
import SlidePict from "../components/SlidePict";

const LandingPage = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.banner}>
                <SlidePict />
            </View>
            <View style={styles.content}>
                <Text style={styles.textHome}>The Cardi B & Offset Meal (Meal!)</Text>

                <Text style={styles.textDiscover}>
                    They picked the bundle. You pick who you’re taking. Friends, lovers and Fries are coming together for a hot McDonald’s date. Order yours with McDelivery® in our app.* Here’s the delicious deets:
                    QPC® (juicy!)
                    Cheeseburger, side of BBQ sauce
                    Large Fries to share
                    2 large Drinks—he’s into Hi-C®, she likes Coca-Cola®
                    Apple Pie to keep it sweet
                    *Mobile Order & Pay at participating McDonald’s. App download and registration required. Meal available at participating McDonald’s for a limited time.
                </Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Menu')} style={styles.button}>
                    <Text style={styles.viewMore}>Our Food</Text>
                </TouchableOpacity>
            </View>
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
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
    },
    textHome: {
        color: "black",
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "center"
    },
    textHistory: {
        fontSize: 23,
        fontWeight: "bold",
        marginTop: 15,
        marginLeft: 15,
    },
    textDiscover: {
        color: "black",
        fontSize: 18,
        margin: 15,
    },
    button: {
        backgroundColor: "#D53738",
        borderRadius: 300,
        width: 140,
        margin: 15,
        padding: 13
    },
    viewMore: {
        color: "white",
        fontSize: 15,
        paddingHorizontal: 6,
        textAlign: "center"

    }
});

export default LandingPage;
