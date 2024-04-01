import React, { Fragment, useState } from "react";

const InputTodo = () => {

    const [description, setDescription] = useState("Input the description of your task");
    const [priority, setPriority] = useState(0);

    const onSubmitForm = async(e) => {
        e.preventDefault();
        try {
            const body = {description, priority};
            const response = await fetch("http://localhost:5000/todos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            console.log(response);
        } catch (err) {
            console.error(err.message);
        }

        window.location = "/";
    };

    return (
        <Fragment>
            <h1 className = "text-center mt-5">PERN TODO List</h1>
            <form className = "d-flex mt-5" onSubmit={onSubmitForm}>
                <input 
                    type="text" className = "form-control" 
                    value = {description} onChange={e => setDescription(e.target.value)} />
                <button className="btn btn-success">Add</button>
            </form>
        </Fragment>
    );
};

export default InputTodo;