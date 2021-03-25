import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Button, View } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';



export default function Home() {
  

    
const [state, setState] = useState(0);

    useEffect(
        ()=>{
    
            alert(state);
        }
        ),(state);
    
  return (
    <View style={styles.container}>
      <Button 
      title="CSV"
      onPress={()=>setState(state+1)}/>
    </View>
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
