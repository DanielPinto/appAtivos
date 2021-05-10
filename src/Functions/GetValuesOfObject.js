import Dados from './Dados';

const  getValuesOfObject = (object) => Dados.headers.map((element)=>object[element]);

export default getValuesOfObject;