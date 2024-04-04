import React, { Fragment, useState } from 'react';

function JoinSession({ link, setSessionId }) {
    const [session, setSession] = useState("Please, enter your session ID");

    const joinSession = async() => {
        
        console.log("I am here");
        try {
            
            let new_link = link + "session/" + session;
            const cur = await fetch(`${new_link}`);
            console.log(cur);

            if (cur.status !== 404) {
                setSessionId(session);
                let old_session = localStorage.getItem("session");
                if (old_session != "" && old_session != "No session") {
                    localStorage.removeItem("session");
                }
                localStorage.setItem("session", session);
            } else {
                alert("Sorry! Such session was not found!");
                console.log("NO!");
            }
            window.location = "/";  

        } catch (err) {
            console.error(err.message);
        }
    } 

    return (
        <Fragment>
            <button type="button" className="btn btn-light sessionbtns" data-bs-toggle="modal" data-bs-target={`#SessionModal2`}>
                Join the existing session
            </button>

            <div className="modal" id={`SessionModal2`} >
            <div className="modal-dialog">
                <div className="modal-content">

                <div className="modal-header">
                    <h4 className="modal-title">Create new session</h4>
                    <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                </div>

                <div className="modal-body">
                    <form className = "d-flex gap-3">
                        <input className = "form-control" type = "text" value = {session} onChange={e => setSession(e.target.value)} />
                        <button type="button" className = "btn btn-primary" data-bs-dismiss="modal" onClick = {() => joinSession()}>Join</button>
                    </form>
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

export default JoinSession;