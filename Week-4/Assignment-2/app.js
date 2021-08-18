const http = require("http");
const express = require('express');
const app = express();

http
  .get("http://13.230.176.178:4000/api/1.0/remote-w4-data", resp => {
    let data = "";

    // A chunk of data has been recieved.
    resp.on("data", chunk => {
      data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on("end", () => {
      data = JSON.parse(data)
      console.log(data);
    });
  })
  .on("error", err => {
    console.log("Error: " + err.message);
  });

// app.get('/', (req, res) => {
//   let data = '';


//   res.send('?');
// })

// app.listen(3000);