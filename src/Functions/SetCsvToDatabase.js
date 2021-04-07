import Product from "../Database/Models/Product";

const setCsvToDatabase = (objects)=>{
    
    return new Promise((resolve,reject)=>{

         
        let idsInserted = [];

        for (let i = 0; i < objects.length; i++) {
            
            let element = objects[i]; 
            
            

            if(!element.length > 1 )
            return;

            Product.create(element)
            .then( id => {
                idsInserted.push(id);
                console.log('Product created with id: '+ id)
            })
            .catch( err => reject(err) )
        }

        resolve(idsInserted);
            
    })
};

export default setCsvToDatabase;