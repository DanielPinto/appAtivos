import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, SafeAreaView } from "react-native";

import Products from "../Database/Models/Product";



const Dash = () => {

    const [tags_blanks, setTagsBlanks] = useState([]);

    useEffect(()=>{

        getTags('Kit VD');

    },[]);



async function getTags(tag){

            Products.getEtiquetaTi(tag).then(tags=>setTagsBlanks(tags))
                .catch(tags => setTagsBlanks(tags));
    };



    return(
        <SafeAreaView>
            <View>
                <Text>{tags_blanks.length}</Text>
            </View>
        </SafeAreaView>
    )

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
});

export default Dash; 