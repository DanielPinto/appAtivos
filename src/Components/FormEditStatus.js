import React, { useState, useEffect } from 'react';
import { Dimensions, Text, View, ScrollView, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Dados from '../Functions/Dados';




const FormEditStatus = (props) => {

    const deviceWidth = Dimensions.get('window').width;
    const [item, setItem] = useState(props.itemForSelect);

    useEffect(() => {

        props.setItemForSelect(item);

    }, [item]);

    //const ifNotModify = (a, b) => a === b;

    const refreshItem = (element) => {
        setItem({
            ...item,
            ["status"]: element
        });

    };

    return (

        <View>


<View style={{ flex: 3, flexDirection: "row", justifyContent: "flex-start" }}>
          <TouchableOpacity
            style={{ padding: 5 }}
            onPress={() => {
              setItemForSelect(item);
              setStatus("2")
              }} >
            <MaterialCommunityIcons name="check" size={24} color={item.status == "2" ? "green" : "gray"} />
          </TouchableOpacity>

          <TouchableOpacity
            style={{ padding: 5 }}
            onPress={() => {
              setItemForSelect(item);
              setStatus("1")
              }} >
            <MaterialIcons name="edit-attributes" size={24} color={item.status == "1" ? "orange" : "gray"} />
          </TouchableOpacity>

          <TouchableOpacity
            style={{ padding: 5 }}
            onPress={() => {
              setItemForSelect(item);
              setStatus("0")
              }} >
            <MaterialCommunityIcons name="null" size={24} color={item.status == "0" ? "red" : "gray"} />
          </TouchableOpacity>
        </View>

        


            <View style={{ borderBottomWidth: 1, borderBottomColor: '#ddd', marginBottom: 35 }}>
                <Text>Mundo</Text>

                
                <Picker
                    selectedValue={item.mundo}
                    style={{ height: 50, width: deviceWidth - 100 }}
                    onValueChange={(itemValue, itemIndex) => refreshItem("mundo", itemValue)}>
                    {Dados.mundo.map(element => <Picker.Item label={element} value={element} />)}
                </Picker>
            </View>

        </View>

    );
};
export default FormEditStatus;