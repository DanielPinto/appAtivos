import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, SafeAreaView , TouchableOpacity} from "react-native";


import Products from "../Database/Models/Product";



const Dash = () => {


    const [tags_blanks, setTagsBlanks] = useState([]);
    const [serial_blanks, setSerialBlanks] = useState([]);
    const [unidade_blanks, setUnidadeBlanks] = useState([]);

    useEffect(()=>{

        getItens();

    },[]);



async function getItens(familia){

            Products.getIten('kit', '', familia).then(fields=>setTagsBlanks(fields))
                .catch(fields => setTagsBlanks(fields));

            Products.getIten('serial', '', familia).then(fields=>setSerialBlanks(fields))
              .catch(fields => setSerialBlanks(fields));

            Products.getIten('unidade', '', familia).then(fields=>setUnidadeBlanks(fields))
              .catch(fields => setUnidadeBlanks(fields));
    };



    return(
        <SafeAreaView>
          <View>
            <TouchableOpacity onPress={()=>getItens('Thinclient')}>
              <View>
                <Text>Thinclient</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>getItens('Monitor')}>
              <View>
                <Text>Monitor</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>getItens('Switch')}>
              <View>
                <Text>Switch</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View>


            <Text>sem Etiqueta TI: {tags_blanks.length}</Text>
            <Text>sem Serial: {serial_blanks.length}</Text>
            <Text>sem Unidade: {unidade_blanks.length}</Text>
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