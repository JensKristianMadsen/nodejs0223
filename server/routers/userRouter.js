import  express  from "express";
import db from "../database/create-connection.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();
//Omdanner fra string til Number
const saltRounds = Number(process.env.SALT_ROUNDS);

const router = express.Router();

router.use(express.json());

//POST
router.post("/api/signup", async (req, res) => {
    //destructuring
    const {username, email, password} = req.body;

    const passwordHash = await bcrypt.hash(password, saltRounds);

    const sqlQuery = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";

    db.query(sqlQuery, [username, email, passwordHash], (error, result) => {

        if(error){

            return res.status(500).send({message: error.sqlMessage});
        }

        res.status(201).send({message: "User is signed up"});
    });
});

//POST
router.post("/api/login", (req, res) => {

    const {email, password} = req.body;

    const sqlQuery = "SELECT * FROM users WHERE email = ?";

    db.query(sqlQuery, [email], async (error, result) => {

        if(error){

            return res.status(500).send({message: error.sqlMessage});

        }else if(result.length == 0){

            return res.status(400).send({message: "Incorrect email"});
        }

        const passwordHash = result[0].password;

        if(!await bcrypt.compare(password, passwordHash)){

            return res.status(400).send({message: "Incorrect password"});
        }

        const {id, username, email} = result[0];

        req.session.user = {id, username, email};
        
        res.status(200).send(req.session.user);
    });
});

//GET //Logout
router.get("/api/logout", (req, res) => {

    if(!req.session.user){
    
        return res.status(400).send({message: "Logout failed: Must be logged in"});
    }

    delete req.session.user;

    res.status(200).send({message: "Logout succeded"});
});

export default router;