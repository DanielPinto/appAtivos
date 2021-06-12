import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, FlatList, TouchableOpacity, Modal, Dimensions } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import Product from "../Database/Models/Product";
import FormEditItem from '../Components/FormEditItem';
import getValuesOfObject from '../Functions/GetValuesOfObject';

export default function ScannerScreen() {

  const modal_height = Dimensions.get('window').height;
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [item, setItem] = useState([]);
  const [tag, setTag] = useState(null);
  const [modalVisible, setmodalVisible] = useState(false);
  const [modalStatusVisible, setmodalStatusVisible] = useState(false);
  const [itemForSelect, setItemForSelect] = useState([]);
  const [itemForUpdate, setItemForUpdate] = useState([]);




  useEffect(() => {

    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();

  }, []);


  useEffect(() => {

    if (tag != null) {

      Product.getItemByTag(tag).then(
        (itemRead) => {
          if (itemRead.length > 0) {
            setItem(itemRead);
          } else {
            alert(tag + " - não encontrado!")
          }

        }
      ).catch(
        error => console.log(error)
      );
    }

  }, [tag]);


  useEffect(() => {


    setItemForUpdate(getValuesOfObject(itemForSelect));

  }, [itemForSelect])


  const handleBarCodeScanned = ({ data }) => {

    setTag(data);
    setScanned(true);

  };


  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const setStatus = async (st) => {

    setItemForSelect({
      ...itemForSelect,
      ["status"]: st
    });


  };



  const updateItem = () => {

    if (modalVisible)
      setmodalVisible(!modalVisible)

    Product.update(itemForSelect.id, itemForUpdate).then((value) => {
      setTag(null);
      setTag(itemForSelect.etiqueta_ti);
    });

  }


  const Item = ({ item, backgroundColor, textColor }) => (
    <View style={[styles.item, backgroundColor]}>
      <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between" }}>
        <View>
          <Text style={[styles.title, textColor]}> Unidade: {item.nome_unidade}</Text>
          <Text style={[styles.title, textColor]}> Marca: {item.marca}</Text>
          <Text style={[styles.title, textColor]}> Modelo: {item.modelo}</Text>
          <Text style={[styles.title, textColor]}> Área: {item.area}</Text>
          <Text style={[styles.title, textColor]}> Departamento: {item.departamento}</Text>
          <Text style={[styles.title, textColor]}> Serial: {item.serial}</Text>
        </View>

      </View>

      <View style={{ flex: 3, flexDirection: "row", marginTop: 15 }}>

        {
          item.status == 0
          &&
          <TouchableOpacity 
          style={{ flex: 1, flexDirection: "row", marginTop: 15, alignItems:"center"}}
          onPress={() => {
            setItemForSelect(item)
            setmodalVisible(!modalStatusVisible)
          }} >
            <MaterialCommunityIcons name="null" size={24} color="red" />
            <Text style={{ fontSize: 10, marginRight: 15 }}>Sem Registro</Text>
          </TouchableOpacity>
        }

        {
          item.status == 1
          &&
          <TouchableOpacity
          style={{ flex: 1, flexDirection: "row", marginTop: 15, alignItems:"center"}}
          onPress={() => {
            setItemForSelect(item)
            setmodalVisible(!modalStatusVisible)
          }} >
            <MaterialCommunityIcons name="edit-attributes" size={24} color="orange" />
            <Text>Editado</Text>
          </TouchableOpacity>
        }

        {
          item.status == 2
          &&
          <TouchableOpacity style={{ flex: 1, flexDirection: "row", marginTop: 15, alignItems:"center"}}
          onPress={() => {
            setItemForSelect(item)
            setmodalVisible(!modalStatusVisible)
          }} >
            <MaterialCommunityIcons name="check" size={24} color="green" />
            <Text>OK</Text>
          </TouchableOpacity>
        }

        <View style={{ flex: 2, flexDirection: "row", justifyContent: "flex-end" }}>

          <TouchableOpacity style={{ paddingHorizontal: 5 }}>
            <Ionicons name="md-trash-outline"
              size={32}
              color="red"
              onPress={() => {

                setmodalVisible(!modalVisible)
              }} />

          </TouchableOpacity >

          <TouchableOpacity style={{ paddingHorizontal: 5 }}>
            <Ionicons name="create-outline"
              size={32}
              color="orange"
              onPress={() => {
                setItemForSelect(item)
                setmodalVisible(!modalVisible)
              }} />
          </TouchableOpacity>

        </View>
      </View>


    </View>

  );


  const renderItem = ({ item }) => {
    const backgroundColor = "#f0f0f0";
    const color = '#555';

    return (
      <Item
        item={item}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };


  return (
    <View style={styles.container}>
      {scanned ?
        <View>
          <View style={{ marginHorizontal: 10 }}>
            <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />
          </View>

          <FlatList
            data={item}
            renderItem={renderItem}
            keyExtractor={(item) => item.codigo} />


          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              alert("Modal has been closed.");
              setmodalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
              <View style={[styles.modalView, { height: modal_height - 50 }]}>

                <FormEditItem
                  itemForSelect={itemForSelect}
                  setItemForSelect={setItemForSelect}
                //onValueChange={(itemValue, itemIndex) => setSelectedItem(itemValue)}
                />


                <View style={{ flexDirection: "row", margin: 45 }}>

                  <View style={{ backgroundColor: "blue", flex: 1, marginHorizontal: 5 }}>
                    <Button
                      title="Update"
                      onPress={() => updateItem()} />
                  </View>

                  <TouchableOpacity style={{
                    backgroundColor: "#FF3322",
                    flex: 1,
                    marginHorizontal: 5,
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                    onPress={() => setmodalVisible(!modalVisible)}
                  >
                    <Text style={{ color: "#FFF" }}>CANCEL</Text>
                  </TouchableOpacity>
                </View>

              </View>
            </View>
          </Modal>
        </View>
        :
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFill}
        />
      }


    </View>
  );
};
const styles = StyleSheet.create({

  container: {
    flex: 1,
    marginTop: 100//StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
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