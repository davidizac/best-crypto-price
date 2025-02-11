const express = require('express');
const app = express()
let http = require('http').Server(app);
let io = require('socket.io')(http);
const getBestTickers = require('./get-best-ticker')
const bodyParser = require("body-parser");
const path = require('path')
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Methods",
      "PUT, GET, POST, DELETE, OPTIONS, PATCH"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Expose-Headers", "Authorization");
    if (req.method === "OPTIONS") {
      return res.sendStatus(200);
    }
    next();
  });


  app.use(
    bodyParser.urlencoded({
      extended: false
    })
  );
  app.use(bodyParser.json());

// io.on('connection', (socket) => {

//     // Log whenever a user connects
//     console.log('user connected');

//     // Log whenever a client disconnects from our websocket server
//     socket.on('disconnect', function(){
//         console.log('user disconnected');
//     });

//     socket.on('sendSymbol', async (symbol) => {
//         const bestTickers = await getBestTickers(symbol)
//         io.emit('bestTicker', bestTickers);   
//     });

//     // When we receive a 'message' event from our client, print out
//     // the contents of that message and then echo it back to our client
//     // using `io.emit()`
//     socket.on('message', (message) => {
//         console.log("Message Received: " + message);
//         io.emit('message', {type:'new-message', text: message});    
//     });
// });

app.use(express.static(path.join(__dirname, './dist')))

app.get('/:symbol/:symbol2', async (req,res) => {
    try{
        const bestTickers = await getBestTickers(`${req.params.symbol}/${req.params.symbol2}`)
        res.json(bestTickers)
    } catch(err){
        console.log(err)
        res.status(500).send()
    }
    
})

// Initialize our websocket server on port 5000
http.listen(3000, () => {
    console.log('started on port 3000');
});