import React, {Fragment, useState, useEffect } from "react";
import EditTodo from './EditTodo';

const ListTodo = ({setSessionId, sessionId, link}) => {

    const [todos, setTodos] = useState([]);

    // Delete todo
    const deleteTodo = async(id) => {
        try {
            
            const new_link = link + "todos";
            console.log(new_link);
            const deleteTodo = await fetch(`${new_link}/${id}`, {
                method: "DELETE"
            });

            setTodos(todos.filter(todo => todo.todo_id !== id));
        } catch (err) {
            console.error(err.message);
        }
    };

    // Get all Todos
    const getTodos = async(session) => {
        // console.log(link + "todos");
        if (session == "No session") return;
        try {
            
            const new_link = link + "todos/" + session;
            console.log(new_link);
            const response = await fetch(`${new_link}`);

            const jsonData = await response.json();

            setTodos(jsonData);
            console.log(jsonData);

            // window.location = "/";

        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        let session = localStorage.getItem("session");
        getTodos(session);
    }, []);

    return (
        <Fragment>
            {"  "}
            <table className="table table-hover mt-5">
                <thead>
                <tr>
                    <th>Description</th>
                    <th>Priority</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                    {todos.map(todo => (
                        <tr key = {todo.todo_id}>
                            <td>{todo.description}</td>
                            <td>{todo.priority}</td>
                            <td>
                                <EditTodo todo = {todo} link = {link} />
                            </td>
                            <td>
                                <button className = "btn btn-danger" onClick={() => deleteTodo(todo.todo_id)} >Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Fragment>
    );
};

export default ListTodo;