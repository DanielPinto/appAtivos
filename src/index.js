import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import { SafeAreaView, StyleSheet, Button, FlatList} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import getJson from './Functions/Csvtojson';
import Item from "./Components/ItemList";



export default function Home() {


  const [document, setDocument] = useState([]);
  const [selectedId, setSelectedId] = useState([]);

  useEffect(()=>{
    
     alert(selectedId.Código +' => '+ selectedId.NomeUnidade);
      
  }),(selectedId);




async function getUri(){

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

    await getUri().then(
      async function(uri){
        await readDocument(uri).then((file)=>{
          let jsonDoc = getJson(file);
          setDocument(jsonDoc);
        });
      }
    )
 
};


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
      
      <FlatList
      data={document}
      renderItem={renderItem}
      keyExtractor={(item) => item.Código}
      extraData={selectedId.Código}
      />
      <Button 
      title="get CSV"
      onPress={()=>getDocument()}/>

    
    </SafeAreaView>
  );


};

const styles = StyleSheet.create({
  
  container:{
    flex: 1,
    marginTop: 30//StatusBar.currentHeight || 0,
  }

});