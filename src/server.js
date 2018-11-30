var express = require('express')  
var app = express();
var server = require('http').Server(app)
var io = require('socket.io')(server)
var path = require('path')

const {initSession, askAgent} = require("./js/index.js")
const port = 3000

app.use(express.static(__dirname))

server.listen(port,() => console.log(`App loading on localhost:${port}`));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/html/index.html'))
})

io.on('connection', function (socket) {
    const {sessionClient, sessionPath} = initSession();
    
    socket.on('chat message', function(msg){
      console.log('message: ' + msg);
      askAgent(msg, sessionClient, sessionPath)
        .then((res, err) => {
          return socket.emit('chat message', res)
        })
        .catch(console.log('An error happened'))
    });
    
    
    socket.on('disconnect', () => {
      console.log("user disconnected")
    })
});



