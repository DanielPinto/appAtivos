import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Button, Text, View, Modal, Dimensions, TouchableOpacity , TextInput} from 'react-native';

import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';

import getObject from './Functions/Csvtoobject';
import setCsvToDatabase from './Functions/SetCsvToDatabase';
import setDatabaseToCsv from './Functions/SetDatabaseToCsv';
import Product from "./Database/Models/Product";



export default function Home(props) {


  const message = 'Ler Arquivo CSV';
  const [selectedId, setSelectedId] = useState([]);
  const [flagOperation, setFlagOperation] = useState(message);

  const [modalVisible, setmodalVisible] = useState(false);
  const [email, setEmail] = useState('');
  const modal_height = Dimensions.get('window').height;



  async function getDocument() {

    setFlagOperation('Leitura do arquivo em andamento...');

    DocumentPicker.getDocumentAsync()
      .then((res) => {

        return FileSystem.readAsStringAsync(res.uri);

      }).then((file) => {

        return getObject(file);

      }).then((objects) => {

        return setCsvToDatabase(objects);

      }).then((idsInserteds) => {


        alert(idsInserteds + ' linhas inseridas!');

        setFlagOperation(message);

      }).catch(erro => {

        console.log("Erro read/insert: " + erro)
      });

  };

  async function sentDocument() {

    try {


      const allProducts = await Product.all();

      const emailSent = {"email": email}
      
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

  }



  function removeTable() {

    Product.removeTable()
      .then(
        prod => alert(prod + " itens removidos!")
      )
  }







  return (
    <View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          alert("Modal has been closed.");
          setmodalVisible(!modalVisible);
        }}>

        <View style={styles.centeredView}>
          <View style={styles.modalView}>

            <Text>Enviar arquivo por Email</Text>

          <View style={{ borderBottomWidth: 1, borderBottomColor: '#ddd', marginBottom: 35 }}>
               
                <TextInput
                    style={{ height: 40, margin: 12 }}
                    onChangeText={(text)=>setEmail(text)}
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
          onPress={() => getDocument()} />

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