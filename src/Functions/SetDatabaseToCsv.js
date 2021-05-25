import Product from "../Database/Models/Product";
import Dados from "./Dados";
import getValuesOfObject from "./GetValuesOfObject";

const setDatabaseToCsv = async () => {

    try {

        const data = await Product.all();

        const headerCsv = Dados.headers.toString();

        const lines = data.map((item) => {

            const objectItem = getValuesOfObject(item);

            const lineItem = objectItem.toString();

            return lineItem;

        })

        const csv =  headerCsv.concat("\n", lines);
        return csv;



    } catch (error) {

        return error;
    }


}

export default setDatabaseToCsv;