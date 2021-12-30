const mysql = require('mysql');
const {logger} = require('../logger/logger')

var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'db_project'   
})

connection.connect((err)=>{
    if(err){
         logger.error('Error', err);
    }else{
        console.log("Connect with MySQL... ");
    }
})

module.exports = connection;