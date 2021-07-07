import React, { useState, useEffect } from 'react';
import { Button, Dimensions, Text, View, ScrollView, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Dados from '../Functions/Dados';
import getValuesOfObject from '../Functions/GetValuesOfObject';
import Product from '../Database/Models/Product';
import { BarCodeScanner } from 'expo-barcode-scanner';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialIcons } from '@expo/vector-icons';

export default function StoreScreen() {

    const deviceWidth = Dimensions.get('window').width;
    const [item, setItem] = useState(Dados.ObjectClean);

    const [scanned, setScanned] = useState(true);
    const [hasPermission, setHasPermission] = useState(null);
    const [tag, setTag] = useState(null);
    const [buttonClicked, setButtonClicked] = useState(null);

    const [dateClicked, setDateClicked] = useState(null);
    const [date, setDate] = useState(new Date());
    const [dateFormatted, setDateFormatted] = useState(null);
    const [show, setShow] = useState(false);



    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    const handleBarCodeScanned = ({ data }) => {

        refreshItem(buttonClicked, data)
        setScanned(true);

    };

    const scanner = button => {
        setButtonClicked(button);
        setScanned(false)
    }

    const refreshItem = (field, element) => {

        setItem({
            ...item,
            [field]: element
        })

    };

    const insert = async () => {

        try {
            
            let objectForInsert = getValuesOfObject(item);
            objectForInsert.status="1";
            console.log(objectForInsert)
            let idInserted = await Product.create(objectForInsert)
            alert("Item inserido: " + idInserted)
            setItem({
                ...item,
                ["serial"]: "",
                ["etiqueta_ti"]: ""
            })
        } catch (error) {
            alert("erro ao inserir Item!")
            console.log(error)
        }


    }

    const onChange = (event, selectedDate) => {

        try {

            setShow(false)
            setDate(selectedDate);
            const formattedDate = formatDate(selectedDate);
            refreshItem(dateClicked, formattedDate);

        } catch (error) {
            console.log("ERRO: " + error)
        }


    };

    const openDatePicker = (dateClicked) => {
        setShow(true)
        setDateClicked(dateClicked)
    }

    const formatDate = (data) => {
        var dia = String(data.getDate()).padStart(2, '0');
        var mes = String(data.getMonth() + 1).padStart(2, '0');
        var ano = data.getFullYear();
        var dataAtual = dia + '/' + mes + '/' + ano;
        return dataAtual;
    };

    const cleanForm = () => {
        setItem([]);
        setDateFormatted(null);
    };

    return (

        <View style={styles.container}>

            {scanned ?
                <ScrollView style={styles.scroolLayout}>

                    <View >

                        <Text style={styles.titleForm}>Departamento</Text>
                        <View style={styles.viewForm}>

                            <Picker
                                selectedValue={item.departamento}
                                style={styles.pickerForm}
                                onValueChange={(itemValue, itemIndex) => refreshItem("departamento", itemValue)}>
                                {Dados.departamento.map(element => <Picker.Item label={element} value={element} />)}
                            </Picker>
                        </View>

                        <Text style={styles.titleForm}>Área</Text>
                        <View style={styles.viewForm}>

                            <Picker
                                selectedValue={item.area}
                                style={styles.pickerForm}
                                onValueChange={(itemValue, itemIndex) => refreshItem("area", itemValue)}>
                                {Dados.area.map(element => <Picker.Item label={element} value={element} />)}
                            </Picker>
                        </View>

                        <Text style={styles.titleForm}>Fámilia</Text>
                        <View style={styles.viewForm}>
                            <Picker
                                selectedValue={item.familia}
                                style={styles.pickerForm}
                                onValueChange={(itemValue, itemIndex) => refreshItem("familia", itemValue)}>
                                {Dados.familia.map(element => <Picker.Item label={element} value={element} />)}
                            </Picker>
                        </View>

                        <Text style={styles.titleForm}>Marca</Text>
                        <View style={styles.viewForm}>
                            <Picker
                                selectedValue={item.marca}
                                style={styles.pickerForm}
                                onValueChange={(itemValue, itemIndex) => refreshItem("marca", itemValue)}>
                                {Dados.marca.map(element => <Picker.Item label={element} value={element} />)}
                            </Picker>
                        </View>

                        <Text style={styles.titleForm}>Modelo</Text>
                        <View style={styles.viewForm}>

                            <Picker
                                selectedValue={item.modelo}
                                style={styles.pickerForm}
                                onValueChange={(itemValue, itemIndex) => refreshItem("modelo", itemValue)}>
                                {Dados.modelo.map(element => <Picker.Item label={element} value={element} />)}
                            </Picker>
                        </View>

                        <Text style={styles.titleForm}>Etiqueta TI</Text>
                        <View style={styles.viewForm}>

                            <View style={{ flexDirection: "row", alignContent: "center", alignItems: "center" }}>
                                <TextInput
                                    style={{ height: 40, margin: 12, flex: 4 }}
                                    onChangeText={(text) => refreshItem("etiqueta_ti", text)}
                                    value={item.etiqueta_ti}
                                    placeholder="Etiqueta TI"
                                />


                                <TouchableOpacity style={{ flex: 1, direction: 'rtl', backgroundColor: "#ffc72c", marginEnd: 5, alignItems: "center", paddingVertical: 7 }}
                                    onPress={() => scanner("etiqueta_ti")}
                                >
                                    <MaterialIcons name="qr-code-scanner" size={24} color="black" />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <Text style={styles.titleForm}>Número de Série</Text>
                        <View style={styles.viewForm}>

                            <View style={{ flexDirection: "row", alignContent: "center", alignItems: "center" }}>
                                <TextInput
                                    style={{ height: 40, margin: 12, flex: 4 }}
                                    onChangeText={(text) => refreshItem("serial", text)}
                                    value={item.serial}
                                    placeholder="Número de Série"
                                />

                                <TouchableOpacity style={{ flex: 1, direction: 'rtl', backgroundColor: "#ffc72c", marginEnd: 5, alignItems: "center", paddingVertical: 7 }}
                                    onPress={() => scanner("serial")}>
                                    <MaterialIcons name="qr-code-scanner" size={24} color="black" />
                                </TouchableOpacity>
                            </View>
                        </View>


                        <Text style={styles.titleForm}>IMEI</Text>
                        <View style={styles.viewForm}>
                            <TextInput
                                style={{ height: 40, margin: 12 }}
                                onChangeText={(text) => refreshItem("imei", text)}
                                value={item.imei}
                                placeholder="imei"
                            />
                        </View>

                         
                        <Text style={styles.titleForm}>Estoque</Text>
                        <View style={styles.viewForm}>

                            <Picker
                                selectedValue={item.estoque}
                                style={styles.pickerForm}
                                onValueChange={(itemValue, itemIndex) => refreshItem("estoque", itemValue)}>
                                {Dados.estoque.map(element => <Picker.Item label={element} value={element} />)}
                            </Picker>
                        </View>


                        <Text style={styles.titleForm}>Kit</Text>
                        <View style={styles.viewForm}>

                            <Picker
                                selectedValue={item.kit}
                                style={styles.pickerForm}
                                onValueChange={(itemValue, itemIndex) => refreshItem("kit", itemValue)}>
                                {Dados.kit.map(element => <Picker.Item label={element} value={element} />)}
                            </Picker>
                        </View>

                        <Text style={styles.titleForm}>Observações</Text>
                        <View style={styles.viewForm}>
                            
                            <TextInput
                                style={{ height: 40, margin: 12 }}
                                onChangeText={(text) => refreshItem("observacoes", text)}
                                value={item.observacoes}
                                placeholder="observações"
                            />
                        </View>

                        <View style={{ flexDirection: "row", margin: 45 }}>
                            <View style={{ backgroundColor: "blue", flex: 1, marginHorizontal: 5 }}>
                                <Button
                                    title="Insert"
                                    onPress={() => insert()} />
                            </View>

                            <TouchableOpacity style={{
                                backgroundColor: "#FF3322",
                                flex: 1,
                                marginHorizontal: 5,
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                                onPress={() => cleanForm()}
                            >
                                <Text style={{ color: "#FFF" }}>CLEAN</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </ScrollView>



                :
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={StyleSheet.absoluteFill}
                />

            }


            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={'date'}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 100,//StatusBar.currentHeight || 0,
        marginHorizontal: 15
    },
    scroolLayout: { 
        backgroundColor: "#ddd", 
        padding: 10, 
        borderRadius: 5, 
        borderColor: "#ccc", 
        borderWidth: 1 
    },
    titleForm: { 
        margin: 5, 
        fontFamily: "monospace", 
        fontStyle: "normal", 
        color: "black" 
    },
    viewForm: { 
        backgroundColor: "#eee", 
        borderRadius: 15, 
        borderWidth: 1, 
        borderColor: "#ccc", 
        overflow: "hidden", 
        padding: 0, 
        marginBottom: 35 
    },
    pickerForm: { 
        height: 50 
    },

});


/**
 * <Text style={styles.titleForm}>Mundo</Text>
                        <View style={styles.viewForm}>

                            <Picker
                                selectedValue={item.mundo}
                                style={styles.pickerForm}
                                onValueChange={(itemValue, itemIndex) => refreshItem("mundo", itemValue)}>
                                {Dados.mundo.map(element => <Picker.Item label={element} value={element} />)}
                            </Picker>
                        </View>

                        <Text style={styles.titleForm}> Regional</Text>
                        <View style={styles.viewForm}>

                            <Picker
                                selectedValue={item.regional}
                                style={styles.pickerForm}
                                onValueChange={(itemValue, itemIndex) => refreshItem("regional", itemValue)}>
                                {Dados.regional.map(element => <Picker.Item label={element} value={element} />)}
                            </Picker>
                        </View>

                        <Text style={styles.titleForm} >Unidade</Text>
                        <View style={styles.viewForm}>

                            <Picker
                                selectedValue={item.nome_unidade}
                                style={styles.pickerForm}
                                onValueChange={(itemValue, itemIndex) => refreshItem("nome_unidade", itemValue)}>
                                {Dados.unidade.map(element => <Picker.Item label={element} value={element} />
                                )}
                            </Picker>
                        </View>

 * 
 */