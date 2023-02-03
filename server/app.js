import express from "express";
import userRouter from "./routers/userRouter.js";
import path from "path";
import session from "express-session";
import gokartRouter from "./routers/gokartRouter.js";
import  {Server}  from "socket.io";
import http from "http";





const app = express();



/*
//socket io

const server = http.createServer(app);

import cors from "cors";
app.use(cors({ credentials: true, origin: true }));

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000"
    }
});

io.on("connection", socket => {
    socket.on("update from client", () => {
        socket.broadcast.emit("update from server")
        console.log(socket,"waazzaa")
    });

});



//socket io
*/


app.use(express.static("../client/public"));

app.use(session({
    secret: process.env.SECRET_SESSION,
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false}
}))

app.use(userRouter);
app.use(gokartRouter);

app.get("/signup", (req, res) => {

    res.sendFile(path.resolve("../client/public/signup.html"));

});

app.get("/login", (req, res) => {

    res.sendFile(path.resolve("../client/public/login.html"));

});

app.get("/", (req, res) => {
    res.sendFile(path.resolve("../client/public/index.html"));
});

//Gokart

app.get("/create_gokart", (req, res) => {
    res.sendFile(path.resolve("../client/public/createGokart.html"))
});

app.get("/gokart_list", (req, res) => {
    res.sendFile(path.resolve("../client/public/gokartList.html"))
});

app.get("/update_gokart/:id", (req, res) => {
    console.log(req.params.id);
    res.sendFile(path.resolve("../client/public/updateGokart.html"))
});



/*
const server = http.createServer(app);
const io = new Server(server);

app.get('/gokart_list', (req, res) => {

    
    res.sendFile("C:/Users/Bruger/Desktop/NodeJS/nodejs0223/client/public/gokartList.html");
  });
  
  io.on('connection', (socket) => {
    console.log('a user connected');
  });
  
  server.listen(3000, () => {
    console.log('listening on *:3000');
  });
*/


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log("The server is running on port:", PORT)
});
