import React, { useState, useEffect } from 'react';
import { Dimensions, Text, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Dados from '../Functions/Dados';



const FormEditItem = (props) => {

    const deviceWidth = Dimensions.get('window').width;
    const [item, setItem] = useState(props.itemForSelect);

    useEffect(() => {

       props.setItemForSelect(item);

    }, [item]);

    const refreshItem = (field, element) => {

        setItem({
            ...item,
            [field]: element
        })

    };

    return (

        <View>
            <View>
                <Picker
                    selectedValue={item.estoque}
                    style={{ height: 50, width: deviceWidth - 100 }}
                    onValueChange={(itemValue, itemIndex) => refreshItem("estoque", itemValue)}>
                    {Dados.estoque.map(element => <Picker.Item label={element} value={element} />)}
                </Picker>
            </View>

            <View>
                <Picker
                    selectedValue={item.area}
                    style={{ height: 50, width: deviceWidth - 100 }}
                    onValueChange={(itemValue, itemIndex) => refreshItem("area", itemValue)}>
                    {Dados.area.map(element => <Picker.Item label={element} value={element} />)}
                </Picker>
            </View>

            <View>
                <Picker
                    selectedValue={item.departamento}
                    style={{ height: 50, width: deviceWidth - 100 }}
                    onValueChange={(itemValue, itemIndex) => refreshItem("departamento", itemValue)}>
                    {Dados.departamento.map(element => <Picker.Item label={element} value={element} />)}
                </Picker>
            </View>
            <View style>

            </View>
        </View>

    );
};
export default FormEditItem;