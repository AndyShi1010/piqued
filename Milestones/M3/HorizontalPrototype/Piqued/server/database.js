const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'database-2.cmvveapu2ri8.us-west-1.rds.amazonaws.com',
  user: 'admin',
  password: 'team05db',
  database: 'Team05 DB',
});

connection.connect(function(err) {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database successfully!');
});
