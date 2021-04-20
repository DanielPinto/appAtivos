import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Button, Text, View} from 'react-native';

import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';

import getObject from './Functions/Csvtoobject';
import setCsvToDatabase from './Functions/SetCsvToDatabase';
import Product from "./Database/Models/Product";



export default function Home(props) {


  const message = 'Ler Arquivo CSV';
  const [selectedId, setSelectedId] = useState([]);
  const [flagOperation, setFlagOperation] = useState(message);


  async function getDocument(){

    setFlagOperation('Leitura do arquivo em andamento...');

    DocumentPicker.getDocumentAsync()
    .then((res)=>{
      
      return FileSystem.readAsStringAsync(res.uri);
    
    }).then((file)=>{
    
      return getObject(file);
    
    }).then((objects)=>{

      return setCsvToDatabase(objects);

    }).then((idsInserteds)=>{
      
      
      alert(idsInserteds + ' linhas inseridas!');

      setFlagOperation(message);
      
    }).catch( erro=>{

      console.log("Erro read/insert: " + erro)
    });
 
};


  function removeTable(){

    Product.removeTable()
    .then( 
      prod => console.log(prod)
    )
  }



 



  return (
    <View>

   
     <View
     style={styles.button}
     >

      <Button 
      title="Upload CSV"
      onPress={()=>getDocument()}/>

    </View>
    

    <View
    style={styles.button}
    >
      <Button 
      title="Remover Todos"
      onPress={()=>removeTable()}/>
    </View>

    
    </View>
  );


};

const styles = StyleSheet.create({
  
  container:{
    flex: 1,
    marginTop: 30//StatusBar.currentHeight || 0,
  },
  button:{
    marginTop: 15,
    marginHorizontal:20
  },
  message:{
    marginTop: 30,
    alignContent: 'center',

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