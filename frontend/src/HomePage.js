import React, { createRef, useState } from "react";
export default function HomePage() {
    const firstName = createRef();
    const logIn = () => {
        const data = {
            identifier: "RUnroe",
            password: "1234aaAb"
        }
        fetch("http://localhost:3005/api/auth", {
            method: 'POST', 
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then( response => console.log(response));
    }
    const updateUser = () => {
        const data = {first_name: firstName.current.value};
        console.log(data);
        fetch("http://localhost:3005/api/user", {
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