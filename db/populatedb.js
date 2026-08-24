require('dotenv').config();

const {Client} = require('pg');

const SQL = `
  CREATE TABLE IF NOT EXISTS messages(
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(100) NOT NULL,
    text VARCHAR(500) NOT NULL,
    added TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

  INSERT INTO messages(username, text)
  VALUES
    ('Shreya','Hello from the message board!'),
    ('Alice', 'This is my first message.'),
    ('Bob', 'PostgreSQL db is working!');
`

async function main(){
  console.log('seeding...');
  const client = new Client({
    connectionString: process.env.DATABASE_URL
  });

  try{
    await client.connect();
    await client.query(SQL);
    console.log('done');
  } catch(err){
    console.error('Error while seeding database: ', err);
  } finally {
    await client.end();
  }
}

main();