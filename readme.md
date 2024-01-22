# Promise

## 优势

1. 指定回调函数的方式更加灵活
2. 支持链式调用，可以解决回调地狱问题

## 初体验

需求：点击按钮后，2秒后显示是否中奖，（30%概率中奖）

​	若中奖弹出	恭喜恭喜，奖品位10万RMB

​	若未中奖弹出	再接再厉

* resolve成功
* reject拒绝

```js
//调用then方法
        p.then((value)=>{
        alert('恭喜中奖, 您的中奖数字为' + value);
        }, (reason)=>{
        alert('再接再厉'+ reason);
        });
```

resolve传入的参数即第一个回调函数中的value

reject传入的参数即第二个回调函数中的reason

promise套路

```js
const p = new Promise((resolve, reject) => {
    //异步操作
    //成功调用resolve
    //失败调用reject
}
//调用then方法
p.then(value => {
	//成功回调函数
},reason => {
	//失败回调函数
})
```



## 案例

### 封装fs读取文件操作

创建fs对象

```js
const fs = require('fs');
```

回调函数

```js
fs.readFile('./resource/content.txt', (err, data)=>{
        if(err){
            reject(err);
        }
        resolve(data);
    });
```



### 封装AJAX请求

回顾AJAX基本语法

1. 创建XML对象
2. 初始化
3. 发送
4. 绑定事件

```js
const btn = document.querySelector('#btn');

    btn.addEventListener('click', function () {
        //创建Promise对象
        const p = new Promise((resolve, reject) => {
            //1.创建对象
            const xhr = new XMLHttpRequest();
            //2.初始化
            xhr.open('GET', 'https://api.apiopen.top/getJoke');
            //3.发送
            xhr.send();
            //4.绑定事件
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        //控制台输出响应体
                        resolve(xhr.response);
                    } else {
                        //控制台输出响应状态码
                        reject(xhr.status);
                    }
                }
            }
        });
        //调用then方法
        p.then(value => {
            console.log(value);
        },reason => {
            console.warn(reason);
        })
    });
```

