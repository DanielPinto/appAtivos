import React, {useState, useEffect} from 'react';
import {FlatList, SafeAreaView, View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import Product from '../Database/Models/Product';

export default function ListScreen(){

    const [lista, setLista] = useState([]);
    const [selectedId, setSelectedId] = useState([]);

    useEffect( () => {

         Product.all().then(prod => setLista(prod));

    },[]);
    

    const Item = ({ item, onPress, backgroundColor, textColor }) => (
        <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
          <Text style={[styles.title, textColor]}>{item.nome_unidade}</Text>
        </TouchableOpacity>
    );


    const renderItem = ({item}) => {
        const backgroundColor = item.codigo === selectedId.codigo ? "#ffc72c" : "#f0f0f0";
        const color = item.Código === selectedId.codigo ? 'black' : '#555';

        return (
        <Item
            item={item}
            onPress={() => setSelectedId(item)}
            backgroundColor={{ backgroundColor }}
            textColor={{ color }}
        />
        );
    };

    return(

        <SafeAreaView style={styles.container}>
            <View>
                <FlatList
                    data={lista}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.codigo}
                    extraData={selectedId.codigo}
                />
            
            </View>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
  
    container:{
      flex: 1,
      marginTop: 30//StatusBar.currentHeight || 0,
    },
    item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
      },
      title: {
        fontSize: 32,
      },
  });
  

