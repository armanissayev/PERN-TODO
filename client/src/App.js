import React, { Fragment } from 'react';
import './App.css';

// Components
import InputTodo from './components/InputTodo';
import ListTodo from './components/ListTodo';

const link = "https://pern-todo-five.vercel.app/";

function App() {
    return (
        <Fragment>
            <div className = "container">
                <InputTodo />
                <ListTodo />
            </div>
        </Fragment>
    );
}

export default App;
