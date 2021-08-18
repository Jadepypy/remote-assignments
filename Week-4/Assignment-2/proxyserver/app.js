const http = require("http");
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  http
  .get("http://13.230.176.178:4000/api/1.0/remote-w4-data", resp => {
    let data = "";

    resp.on("data", chunk => {
      data += chunk;
    });

    resp.on("end", () => {
      data = JSON.parse(data);
      res.send(data);
    });
  })
  .on("error", err => {
    console.log("Error: " + err.message);
  });
})

app.listen(3000);