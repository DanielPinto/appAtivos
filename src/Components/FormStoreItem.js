import React, { useState, useEffect } from 'react';
import { Dimensions, Text, View, ScrollView, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Dados from '../Functions/Dados';



const FormStoreItem = () => {

    const deviceWidth = Dimensions.get('window').width;
    const [item, setItem] = useState(props.itemForSelect);

    useEffect(() => {

        setItemForSelect(item);

    }, [item]);

    const refreshItem = (field, element) => {

        setItem({
            ...item,
            [field]: element
        })

    };

    return (

        <ScrollView>

            <View style={{ borderBottomWidth: 1, borderBottomColor: '#ddd', marginBottom: 35 }}>
                <Text>Mundo</Text>
                <Picker
                    selectedValue={item.mundo}
                    style={{ height: 50, width: deviceWidth - 100 }}
                    onValueChange={(itemValue, itemIndex) => refreshItem("mundo", itemValue)}>
                    {Dados.mundo.map(element => <Picker.Item label={element} value={element} />)}
                </Picker>
            </View>

            <View style={{ borderBottomWidth: 1, borderBottomColor: '#ddd', marginBottom: 35 }}>
                <Text>Regional</Text>
                <Picker
                    selectedValue={item.regional}
                    style={{ height: 50, width: deviceWidth - 100 }}
                    onValueChange={(itemValue, itemIndex) => refreshItem("regional", itemValue)}>
                    {Dados.regional.map(element => <Picker.Item label={element} value={element} />)}
                </Picker>
            </View>

            <View style={{ borderBottomWidth: 1, borderBottomColor: '#ddd', marginBottom: 35 }}>
                <Text>Unidade</Text>
                <Picker
                    selectedValue={item.unidade}
                    style={{ height: 50, width: deviceWidth - 100 }}
                    onValueChange={(itemValue, itemIndex) => refreshItem("unidade", itemValue)}>
                    {Dados.unidade.map(element =>

                        <Picker.Item label={element} value={element} />
                    )}
                </Picker>
            </View>

            <View style={{ borderBottomWidth: 1, borderBottomColor: '#ddd', marginBottom: 35 }}>
                <Text>Estoque</Text>
                <Picker
                    selectedValue={item.estoque}
                    style={{ height: 50, width: deviceWidth - 100 }}
                    onValueChange={(itemValue, itemIndex) => refreshItem("estoque", itemValue)}>
                    {Dados.estoque.map(element => <Picker.Item label={element} value={element} />)}
                </Picker>
            </View>

            <View style={{ borderBottomWidth: 1, borderBottomColor: '#ddd', marginBottom: 35 }}>
                <Text>Área</Text>
                <Picker
                    selectedValue={item.area}
                    style={{ height: 50, width: deviceWidth - 100 }}
                    onValueChange={(itemValue, itemIndex) => refreshItem("area", itemValue)}>
                    {Dados.area.map(element => <Picker.Item label={element} value={element} />)}
                </Picker>
            </View>

            <View style={{ borderBottomWidth: 1, borderBottomColor: '#ddd', marginBottom: 35 }}>
                <Text>Departamento</Text>
                <Picker
                    selectedValue={item.departamento}
                    style={{ height: 50, width: deviceWidth - 100 }}
                    onValueChange={(itemValue, itemIndex) => refreshItem("departamento", itemValue)}>
                    {Dados.departamento.map(element => <Picker.Item label={element} value={element} />)}
                </Picker>
            </View>

            <View style={{ borderBottomWidth: 1, borderBottomColor: '#ddd', marginBottom: 35 }}>
                <Text>Número de Série</Text>
                <TextInput
                    style={{ height: 40, margin: 12 }}
                    onChangeText={item.serial}
                    value={item.serial}
                    placeholder="Número de Série"
                />
            </View>


            <View style={{ borderBottomWidth: 1, borderBottomColor: '#ddd', marginBottom: 35 }}>
                <Text>IMEI</Text>
                <TextInput
                    style={{ height: 40, margin: 12 }}
                    onChangeText={item.imei}
                    value={item.imei}
                    placeholder="imei"
                />
            </View>


            <View style={{ borderBottomWidth: 1, borderBottomColor: '#ddd', marginBottom: 35 }}>
                <Text>Periodo de Reposição</Text>
                <TextInput
                    style={{ height: 40, margin: 12 }}
                    onChangeText={item.periodo_reposicao}
                    value={item.periodo_reposicao}
                    placeholder="Periodo de reposição"
                />
            </View>

            <View style={{ borderBottomWidth: 1, borderBottomColor: '#ddd', marginBottom: 35 }}>
                <Text>Fámilia</Text>
                <Picker
                    selectedValue={item.familia}
                    style={{ height: 50, width: deviceWidth - 100 }}
                    onValueChange={(itemValue, itemIndex) => refreshItem("familia", itemValue)}>
                    {Dados.familia.map(element => <Picker.Item label={element} value={element} />)}
                </Picker>
            </View>

            <View style={{ borderBottomWidth: 1, borderBottomColor: '#ddd', marginBottom: 35 }}>
                <Text>Marca</Text>
                <Picker
                    selectedValue={item.marca}
                    style={{ height: 50, width: deviceWidth - 100 }}
                    onValueChange={(itemValue, itemIndex) => refreshItem("marca", itemValue)}>
                    {Dados.marca.map(element => <Picker.Item label={element} value={element} />)}
                </Picker>
            </View>
            <View style={{ borderBottomWidth: 1, borderBottomColor: '#ddd', marginBottom: 35 }}>
                <Text>Modelo</Text>
                <Picker
                    selectedValue={item.modelo}
                    style={{ height: 50, width: deviceWidth - 100 }}
                    onValueChange={(itemValue, itemIndex) => refreshItem("modelo", itemValue)}>
                    {Dados.modelo.map(element => <Picker.Item label={element} value={element} />)}
                </Picker>
            </View>

            <View style={{ borderBottomWidth: 1, borderBottomColor: '#ddd', marginBottom: 35 }}>
                <Text>Tamanho</Text>
                <TextInput
                    style={{ height: 40, margin: 12 }}
                    onChangeText={item.tamanho}
                    value={item.tamanho}
                    placeholder="tamanho"
                />
            </View>

            <View style={{ borderBottomWidth: 1, borderBottomColor: '#ddd', marginBottom: 35 }}>
                <Text>Quantidade</Text>
                <TextInput
                    style={{ height: 40, margin: 12 }}
                    onChangeText={item.quantidade}
                    value={item.quantidade}
                    placeholder="quantidade"
                />
            </View>

            <View style={{ borderBottomWidth: 1, borderBottomColor: '#ddd', marginBottom: 35 }}>
                <Text>Etiqueta TI</Text>
                <TextInput
                    style={{ height: 40, margin: 12 }}
                    onChangeText={item.etiqueta_ti}
                    value={item.etiqueta_ti}
                    placeholder="Etiqueta TI"
                />
            </View>

            <View style={{ borderBottomWidth: 1, borderBottomColor: '#ddd', marginBottom: 35 }}>
                <Text>Responsável ID</Text>
                <TextInput
                    style={{ height: 40, margin: 12 }}
                    onChangeText={item.responsavel_id}
                    value={item.responsavel_id}
                    placeholder="responsavel id"
                />
            </View>


            <View style={{ borderBottomWidth: 1, borderBottomColor: '#ddd', marginBottom: 35 }}>
                <Text>Responsável Nome</Text>
                <TextInput
                    style={{ height: 40, margin: 12 }}
                    onChangeText={item.responsavel_nome}
                    value={item.responsavel_nome}
                    placeholder="responsavel nome"
                />
            </View>

            <View style={{ borderBottomWidth: 1, borderBottomColor: '#ddd', marginBottom: 35 }}>
                <Text>Termo de Responsábilidade</Text>
                <TextInput
                    style={{ height: 40, margin: 12 }}
                    onChangeText={item.termo_responsabilidade}
                    value={item.termo_responsabilidade}
                    placeholder="termo de responsabilidade"
                />
            </View>

            <View style={{ borderBottomWidth: 1, borderBottomColor: '#ddd', marginBottom: 35 }}>
                <Text>Kit</Text>
                <Picker
                    selectedValue={item.kit}
                    style={{ height: 50, width: deviceWidth - 100 }}
                    onValueChange={(itemValue, itemIndex) => refreshItem("kit", itemValue)}>
                    {Dados.kit.map(element => <Picker.Item label={element} value={element} />)}
                </Picker>
            </View>

            <View style={{ borderBottomWidth: 1, borderBottomColor: '#ddd', marginBottom: 35 }}>
                <Text>Gerente de TI</Text>
                <TextInput
                    style={{ height: 40, margin: 12 }}
                    onChangeText={item.gerente_ti}
                    value={item.gerente_ti}
                    placeholder="Gerente de TI"
                />
            </View>

            <View style={{ borderBottomWidth: 1, borderBottomColor: '#ddd', marginBottom: 35 }}>
                <Text>numero de chamado/motivo</Text>
                <TextInput
                    style={{ height: 40, margin: 12 }}
                    onChangeText={item.numero_chamado_motivo}
                    value={item.numero_chamado_motivo}
                    placeholder="numero de chamado/motivo"
                />
            </View>

            <View style={{ borderBottomWidth: 1, borderBottomColor: '#ddd', marginBottom: 35 }}>
                <Text>Nota Fiscal</Text>
                <TextInput
                    style={{ height: 40, margin: 12 }}
                    onChangeText={item.nota_fiscal}
                    value={item.nota_fiscal}
                    placeholder="Nota Fiscal"
                />
            </View>

            <View style={{ borderBottomWidth: 1, borderBottomColor: '#ddd', marginBottom: 35 }}>
                <Text>Acesso</Text>
                <TextInput
                    style={{ height: 40, margin: 12 }}
                    onChangeText={item.acesso}
                    value={item.acesso}
                    placeholder="acesso"
                />
            </View>

            <View style={{ borderBottomWidth: 1, borderBottomColor: '#ddd', marginBottom: 35 }}>
                <Text>Observações</Text>
                <TextInput
                    style={{ height: 40, margin: 12 }}
                    onChangeText={item.observacoes}
                    value={item.observacoes}
                    placeholder="observações"
                />
            </View>

            <View style={{ borderBottomWidth: 1, borderBottomColor: '#ddd', marginBottom: 35 }}>
                <Text>Data de Cadastro</Text>
                <TextInput
                    style={{ height: 40, margin: 12 }}
                    onChangeText={item.data_cadastro}
                    value={item.data_cadastro}
                    placeholder="data de cadastro"
                />
            </View>

            <View style={{ borderBottomWidth: 1, borderBottomColor: '#ddd', marginBottom: 35 }}>
                <Text>Data de Atualização</Text>
                <TextInput
                    style={{ height: 40, margin: 12 }}
                    onChangeText={item.data_atualizacao}
                    value={item.data_atualizacao}
                    placeholder="data de atualização"
                />
            </View>

            <View style={{ borderBottomWidth: 1, borderBottomColor: '#ddd', marginBottom: 35 }}>
                <Text>Usuário</Text>
                <TextInput
                    style={{ height: 40, margin: 12 }}
                    onChangeText={(text)=>refreshItem("usuario", text)}
                    value={item.usuario}
                    placeholder="usuario"
                />
            </View>

            


        </ScrollView>

    );
};
export default FormEditItem;