const model = require('./model');
const tokenUtil = require('./tokenUtil');


const express = require('express');
//调出请求
const router = express.Router();






//注册模块-----------------------------------------------------------
router.post('/register', (req, res) => {
    const { userName, userPwd } = req.body;
    //判断输入是否为空
    if (userName && userPwd) {
        //传参后获得返回值
        model.addUser(userName, userPwd, function (error, theRe) {
            //错误如果是0.那么返回值
            if (error === null) {
                res.send({ code: 200, msg: '注册成功' })
            }
        })
    } else {
        res.send({ code: 201, msg: '请勿输入空值' })
    }
})

//登录模块------------------------------------------------------------
router.post('/login', (req, res) => {
    const { userName, userPwd } = req.body;
    //判断输入是否为空
    if (userName && userPwd) {
        //传参后获得返回值
        model.findUser(userName, userPwd, function (error, theRe) {
            //错误如果是0.那么返回值

            if (theRe.length > 0) {
                const userToken = tokenUtil.createToken(req.body.username)
                res.send({ code: 200, msg: '登录成功', token: userToken })
            }
            else {
                res.send({ code: 201, msg: '该用户无注册' })
            }
        })
    } else {
        res.send({ code: 201, msg: '请勿输入空值' })
    }
})



//获取英雄数据模块-----------------------------------------------------------
router.post('/index', (req, res) => {
    //-------------------------------处理token验证---------------------------------
    // 请求头获取token
    const token = req.headers.authorization;
    // 验证token是否有效
    const result = tokenUtil.verifyToken(token);
    console.log(result);

    //根据token判断
    if (result === true) {
        model.herosList(function (error, theRe) {
            if (error === null) {
                res.send({ code: 200, data: theRe })
            } else {
                res.send({ code: 201, data: '获取失败' })
            }
        })
    } else {
        res.send({ code: 202, data: '登录失败' })
    }
})

//------------------------------------------删除功能-------------------------------
router.get('/delete', (req, res) => {
    const { id } = req.query
    console.log(id);
    model.herosDelete(id, function (error) {
        if (error === null) {
            res.send({ code: 200, data: '删除成功' })
        } else {
            res.send({ code: 201, data: '获取失败' })
        }
    })
})

//导出router
module.exports = router;