import React, { useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView, ActivityIndicator, Modal, Text, Button } from "react-native";
import { set } from 'react-native-reanimated';

import Products from "../Database/Models/Product";



const MassStoregeScreen = (props) => {

  const [modalIndicator, setmodalIndicator] = useState(false);
  const [percentInserted, setPercentInserted] = useState(0);


  useEffect(() => {

    setmodalIndicator(true);
  }, []);


  useEffect(() => {

    if (modalIndicator) {
      console.log("GoNow")
      goNow();
    }

    
  }, [modalIndicator]);


  const goNow = async () => {

    for (let index = 0; index <= 10000; index++) {

      await insert(index);

      if (!modalIndicator)
        break;
    }

    console.log("depois do FOR")

  }


  const returnNow = () => {
    console.log("returnNow")
    setmodalIndicator(false);
    props.navigation.navigate("Home");
  }


  const insert = async (index) => {

    setTimeout(() => {
      setPercentInserted(index)
      if (index == 10000)
        returnNow();
    }, 1000);

  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalIndicator}
          onRequestClose={() => {
            returnNow();
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>

              <ActivityIndicator size="large" color="green" />
              <Text>index: {percentInserted}</Text>
              <Button
                onPress={() => returnNow()} title="Parar" />

            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  )

};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    marginTop: 30//StatusBar.currentHeight || 0,
  },
  button: {
    marginTop: 15,
    marginHorizontal: 20
  },
  message: {
    marginTop: 30,
    alignContent: 'center',

  },
  centeredView: {
    flex: 2,
    justifyContent: "center",
    marginTop: 5

  },
  modalView: {
    margin: 10,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default MassStoregeScreen;