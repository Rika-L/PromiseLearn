const fs = require('fs');
//回调函数形式
// fs.readFile('./resource/content.txt', (err, data) => {
//     //如果出错，则抛出错误
//     if(err){
//         throw err;
//     }
//     console.log(data.toString());
// })

//promise形式
let p = new Promise((resolve, reject)=>{
    fs.readFile('./resource/content.txt', (err, data)=>{
        if(err){
            reject(err);
        }
        resolve(data);
    });
});

//调用then方法
p.then(value => {
    console.log(value.toString());
},reason => {
    console.log(reason);
})
