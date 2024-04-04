import React, { Fragment, useState, useEffect } from "react";
import StartSession from './StartSession';
import JoinSession from './JoinSession';

const InputTodo = ({setSessionId, sessionId, link}) => {

    const [description, setDescription] = useState("Input the description of your task");
    const [priority, setPriority] = useState("High");

    let session = localStorage.getItem("session");
    console.log(session);

    const onSubmitForm = async(e) => {
        if (session == "No session") return;
        e.preventDefault();
        // console.log()
        try {
            let date = new Date();
            let created_time = date, updated_time = date;
            const body = {session, description, priority, created_time, updated_time};
            console.log(body);
            const new_link = link + "todos";
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
            <div className = "header d-flex align-items-center flex-row-reverse gap-3 mt-1 sessionBtn">
                <JoinSession setSessionId={setSessionId} link = {link} />
                <StartSession setSessionId={setSessionId} link = {link} />
                <div>
                    Your session ID: <b>{session}</b>
                </div>
            </div>
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