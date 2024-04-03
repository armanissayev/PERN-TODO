import React, { Fragment } from 'react';
import './App.css';

// Components
import InputTodo from './components/InputTodo';
import ListTodo from './components/ListTodo';

const link = "https://pern-todo-0cb4.onrender.com/";

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
