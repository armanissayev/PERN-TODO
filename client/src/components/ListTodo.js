import React, {Fragment, useState, useEffect } from "react";

const ListTodo = () => {
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
                    
                </tbody>
            </table>
        </Fragment>
    );
};

export default ListTodo;