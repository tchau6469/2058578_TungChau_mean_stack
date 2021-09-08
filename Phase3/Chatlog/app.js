
let app = require("express")();
let http = require("http").Server(app);
let io = require("socket.io")(http);
let mongoClient = require("mongodb").MongoClient;

let url = "mongodb://localhost:27017";

var db;

mongoClient.connect(url, (err, client) => {
    if (err) console.log(err);
    else {
        db = client.db("tcsmean");
        console.log("connected to database");
    }
})

app.get("/", (req,res) => {
    res.sendFile(__dirname + "/index.html");
})

io.on("connection", (socket) => {
    console.log("Client connected");
    socket.on("obj", msg => {
        console.log(msg);
    });

    socket.emit("obj1","Hello, Client connected to server...");

    socket.on("msg", (message) => {
        console.log(message);
        db.collection("Messages").insertOne(message, (err, result) =>{
            if (!err) console.log("Message stored successfully");
            else console.log(err);
        })
     })
})

http.listen(9090, ()=>console.log("server running on port 9090"));