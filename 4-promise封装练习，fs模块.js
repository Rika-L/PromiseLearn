function mineReadFile(path){
    return new Promise((resolve, reject)=>{
        require('fs').readFile(path, (err, data)=> {
            //判断
            if(err){
                reject(err);
            }else{
                resolve(data);
            }
        });
    });
}

mineReadFile('./content.txt')
    .then(value => {
        console.log(value.toString())
    }, reason => {
        console.log(reason);
    });