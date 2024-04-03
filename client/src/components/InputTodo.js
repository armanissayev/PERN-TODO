import React, { Fragment, useState } from "react";

const InputTodo = ({link}) => {

    const [description, setDescription] = useState("Input the description of your task");
    const [priority, setPriority] = useState("High");

    const onSubmitForm = async(e) => {
        e.preventDefault();
        try {
            const body = {description, priority};
            console.log(body);
            const new_link = link + "/todos";
            console.log(new_link);
            const response = await fetch(`${new_link}`, {
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
            <form className = "d-flex mt-5 gap-3" onSubmit={onSubmitForm}>
                <input 
                    type="text" className = "form-control" 
                    value = {description} onChange={e => setDescription(e.target.value)} />

                {/* <input list = "priorities" /> */}
                <select  id = "priorities" value = {priority} onChange={e => setPriority(e.target.value)}>
                    <option value = "High" > High </option>
                    <option value = "Mid" > Mid </option>
                    <option value = "Low" > Low </option>
                </select>
                <button className="btn btn-success">Add</button>
            </form>
        </Fragment>
    );
};

export default InputTodo;