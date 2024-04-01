import React, {Fragment, useState, useEffect } from "react";
import EditTodo from './EditTodo';

const ListTodo = () => {

    const [todos, setTodos] = useState([]);

    // Delete todo
    const deleteTodo = async(id) => {
        try {
            
            const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
                method: "DELETE"
            });

            setTodos(todos.filter(todo => todo.todo_id !== id));
        } catch (err) {
            console.error(err.message);
        }
    };

    // Get all Todos
    const getTodos = async() => {
        try {
            
            const response = await fetch("http://localhost:5000/todos");

            const jsonData = await response.json();

            setTodos(jsonData);

        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getTodos();
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
                                <EditTodo todo = {todo} />
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