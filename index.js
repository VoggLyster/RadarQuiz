/**
 * Created by solys on 02-12-2016.
 */

var app = require("express")();
var http= require("http").Server(app);
var io = require("socket.io")(http);

var teams = [];

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    socket.on('join', function(name){
        teams[socket.id] = name;
        console.log("team " + name + " joined");
    });
    socket.on("buzz", function () {
        console.log(teams[socket.id] + " buzzed in");
    });
});


http.listen(8000, function(){
    console.log("listening on 8000");
});

