let express = require("express");

let app = express();

let http = require("http").Server(app);

let io = require("socket.io")(http);


let randomMessages = ["That's a fo' sho right on", "Uh haha you know that's right", "I'm so lonely...", "I'm on that sigma male grindset"];

app.get("/", (req, res)=> {
    res.sendFile(__dirname+"/index.html");
});

io.on("connection",(socket)=> {
    console.log("Client connected");
    // receive the message from client application 
    socket.on("obj",(msg)=> {
        console.log(msg);
    })

    // sending data to client 
    socket.emit("obj1","Hello Client connected server...");
    socket.on("msg", (result) => {
        console.log(`Client ${result.name} says: ${result.message}`);
        socket.emit("msg1", randomMessages[Math.floor(Math.random() * randomMessages.length)]);
    });
});


// please run the server using http module not express module 
http.listen(9090,()=>console.log("Server running on port number 9090"));