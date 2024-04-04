const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const PORT = process.env.PORT || 5000

// middleware
app.use(cors());
app.use(express.json()); //req.body

//ROUTES//

// create a to-do

app.post("/todos", async(req, res) => {
    try {
        
        const {session, description, priority, created_time, updated_time} = req.body;
        const newTodo = await pool.query(
            "INSERT INTO todo (session_id, description, priority, created_time, updated_time) VALUES($1, $2, $3, $4, $5) RETURNING *", 
            [session, description, priority, created_time, updated_time]
        );

        res.json(newTodo.rows[0]);

    } catch (err) {
        console.error(err.message);
    }
})

// create a session

app.post("/session", async(req, res) => {
    try {
        
        const {session, date} = req.body;
        console.log(session);
        const newSession = await pool.query(
            "INSERT INTO sessions (session_id, created_time) VALUES($1, $2) RETURNING *",
            [session, date]
        );

        res.json(newSession.rows[0]);

    } catch (err) {
        console.error(err.message);
    }
})

// get all to-dos

app.get("/todos", async(req, res) => {
    try {
        
        const allTodos = await pool.query("SELECT * FROM todo;");
        res.json(allTodos.rows);

    } catch (err) {
        console.error(err.message);
    }
});

// get todos with specific session_id

app.get("/todos/:session_id", async(req, res) => {
    try {
        const {session_id} = req.params;
        const todos = await pool.query(
            "SELECT * FROM todo WHERE session_id = $1",
            [session_id]
        );
        // console.log("SELECT * FROM todo WHERE session_id = " + session_q);
        // console.log(todos);
        res.json(todos.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// get a session

app.get("/session/:session_name", async(req, res) => {
    try {
        
        const {session_name} = req.params;
        const session = await pool.query(
            "SELECT * FROM sessions WHERE session_id = $1",
            [session_name]
        );

        // console.log(session)

        if (session.rows[0] == undefined) {
            res.status(404).send('Not Found');
        } else {
            res.json(session.rows[0]);
            // console.log(session.rows[0]);
        }

    } catch (err) {
        console.error(err.message);
    }
})

// update a todo

app.put("/todos/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const {description, priority} = req.body;

        const update_todo = await pool.query(
            "UPDATE todo SET description = $1, priority = $2 WHERE todo_id = $3",
            [description, priority, id]
        );

        res.json("Todo was updated!");
    } catch (err) {
        console.error(err.message);
    }
});

// delete a todo

app.delete("/todos/:id", async(req, res) => {
    try {
        const {id} = req.params;

        const delete_todo = await pool.query(
            "DELETE FROM todo WHERE todo_id = $1", [id]
        );
        res.json("Todo was deleted!");

    } catch (err) {
        console.error(err.message);
    }
});

app.listen(PORT, () => {
    console.log("Server has started on port 5000!");
});