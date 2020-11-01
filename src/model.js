const mysql = require('mysql');

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '20101206',
    database: 'taptap'
})

connection.connect();


//注册数据
function addUser(userName, userPwd, callback) {
    connection.query('insert into user(username ,password)values(?,?)', [userName, userPwd], function (error, result) {
        callback(error, result);
    })
}

//登录数据
function findUser(userName, userPwd, callback) {
    connection.query('select * from user where username = ? and password = ?', [userName, userPwd], function (error, result) {
        callback(error, result);
    })
}

//读取界面
function herosList(callback) {
    connection.query('select * from heros', function (error, result) {
        callback(error, result);
    })
}

//删除功能
function herosDelete(id, callback) {
    connection.query('delete  from heros where id = ?', [id], function (error, result) {
        callback(error, result);
    })
}






module.exports = {
    addUser, findUser, herosList, herosDelete
}



