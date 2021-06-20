import Product from "../Database/Models/Product";

const setCsvToDatabase = async (objects, setQuantInserted)=>{

    try {

        const idsInserted = [];
    

        for (let i = 0; i < objects.length; i++) {
            
            let element = objects[i]; 
            
        
            if(!element.length > 1 )
            return;

            let id = await Product.create(element)
            idsInserted.push(id);
            setQuantInserted(i);
            console.log('Product created with id: '+ id)
        }
        
        return idsInserted.length;
        
    } catch (error) {
        
        return error;
    }
        
            
    }

export default setCsvToDatabase;