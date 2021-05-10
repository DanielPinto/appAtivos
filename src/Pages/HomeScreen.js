import React from 'react';
import { View, Button, StyleSheet, SafeAreaView } from "react-native";
import Home from '../index';

function HomeScreen(props) {


    const goPage = (page) => {
        props.navigation.navigate(page)
    };



    return (
      
      <SafeAreaView style={styles.container}>
        <Home/>

        <View
          style={{
              borderBottomColor: '#ffcc00',
              borderBottomWidth: 1,
              marginTop: 30
            }}
          />


        <View style={styles.button}>
            <Button 
            title="Listar Equipamentos"
            onPress={()=>goPage('Lista')}/>
        </View>

        <View style={styles.button}>
            <Button 
            title="Cadastrar Item"
            onPress={()=>goPage('Cadastrar')}/>
        </View>

        <View style={styles.button}>
            <Button 
            title="Scanner Item"
            onPress={()=>goPage('Scanner')}/>
        </View>
    </SafeAreaView>

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

export default HomeScreen;
