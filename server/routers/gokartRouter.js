import  express  from "express";
import db from "../database/create-connection.js";

const router = express.Router();
router.use(express.json());

// POST

router.post("/api/gokart" , (req, res) => {

    if(!req.session.user){
        return res.status(500).send({message: "Failed: Must be logged in"})
    }

    const {driver, age, cc, bestLabTime, totalTime, pitstops} = req.body;

    const sqlQuery = "INSERT INTO gokarts (driver, age, cc, best_lab_time, total_time, pitstops) VALUES (?, ?, ?, ?, ?, ?)";
    
    db.query(sqlQuery, [driver, age, cc, bestLabTime, totalTime, pitstops], (error, result) => {

        if(error){

            return res.status(500).send({message: error.sqlMessage});
    
        }
        res.status(201).send({message: "Successful creation"});
    });
});


router.get("/api/gokart" , (req, res) => {

    if(!req.session.user){
        return res.status(500).send({message: "Failed: Must be logged in"})
    }

    const sqlQuery = "SELECT * FROM gokarts";

    db.query(sqlQuery,[], (error, result) => {

        const gokarts = [...result];

        if(error){

            return res.status(500).send({message: error.sqlMessage});
    
        }
       // res.status(200).send({gokarts});
        res.status(200).send({gokarts: gokarts});
    })
});

// Get one gokart by id
router.get("/api/one_gokart/:id", (req, res) => {

    if(!req.session.user){
        return res.status(500).send({message: "Failed: Must be logged in"})
    }

    const {id} = req.params;

    const sqlQuery = "SELECT * FROM gokarts WHERE id=?";

    db.query(sqlQuery,[id], (error, result) => {

        

        if(error){

            return res.status(500).send({message: error.sqlMessage});
        }

        const gokart = result[0];

        res.status(200).send({gokart: gokart});
    })

});
// Update gokart

router.put("/api/gokart", (req, res) => {
    
    if(!req.session.user){
        return res.status(500).send({message: "Failed: Must be logged in"})
    }

    const {id, driver, age, cc, bestLabTime, totalTime, pitstops} = req.body;

    const sqlQuery = "UPDATE gokarts SET  driver=?, age=?, cc=?, best_lab_time=?, total_time=?, pitstops=? WHERE id=?";

    db.query(sqlQuery,[driver, age, cc, bestLabTime, totalTime, pitstops, id], (error, result) => {

        if(error){

            return res.status(500).send({message: error.sqlMessage});
    
        }
        res.status(200).send({message: "Successful update"});

    })
});


router.delete("/api/gokart/:id", (req, res) => {

    if(!req.session.user){
        return res.status(500).send({message: "Failed: Must be logged in"})
    }

    const {id} = req.params;

    const sqlQuery = "DELETE FROM gokarts WHERE id=?";
     
    db.query(sqlQuery,[id], (error, result) => {

        if(error){

            return res.status(500).send({message: error.sqlMessage});
    
        }
        res.status(200).send({message: "Successful delete"});
    })
});

export default router;