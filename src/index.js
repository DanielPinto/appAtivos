import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import { SafeAreaView, StyleSheet, Button, Text, View,FlatList} from 'react-native';

import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';

import getObject from './Functions/Csvtoobject';
import setCsvToDatabase from './Functions/SetCsvToDatabase';
import Product from "./Database/Models/Product";

import Item from "./Components/ItemList";


export default function Home() {


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

      setCsvToDatabase(objects);

    }).then((idsInserteds)=>{
      
      
      setFlagOperation('Leitura Finalizada!');
      
    
    }).catch( erro=>{

      console.log("Erro read/insert: " + erro)
    }).finally(()=>{

      setTimeout(() => {
        setFlagOperation(message);
      }, 3000);
      
    })

 
};


  function getProducts(){

    Product.all()
    .then( 
      prod => console.log(prod)
    )
  };

  function removeTable(){

    Product.removeTable()
    .then( 
      prod => console.log(prod)
    )
  }



  const renderItem = ({item}) => {
    const backgroundColor = item.Código === selectedId.Código ? "#ffc72c" : "#f0f0f0";
    const color = item.Código === selectedId.Código ? 'black' : '#555';

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item)}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };



  return (
    <SafeAreaView style={styles.container}>

   
     <View
     style={styles.button}
     >

      <Button 
      title="get CSV"
      onPress={()=>getDocument()}/>

    </View>
    <View
    style={styles.button}
    >
      <Button 
      title="Listar Equipamentos"
      onPress={()=>getProducts()}/>
    </View>

    <View
    style={styles.button}
    >
      <Button 
      title="Remover Tabela"
      onPress={()=>removeTable()}/>
    </View>


    <Text
    style={styles.message}
    >
      {flagOperation}
    </Text>
    
    </SafeAreaView>
  );


};

const styles = StyleSheet.create({
  
  container:{
    flex: 1,
    marginTop: 30//StatusBar.currentHeight || 0,
  },
  button:{
    marginTop: 15
  },
  message:{
    marginTop: 30
  }

});

/*
 <FlatList
      data={document}
      renderItem={renderItem}
      keyExtractor={(item) => item.Código}
      extraData={selectedId.Código}
      />








      
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