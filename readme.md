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

### 封装练习-fs模块

* 封装一个函数mineReadFile 读取文件内容
* 参数 path 文件路径
* 返回 promise 对象

### util.promisify方法进行promise风格转换

```js
const fs = require('fs');
const util = require('util');
let mineReadFile = util.promisify(fs.readFile);
```

<u>**好爽！！！**</u>

### 封装AJAX请求

* 封装一个函数 sendAJAX 发送 GET AJAX 请求
* 参数 URL
* 返回结果Promise对象

## promise的状态变化

实例对象中的一个属性[PromiseState]

* pending 未决定
* resolved / fulfilled 成功
* rejected 失败

1. pending变为resolved
2. pending变为rejected

只能改变一次

## promise对象的值

实例对象的另一个属性[PromiseResult]

保存着异步任务[成功/失败]的结果

* resolve
* reject

## promise工作流程

 ![27fa2e0879fa7fe551bf89509fd668c](D:\wechatfile\WeChat Files\wxid_0z1kzagu3rpg22\FileStorage\Temp\27fa2e0879fa7fe551bf89509fd668c.jpg)

## Promise的API

then方法用来指定成功或失败方法的回调

catch用来指定失败方法的回调

## Promise的方法

```js
let p1 = Promise.resolve(521);
```

如果传入的参数为非promise对象,则返回的结果为成功的promise对象

如果传入的参数为Promise对象,则参数的结果决定了resolve结果

```js
let p2 = Promise.resolve(new Promise(resolve, reject)=>{
    reject('Error');
});
p2.catch(reason => {
  console.log(reason);  
})
```

reject()

与resolve类似但是无论传入什么,结果都是失败

### all方法

* 包含n个promise的数组
* 返回一个新的promise
* 只有所有的promise成功才成功,只要有一个失败就直接失败
* &&与与运算类似

### race方法

* 包含n个promise的数组
* 返回一个新的promise
* 第一个完成的promise结果状态决定最终的结果状态

## Promise的几个关键问题

### 如何修改对象的状态

1. resolve函数
2. reject函数
3. 抛出错误

```js
throw '出问题了';
```

### 能否执行多个回调

当promise改变为指定状态时都会调用

### 改变状态与指定回调顺序的先后问题

* 都有可能
* 异步任务会先执行then方法,再改变状态

### then方法返回结果由什么决定

简单表述：由then()指定的回调函数执行的结果决定

详细：

1. 抛出错误throw，result对象状态变为失败
2. 返回结果为非promise对象，result对象变为成功，结果等于return结果
3. 返回结果为promise对象，返回的promise状态决定result状态

###  promise如何串联多个任务

直接套在thin方法里

### promise异常穿透

在最后的位置指定一个失败的回调

```js
。catch(reason => {
    console.warn(reason);
})
```

### 中断promise链

有且只有一种方式，返回一个pending状态的promise对象

```js
return new Promise(() => {});
```





## 手写promise

**跳过了**



