import React, { Fragment, useState } from 'react';

function StartSession({ setSessionId }) {
    return (
        <Fragment>
            <button type="button" className="btn btn-light sessionbtns" data-bs-toggle="modal" data-bs-target={`#SessionModal1`}>
                Create new session
            </button>

            <div className="modal" id={`SessionModal1`} >
            <div className="modal-dialog">
                <div className="modal-content">

                <div className="modal-header">
                    <h4 className="modal-title">Create new session</h4>
                    <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                </div>

                <div className="modal-body d-flex gap-2">
                    <button className = "btn btn-primary">Create new session!</button>
                </div>

                <div className="modal-footer">
                    <button type="button" className="btn btn-danger" data-bs-dismiss="modal" >Close</button>
                </div>

                </div>
            </div>
            </div>
        </Fragment>
    );
}

export default StartSession;