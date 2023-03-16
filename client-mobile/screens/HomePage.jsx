import { StyleSheet, Text, View, SafeAreaView, Button, TouchableOpacity, Image } from "react-native";


const Homepage = ({ navigation }) => {
    return (
        <SafeAreaView >
            <View style={styles.content}>
                <Image
                    source={{
                        uri: `https://pyxis.nymag.com/v1/imgs/800/e80/ceaec8914e880a75983f1bbd5bcf6eba59-08-mcdonalds-logo.rsquare.w700.jpg`,
                    }}
                    style={styles.image}
                />
                <Text style={styles.textHome}>McDonald's</Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate("TabBottom")}
                    style={styles.button}>
                    <Text style={styles.viewMore}>Go to Menu</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    content: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100%",
        backgroundColor: "white",
    },
    image: {
        marginTop: -200,
        width: 200,
        height: 200,
    },
    button: {
        backgroundColor : "#C8151D",
        borderRadius: 100,
        width : 140,
        margin: 15,
        padding: 13
      },
    viewMore: {
        color: "white",
        fontSize: 15,
        paddingHorizontal: 6,
        textAlign: "center"
    },
    textHome: {
        color: "#C8151D",
        fontSize: 30,
        fontWeight: "bold",
        marginTop: 25,
        marginLeft: 15,
      
      },
});


export default Homepage;
