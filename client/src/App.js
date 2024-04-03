import React, { Fragment, useState } from 'react';
import './App.css';

// Components
import InputTodo from './components/InputTodo';
import ListTodo from './components/ListTodo';

const link = "https://pern-todo-0cb4.onrender.com/";
// const link = "http://localhost:5000/"

let ok = 0;

function App() {
    const [sessionId, setSessionId] = useState("No session");
    console.log(link);
    if (!ok) {
        setSessionId("armashka");
        ok = 1;
    }
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
