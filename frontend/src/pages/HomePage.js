import React, { createRef, useState } from "react";
import {ImageInput} from "./../partials/form";

export default function HomePage() {
    const firstName = createRef();
    const logIn = () => {
        const data = {
            identifier: "RUnroe",
            password: "1234aaAb"
        }
        fetch("/api/auth", {
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
        fetch("/api/user", {
            method: 'PUT',
            credentials: 'include', 
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then( response => console.log(response));
    }

    const postIcon = event => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('icon', document.getElementById("iconInput").files[0]);
        fetch('/api/icons', {
            method: 'POST',
            body: formData
        }).then(response => response.json())
        .then(data => console.log(data));
    }
    return(
        <div className="section">
            <h1>Home</h1>
            <button onClick={logIn}>Log In</button>
            <input type="text" ref={firstName} placeholder="First Name" />
            <button onClick={updateUser}> Update User</button>
            <form id="form" method="POST" onSubmit={postIcon}>
                <ImageInput />
                <button type="submit">Submit</button>
            </form>
        </div>
    );

}