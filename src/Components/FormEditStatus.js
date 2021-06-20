import React, { useState, useEffect } from 'react';
import { Dimensions, Text, View, TouchableOpacity} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
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

            <View style={{ flexDirection: "column", justifyContent: "flex-start" }}>
                <TouchableOpacity
                    style={{ padding: 5 }}
                    onPress={() => {
                        refreshItem("2");

                    }} >
                    <MaterialCommunityIcons name="check" size={24} color={item.status == "2" ? "green" : "gray"} />
                </TouchableOpacity>

                <TouchableOpacity
                    style={{ padding: 5 }}
                    onPress={() => {
                        refreshItem("1");
                    }} >
                    <MaterialIcons name="edit-attributes" size={24} color={item.status == "1" ? "orange" : "gray"} />
                </TouchableOpacity>

                <TouchableOpacity
                    style={{ padding: 5 }}
                    onPress={() => {
                        refreshItem("0");
                    }} >
                    <MaterialCommunityIcons name="null" size={24} color={item.status == "0" ? "red" : "gray"} />
                </TouchableOpacity>
            </View>

    );
};
export default FormEditStatus;