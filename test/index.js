const express = require("express");

const app = express()


const http = require("http").Server(app);
const port = process.env.PORT || 3000;
app.use(require('cors')())

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

const io = require("socket.io")(http,{            
    cors: {
      origin: '*',
    }
});


io.on("connection", (socket)=>{
    console.log("user connected");
    socket.on("chat_message", function(data) {
        // data.username = this.username;
        socket.broadcast.emit("chat_message", data);
    });
})


http.listen(port, function() {
    console.log("Listening on :" + port);
});