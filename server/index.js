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
        
        const {description, priority} = req.body;
        const newTodo = await pool.query(
            "INSERT INTO todo (session_id, description, priority) VALUES($1, $2, $3) RETURNING *", 
            [1, description, priority]
        );

        res.json(newTodo.rows[0]);

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

// get a todo

app.get("/todos/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const todo = await pool.query(
            "SELECT * FROM todo WHERE todo_id = $1",
            [id]
        );
        res.json(todo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

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