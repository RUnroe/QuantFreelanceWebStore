import { createRef, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";

function ImageForm({labelName}) {
    const image = createRef();

    const postIcon = event => {
        event.preventDefault();
        const formData = new FormData();
        console.log(image.current.files[0]);
        formData.append('icon', image.current.files[0]);
        fetch('/api/icons', {
            method: 'POST',
            body: formData
        }).then(response => response.json())
        .then(data => console.log(data));
    }
    return (
        <form id="form" method="POST" onSubmit={postIcon}>
            <div className="form-block">
                <label className="input-label">{labelName}</label>
                <label className="input-label file-input btn btn-blue"> Upload Image
                    <input id="imageInput" ref={image} type="file" name="newIcon" accept="image/png, image/jpeg, image/jpg, image/svg" />
                </label>
                <span id="imageErrorMsg" className="error-message hidden">Incorrect file type</span>
            </div>
            <button type="submit">Submit</button>
        </form>
    );
}

function LogInForm({checkAuth}) {
    const [pageState, setPageState] = useState("");
    const identifier = createRef();
    const password = createRef();

    const postLogin = event => {
        event.preventDefault();
        const postData = {
            identifier: identifier.current.value,
            password: password.current.value
        }
        fetch("/api/auth", {
            method: 'POST', 
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        }).then( response => {
            console.log(response);
            if(response.ok)  {
                checkAuth();
                setPageState("success");
            }
            else setPageState("error");
        });
    }
    
    useEffect(() => {

    }, [pageState]);

    if(pageState === "success") {
        return <Redirect to={{pathname: '/'}} />;
    }
    else if(pageState === "error") {
        return (
        <form id="form" method="POST" onSubmit={postLogin}>
            <div className="form-block">
                <label htmlFor="identifierInput" className="input-label">Username or Email</label>
                <input type="text" id="identifierInput" name="identifier" ref={identifier}/>
            </div>
            <div className="form-block">
                <label htmlFor="passwordInput" className="input-label">Password</label>
                <input type="password" id="passwordInput" name="password" ref={password}/>
            </div>
            <span id="loginErrorMsg" className="error-message">Username / email or password is wrong</span>
            <button type="submit">Log In</button>
        </form>
        );
    }
    else {
        return (
        <form id="form" method="POST" onSubmit={postLogin}>
            <div className="form-block">
                <label htmlFor="identifierInput" className="input-label">Username or Email</label>
                <input type="text" id="identifierInput" name="identifier" ref={identifier}/>
            </div>
            <div className="form-block">
                <label htmlFor="passwordInput" className="input-label">Password</label>
                <input type="password" id="passwordInput" name="password" ref={password}/>
            </div>
            <button type="submit">Log In</button>
        </form>
        );
    }
}





export {
    ImageForm,
    LogInForm
} 