import React, { Fragment, useState, useEffect } from 'react';

function generateString(len) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < len) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

function StartSession({ setSessionId, link }) {

    const generateSession = async() => {
        let session = generateString(20);
        while (1) {
            let ok = 1;
            console.log(1);
            try {
                
                let new_link = link + "session/" + session;
                const cur = await fetch(`${new_link}`);
                console.log(cur);

                if (cur.status === 404) {
                    console.log(new_link);
                    ok = 0;
                    break;
                }

            } catch (err) {
                ok = 0;
                console.error(err.message);
                break;
            }
            if (ok === 0) break;
            session = generateString(20);
        }

        console.log("here");
        console.log(session);
        const date = new Date();
        
        try {
            
            const new_link = link + "session";
            const body = {session, date};
            console.log(body);
            const response = await fetch(`${new_link}`,{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            console.log(response);
            
            // useEffect(() => {
                setSessionId(session);
                let old_session = localStorage.getItem("session");
                if (old_session != "" && old_session != "No session") {
                    localStorage.removeItem("session");
                }
                localStorage.setItem("session", session);
            // }, []);
            window.location = "/";
        } catch (err) {
            console.error(err.message);
        }

    }

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

                <div className="modal-body">
                    <button type="button" className = "btn btn-primary" data-bs-dismiss="modal" onClick={() => generateSession()}>Create new session!</button>
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