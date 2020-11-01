//路由封装
const router = require('./router')
const express = require('express');
const app = express();
//用于静态资源地址拼接
const path = require('path');
const bodyParser = require('body-parser');

//读取静态资源
const static = path.join(__dirname, 'public');
app.use(express.static(static));

// 使用body中间键，针对post请求参数功能
app.use(bodyParser.urlencoded());

//调用router
app.use(router);

//监听模块
app.listen('3000', () => {
    console.log('success');
});


