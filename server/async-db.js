const mysql = require('mysql');

const mysql_user = {
    host:'localhost',
    user:'root',
    password:'Wgijvou_1853',
    database:'websites'
};

//var connection = mysql.createConnection(mysql_user);
let pool = mysql.createPool(mysql_user);

let query = function (sql, values) {
    return new Promise((resolve, reject)=>{
        pool.getConnection(function(err, conn){
            if(err) reject(err);
            else {
                conn.query(sql, values, (err, rows)=>{
                    if(err) {
                        reject(err);
                    }
                    else {
                        resolve(rows);
                    }
                    conn.release();
                });
            }
        });
    });
};

module.exports = query;

 