import React, { Fragment, useState } from 'react';

const EditTodo = ({ todo }) => {
    const [description, setDescription] = useState(todo.description);
    const [priority, setPriority] = useState(todo.priority);

    const editTodo = async() => {
        try {
            
            const body = {description, priority};
            const editTodo = await fetch(`http://localhost:5000/todos/${todo.todo_id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            window.location = "/";

        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <Fragment>
            <button type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target={`#Modal${todo.todo_id}`}>
                Edit
            </button>

            <div className="modal" id={`Modal${todo.todo_id}`} >
            <div className="modal-dialog">
                <div className="modal-content">

                <div className="modal-header">
                    <h4 className="modal-title">Edit the task</h4>
                    <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                </div>

                <div className="modal-body d-flex gap-2">
                    <input 
                        type="text" className = "form-control" 
                        value = {description} 
                        onChange={e => setDescription(e.target.value)} 
                        />
                    <select id = "priorities" value = {priority} onChange={e => setPriority(e.target.value)}>
                        <option value = "High" > High </option>
                        <option value = "Mid" > Mid </option>
                        <option value = "Low" > Low </option>
                    </select>
                </div>

                <div className="modal-footer">
                     <button className="btn btn-warning" onClick = {() => editTodo() } >Edit</button>
                    <button type="button" className="btn btn-danger" data-bs-dismiss="modal" >Close</button>
                </div>

                </div>
            </div>
            </div>
        </Fragment>
    );
}

export default EditTodo;