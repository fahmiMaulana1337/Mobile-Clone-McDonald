import * as React from "react";
import {
    Image,
    StyleSheet,
    View,
    TouchableOpacity,
    ActivityIndicator,
    FlatList,
} from "react-native";
import { Card, Title } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react/hooks";

const READ_ITEMS = gql`
  query Items {
    items {
      id
      name
      imgUrl
    }
  }
`;

const MyComponent = () => {
    const { loading, error, data } = useQuery(READ_ITEMS);
    console.log(data)
    const navigation = useNavigation();
    if (error) {

        return (
            <Title style={styles.title}>{JSON.stringify(error)}</Title>
        )
    } else {

        return (
            <View style={styles.container}>


                {
                    data?.items.map(item => {
                        return (
                            <Card style={styles.card} key={item.id}>
                                <TouchableOpacity onPress={() => navigation.navigate('Detail', { id: item.id })}>
                                    <Card.Content>
                                        <Image
                                            source={{
                                                uri: item.imgUrl
                                            }}
                                            style={styles.image}
                                        />
                                        <Title style={styles.title}>{item.name}</Title>
                                    </Card.Content>
                                </TouchableOpacity>
                            </Card>
                        )
                    })
                }
            </View>
        );
    }

};

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF",
        padding: 20,
        borderRadius: 10,
        margin: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        width: "100%",
    },
    card: {
        marginTop: 20,
        width: 300,
        height: 400,
        opacity: 5,
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
        marginHorizontal: 5
    },
    title: {
        textAlign: "center",
        alignItems: "center",
        marginTop: 50,
        fontSize: 30,
    },
    image: {
        marginTop: 15,
        width: 200,
        minHeight: 200,
        marginBottom: 9,
    }
});

export default MyComponent;
