import React, { Fragment } from 'react';
import './App.css';

// Components
import InputTodo from './components/InputTodo';
import ListTodo from './components/ListTodo';

const raw_link = window.location.href;
var arr = raw_link.split(":");
const link = arr[1] + ":5000";

function App() {
    console.log(link);
    return (
        <Fragment>
            <div className = "container">
                <InputTodo link = {link}/>
                <ListTodo link = {link} />
            </div>
        </Fragment>
    );
}

export default App;
