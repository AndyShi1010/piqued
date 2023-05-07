import mysql from 'mysql2';

const pool = mysql.createPool({
  host: 'database-2.cmvveapu2ri8.us-west-1.rds.amazonaws.com',
  user: 'admin',
  password: 'team05db',
  database: 'piquedDB',
});

pool.getConnection(function(err) {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database successfully!');
});

export default pool.promise();