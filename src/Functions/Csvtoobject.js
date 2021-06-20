const getObject = (csv, setUnitPercent, setTotalLines)=>{
 
    return new Promise((resolve, reject)=>{
        
        try {
        
            var lines=csv.split('\n');

            setTotalLines(lines.length - 1);
  
            setUnitPercent((lines.length - 1)/100);
    
            var result = [];
    
    
            for(var i=1; i < lines.length; i++){
            
                let currentline=lines[i].split(";");

                currentline.unshift("0");
            

                if(currentline.length > 1)
                    result.push(currentline)
            }

            resolve(result);

        } catch (error) {
            reject(error)
        }
       
    
    })


    
  };

  export default getObject;