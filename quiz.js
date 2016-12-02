/**
 * Created by solys on 02-12-2016.
 */

var express = require("express");
var app = express();
var http= require("http").Server(app);
var io = require("socket.io")(http);
var path = require("path");

var teams = [];

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/views/index.html');
});

io.on('connection', function(socket){
    socket.on('join', function(name){
        teams[socket.id] = name;
        console.log("team " + name + " joined");
    });
    socket.on("buzz", function () {
        console.log(teams[socket.id] + " buzzed in");
        io.emit('teamBuzzed',teams[socket.id]);
    });
});


http.listen(8000, function(){
    console.log("listening on 8000");
});

