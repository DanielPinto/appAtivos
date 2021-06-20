import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Button, Text, View, Modal, Dimensions, TouchableOpacity, TextInput, ActivityIndicator, Touchable } from 'react-native';

import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';

import getObject from './Functions/Csvtoobject';
//import setCsvToDatabase from './Functions/SetCsvToDatabase';
import setDatabaseToCsv from './Functions/SetDatabaseToCsv';
import Product from "./Database/Models/Product";



export default function Home(props) {





  const [percentInserted, setPercentInserted] = useState(0);
  const [quantInserted, setQuantInserted] = useState(0);
  const [unitPercent, setUnitPercent] = useState(0);
  const [totalLines, setTotalLines] = useState(0);

  const [objects, setObjects] = useState([]);
  const [index, setIndex] = useState(null);

  const [modalVisible, setmodalVisible] = useState(false);
  const [modalIndicator, setmodalIndicator] = useState(false);
  const [email, setEmail] = useState('');
  const modal_height = Dimensions.get('window').height;


  useEffect(() => {

    const percent = Math.round(quantInserted / unitPercent);
    setPercentInserted(percent);

  }, [quantInserted]);


  useEffect(() => {

    if (objects.length > 0) {

      setIndex(1);
      
    }

  }, [objects]);

  useEffect(()=>{
    
    if(index != null && modalIndicator && index <= totalLines){
      Product.create(objects[index]).then(id => {
        console.log("item inserido: " + id);
        setQuantInserted(quantInserted + 1);
        setIndex(index + 1);
      }
      
      ).catch(error => console.log(error));
    }

    setmodalIndicator(false)

    
  }, [index]);

  async function getDocument() {
    try {

      console.log("ler Documento");
      const res = await DocumentPicker.getDocumentAsync();

      setmodalIndicator(true);
      console.log(modalIndicator);
      console.log("ler Arquivo");
      const file = await FileSystem.readAsStringAsync(res.uri);

      console.log("pegar objeto");
      const objects_returned = await getObject(file, setUnitPercent, setTotalLines);

      console.log("setObjects");
      setObjects(objects_returned);



    } catch (erro) {

      console.log("Erro read/insert: " + erro)
    };

  };

  async function sentDocument() {

    try {


      const allProducts = await Product.all();

      const emailSent = { "email": email }

      const body = [];

      body.push(allProducts);

      body.push(emailSent);

      const jsonProducts = JSON.stringify(body);

      ////const jsonProducts = await JSON.parse(strProducts);

      console.log(jsonProducts);



      let csv = 'string';

      csv = await fetch('https://danptec.com/Field/mail.php', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: jsonProducts
      });


      //const csv = await setDatabaseToCsv();

      setmodalVisible(!modalVisible)

      csv.status == 200 ?
        alert("Documento enviado por email!")
        : alert("Erro ao enviar o email!")


    } catch (error) {

      console.log("ERRO: " + error);

    }


    //console.log("index - csv: " + csv)

  };




  function removeTable() {

    Product.removeTable()
      .then(
        prod => alert(prod + " itens removidos!")
      )
  };







  return (
    <View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalIndicator}
        onRequestClose={() => {
          setmodalIndicator(false);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>

            <ActivityIndicator size="large" color="green" />
            <Text>{percentInserted}%</Text>
            <Text>{quantInserted} de {totalLines} inseridos</Text>
            <Button 
            title="Cancel" 
            onPress={() => setmodalIndicator(false)}/>

          </View>
        </View>
      </Modal>


      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          alert("Ação encerrada.");
          setmodalVisible(!modalVisible);
        }}>

        <View style={styles.centeredView}>
          <View style={styles.modalView}>

            <Text>Enviar arquivo por Email</Text>

            <View style={{ borderBottomWidth: 1, borderBottomColor: '#ddd', marginBottom: 35 }}>

              <TextInput
                style={{ height: 40, margin: 12 }}
                onChangeText={(text) => setEmail(text)}
                value={email}
                placeholder="digite o email para envio..."
              />
            </View>

            <View style={{ flexDirection: "row", margin: 45 }}>

              <View style={{ backgroundColor: "blue", flex: 1, marginHorizontal: 5 }}>
                <Button
                  title="Enviar"
                  onPress={() => sentDocument()} />
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

      <View
        style={styles.button}
      >

        <Button
          title="Upload CSV"
          onPress={() => {
            setmodalIndicator(true);
            getDocument()
          }} />

      </View>

      <View
        style={styles.button}
      >

        <Button
          title="Download CSV"
          onPress={() => setmodalVisible(!modalVisible)} />

      </View>


      <View
        style={styles.button}
      >
        <Button
          title="Remover Todos"
          onPress={() => removeTable()} />
      </View>


    </View>
  );


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

/*





console.log("ler Documento");
      const res = await DocumentPicker.getDocumentAsync();

      setmodalIndicator(true);
      console.log(modalIndicator);
      console.log("ler Arquivo");
      const file = await FileSystem.readAsStringAsync(res.uri);

      console.log("pegar objeto");
      const objects = await getObject(file, setUnitPercent);

      console.log("inserir dados");
      const idsInserteds = await csvToDatabase(objects);

      console.log("Final");
      setmodalIndicator(false);
      alert(idsInserteds+ " inseridas")

DocumentPicker.getDocumentAsync()
      .then((res) => {
        setmodalIndicator(true);
        return FileSystem.readAsStringAsync(res.uri);

      }).then((file) => {


        return getObject(file, setUnitPercent);

      }).then((objects) => {


        return csvToDatabase(objects);

      }).then((idsInserteds) => {

        setmodalIndicator(false);

      }).catch(erro => {

        console.log("Erro read/insert: " + erro)
      });



















      async function csvToDatabase(objects) {
    console.log("entrando no csvToDatabase")
    try {

      const idsInserted = [];

      for (let i = 0; i < objects.length; i++) {

        let element = objects[i];


        if (!element.length > 1)
          return;

        if (!modalIndicator) {
          console.log("modalIndicator: " + modalIndicator);
          break;
        }


        let id = await Product.create(element)

        console.log("modalIndicator: " + modalIndicator);
        console.log(id);
        idsInserted.push(id);
        setQuantInserted(i);
        console.log('Product created with id: ' + id)
      }

      return idsInserted.length;

    } catch (error) {

      return error;
    }
  };





async function getUri(){

  let uri = "uri null";
  await DocumentPicker.getDocumentAsync().then((res)=>{
    uri = res.uri;
  });
  return uri;
};











function getUri(){

  return new Promise((resolve, reject)=>{

  });

  let uri = "uri null";
  await DocumentPicker.getDocumentAsync().then((res)=>{
    uri = res.uri;
  });
  return uri;
};


async function readDocument(uri){

  let file = null;
  await FileSystem.readAsStringAsync(uri).then((res)=>{
    file = res;
  });
  return file;
}

async function getDocument(){

  setFlagOperation('Leitura do arquivo em andamento...');

    await getUri().then(
      async function(uri){
        await readDocument(uri).then((file)=>{
          let objects = getObject(file);
          setobjectsOfCSV(objects);
        });
      }
    )

};






function setCsvToDatabase(objects){

  let idsInserted = [];

      for (let i = 0; i < objects.length; i++) {
        let element = objects[i];

        console.log(element.length);

        if(!element.length > 1 )
          return;

        Product.create(element)
        .then( id => {
          idsInserted.push(id);
          console.log('Product created with id: '+ id)
        } )
        .catch( err => console.log(err) )
      }

      return idsInserted;

  };

*/