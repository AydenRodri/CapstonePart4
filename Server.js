"use strict";

const { Client } = require('pg');
const express = require('express');
const app = express();
app.use(express.static("public"));
const PORT = process.env.PORT || 8000;
app.use(express.json());
app.listen(PORT);

const clientConfig = {
user: "postgres",
password: "mypacepostgresql",
host: "my-pace-postgresq.crw2q28qm4kh.us-east-2.rds.amazonaws.com",
port: 5432,
ssl: {
rejectUnauthorized: false,
}
};


app.get('/hello', function (req, res) {
  res.set("Content-Type", "text/plain");
  res.send('Hello World!');
});

app.get('/echo', function (req, res) {
  const value = req.query['input'];
  res.set("Content-Type", "text/plain");
  res.send(value);
});

app.get('/error', function(req, res) {
  res.set("Content-Type", "text/plain");
  res.status(400).send('Error, Bad Request!');
});

app.get('/game', async function(req, res) {
  const rank = req.query['rank'];
  const client = new Client(clientConfig);
  await client.connect();
  const result = await client.query("SELECT name, platfrom, year, genre, publisher, global_sales from video_games_sales where rank=$1", [rank]);
  if (result.rowCount < 1){
  res.status(500).send("Internal Error - No Game Found");
  } else {
    res.set("Content-Type", "application/json");
    res.send(result.rows[0]);
  }
  await client.end();

});

app.post('/game', async function (req, res) {
  // your logic to add an item to the database (use INSERT INTO sql query)
  const rank = req.body.rank;
  const name = req.body.name;
  const platfrom = req.body.platfrom;
  const year = req.body.year;
  const genre = req.body.genre;
  const publisher = req.body.publisher;
  const na_sales = req.body.na_sales;
  const eu_sales = req.body.eu_sales;
  const jp_sales = req.body.jp_sales;
  const other_sales = req.body.other_sales;
  const global_sales = req.body.global_sales;
        console.log(req.body);
  const client = new Client(clientConfig);
  await client.connect();
  const result =  await client.query("insert into video_games_sales values ($1, $2, $3, $4, $5, $6,$7, $8, $9, $10, $11)", [rank, name, platfrom,year,genre, publisher, na_sales, eu_sales, jp_sales, other>
  console.log(result);
  res.set("Content-Type", "application/json");
  res.send(result.rows[0]);
  await client.end();
});
 
app.delete('/game', async function (req, res) {
  // your logic to delete an item from the database (use DELETE sql query)
  const rank = req.query['rank'];
  const client = new Client(clientConfig);
  await client.connect();
  const result = await client.query("DELETE from video_games_sales where rank=$1", [rank]);
console.log(result);  
if (result.rowCount < 1){
  res.status(500).send("Internal Error - No Game Found");
  } else {
    res.set("Content-Type", "application/json");
    res.send(result.rows[0]);
  }
  await client.end();

});
