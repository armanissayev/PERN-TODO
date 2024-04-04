import React, { Fragment, useState, useEffect } from 'react';
import './App.css';

// Components
import InputTodo from './components/InputTodo';
import ListTodo from './components/ListTodo';

const link = "https://pern-todo-0cb4.onrender.com/";
// const link = "http://localhost:5000/"

let ok = 0;

function App() {
    const [sessionId, setSessionId] = useState("No session");

    const check = async(session) => {
        let ok = 0;
        try {
            
            let new_link = link + "session/" + session;
            const cur = await fetch(`${new_link}`);

            if (cur.status !== 404) {
                ok = true;
            } else {
                ok = false;
            }

        } catch (err) {
            console.error(err.message);
        }
        return ok;
    };

    useEffect(() => {
        let cur = localStorage.getItem("session");

        if (cur != "" && cur != "No session" && check(cur) == true) {
            setSessionId(cur);
        }
    }, []);

    console.log(link);
    // useEffect(() => {
    //     if (ok === 0) {
    //         setSessionId("gay");
    //         ok = 1;
    //     }        
    // }, []);
    return (
        <Fragment>
            <div className = "container">
                <InputTodo setSessionId = {setSessionId} sessionId = {sessionId} link = {link}/>
                <ListTodo setSessionId = {setSessionId} sessionId = {sessionId} link = {link} />
            </div>
        </Fragment>
    );
}

export default App;
