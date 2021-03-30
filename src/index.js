import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import { SafeAreaView, StyleSheet, Button, View, FlatList,Text } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { set } from 'lodash';


export default function Home() {


  const [document, setDocument] = useState([]);


  useEffect(()=>{
    if(document!=[]){  

      
      console.log(document);
    }
      
  }),(document);

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
          let jsonDoc = csvToJson(file);
          setDocument(jsonDoc);
        });
      }
    )
 
};

console.log("fora do getDocument");


function csvToJson(csv){
 
  var lines=csv.split("\n");

  var result = [];

  var headers=lines[0].replace(/\s/g, '').split(",");

  for(var i=1;i<lines.length;i++){

	  var obj = {};
	  var currentline=lines[i].split(",");

	  for(var j=0;j<headers.length;j++){
		  obj[headers[j]] = currentline[j];
	  }

	  result.push(obj);

  }
  
  //return result; //JavaScript object
  return JSON.parse(JSON.stringify(result)); //JSON

}



  return (
    <SafeAreaView style={styles.container}>
      
      <FlatList
      data={document}
      renderItem={({item})=><Text>{item.NomeUnidade}</Text>}
      />
      <Button 
      title="CSV"
      onPress={()=>getDocument()}/>

    
    </SafeAreaView>
  );


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
