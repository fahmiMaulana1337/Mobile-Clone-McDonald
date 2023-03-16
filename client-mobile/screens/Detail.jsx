import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ActivityIndicator
} from "react-native";
import { Modal, Portal, Text, Button, Provider } from "react-native-paper";
import * as React from "react";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react/hooks";

const READ_ITEM_DETAILS = gql`
  query itemDetail($itemId: ID) {
    item(id: $itemId) {
      id
      name
      description
      price
      imgUrl
      Ingredients {
        name
      }
      Category {
        name
      }
      User {
        email
      }
    }
  }
`;



const Detail = ({ route }) => {
  const id = route.params.id;
  const { loading, error, data } = useQuery(READ_ITEM_DETAILS, {
    variables: {
      itemId: id,
    },
  });
  console.log(data);
  
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: "white", padding: 20, minHeight: "50%" };

  return (
    <SafeAreaView style={styles.container}>
      <Provider>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={containerStyle}
          >
            <Text style={styles.textTitleIngredients}>Ingredients of </Text>
            {data?.item.Ingredients?.map((item)=>{
              return (
                <Text style={styles.textIngredients} key={item.id}> {item.name}</Text>
              )
            })}
            <Text style={styles.textTitleByUser}>created by : {data?.item.User?.email} </Text>
          </Modal>
        </Portal>
        <View style={styles.content}>
          <Text style={styles.textTitle}>{data?.item.name}</Text> 
          <Image
            style={styles.image}
            source={{
              uri:  data?.item.imgUrl,
            }}
          />
          <Text style={styles.textCategory}>Category:{data?.item.Category?.name}</Text>
          <Text style={styles.textDescription}>Description :{data?.item.description}</Text>
          <Text style={styles.textPrice}>
            Rp.{data?.item.price},00
          </Text>
          <Button style={styles.button} onPress={showModal}>
            <Text style={styles.textButton}>Ingredients</Text>
          </Button>
        </View>
      </Provider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 2,
    alignItems: "center",
    minHeight: "100%",
  },
  image: {
    width: 300,
    height: 320,
    marginTop: 15,
    borderTopRightRadius: 50,
    borderBottomLeftRadius: 50,
  },
  imgBg: {
    width: "100%",
    height: "100%",
  },
  textTitle: {
    color: "#C8151D",
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 20,
    fontStyle: "italic",
  },
  textDescription: {
    fontSize: 15,
    marginVertical: 5,
    width: 280,
  },
  textCategory: {
    fontSize: 20,
    marginTop: 20,
    marginBottom: 5,
    width: 280,
  },
  textPrice: {
    fontSize: 17,
    marginVertical: 10,
    width: 280,
  },
  textTitleIngredients: {
    color: "#C8151D",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10
  },
  textIngredients: {
    fontSize: 15
  },
  button: {
    backgroundColor: "#C8151D",
    width: 160,
    margin: 20,
    borderRadius: 100,
    padding: 7,
  },
  textButton: {
    fontSize: 18,
    color: "white",
  },
  containerLoad: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  textTitleByUser: {
    color: "#C8151D",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10
  },
});

export default Detail;
