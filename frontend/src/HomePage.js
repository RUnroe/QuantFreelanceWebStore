import React, { createRef, useState } from "react";
export default function HomePage() {
    const firstName = createRef();
    const logIn = () => {
        const data = {
            identifier: "RUnroe",
            password: "1234aaAb"
        }
        fetch("/api/auth", {
            method: 'POST', 
            credentials: 'include',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then( response => console.log(response));
    }
    const updateUser = () => {
        const data = {first_name: firstName.current.value};
        console.log(data);
        fetch("/api/user", {
            method: 'PUT', 
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then( response => console.log(response));
    }
    return(
        <div className="section">
            <h1>Home</h1>
            <button onClick={logIn}>Log In</button>
            <input type="text" ref={firstName} placeholder="First Name" />
            <button onClick={updateUser}> Update User</button>
        </div>
    );

}