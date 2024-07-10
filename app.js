const express = require('express');
const app = express();
const path = require("path");

//socket io boiler plate (6-9)
const http = require("http");
const socketio = require("socket.io");
const server = http.createServer(app);
const io = socketio(server);

app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));

io.on("connection", function(socket){
    socket.on("send-location", function (data){
        io.emit("recieve-location", {id:socket.id, ...data });
    });
    socket.on("disconnect",function(){
        io.emit("user-disconnected", socket.id);
    });
});

app.get("/", function(req, res){
    res.render("index");
});

server.listen(3000);