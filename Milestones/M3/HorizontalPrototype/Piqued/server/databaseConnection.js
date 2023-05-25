import mysql from 'mysql2';
// const pgp = require("pg-promise")();

const pool = mysql.createPool({
  host: 'database-2.cmvveapu2ri8.us-west-1.rds.amazonaws.com',
  user: 'admin',
  password: 'team05db',
  database: 'piquedDB',
});

let sql = "SELECT * FROM user;";
pool.execute(sql, function(err, results){
    if(err) throw err;
    console.log(results);
});


pool.getConnection(function(err) {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database successfully!');
});

export default pool.promise();