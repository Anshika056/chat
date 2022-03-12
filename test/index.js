const express = require("express");

const app = express()

const http = require("http").Server(app);
const port = process.env.PORT || 3000;

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

http.listen(port, function() {
    console.log("Listening on :" + port);
});