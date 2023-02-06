import express from "express";
import userRouter from "./routers/userRouter.js";
import path from "path";
import session from "express-session";
import gokartRouter from "./routers/gokartRouter.js";
import  {Server}  from "socket.io";
import http from "http";

const app = express();

app.use(express.static("../client/public"));

app.use(session({
    secret: process.env.SECRET_SESSION,
    resave: false, 
    saveUninitialized: true,
    cookie: {secure: false}
}));

app.use(userRouter);
app.use(gokartRouter);

app.get("/signup", (req, res) => {

    res.sendFile(path.resolve("../client/public/signup.html"));
});

app.get("/login", (req, res) => {

    res.sendFile(path.resolve("../client/public/login.html"));
});

app.get("/", (req, res) => {

    if(req.session.user){

        return res.redirect("/gokart_list");
    }

    res.sendFile(path.resolve("../client/public/welcome.html"));
});


app.get("/create_gokart", (req, res) => {

    if(!req.session.user){

        return res.redirect("/login");
    }

    res.sendFile(path.resolve("../client/public/createGokart.html"));
});

app.get("/gokart_list", (req, res) => {

    if(!req.session.user){

        return res.redirect("/login");
    }

    res.sendFile(path.resolve("../client/public/gokartList.html"));
});

app.get("/update_gokart/:id", (req, res) => {

    if(!req.session.user){

        return res.redirect("/login");
    }

    res.sendFile(path.resolve("../client/public/updateGokart.html"));
});




const server = http.createServer(app);
const io = new Server(server);


io.on('connection', (socket) => {

    socket.on("update_from_client", () => {

        socket.broadcast.emit("update_from_server");
    });
});


const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {

    console.log("The server is running on port:", PORT);
});