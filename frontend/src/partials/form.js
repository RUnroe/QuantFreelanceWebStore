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
                <label className="input-label file-input btn blue"> Upload Image
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
                <input type="text" className="input" id="identifierInput" name="identifier" ref={identifier}/>
            </div>
            <div className="form-block">
                <label htmlFor="passwordInput" className="input-label">Password</label>
                <input type="password"className="input" id="passwordInput" name="password" ref={password}/>
            </div>
            <span id="loginErrorMsg" className="error-message">Username / email or password is wrong</span>
            <button type="submit" className="btn blue">Log In</button>
        </form>
        );
    }
    else {
        return (
        <form id="form" method="POST" onSubmit={postLogin}>
            <div className="form-block">
                <label htmlFor="identifierInput" className="input-label">Username or Email</label>
                <input type="text" className="input" id="identifierInput" name="identifier" ref={identifier}/>
            </div>
            <div className="form-block">
                <label htmlFor="passwordInput" className="input-label">Password</label>
                <input type="password" className="input" id="passwordInput" name="password" ref={password}/>
            </div>
            <button type="submit" className="btn blue">Log In</button>
        </form>
        );
    }
}


function SignupForm({isSeller, icon_id}) {
    const [email, setEmail] = useState();
    const [username, setUsername] = useState();
    const [first_name, setFirstName] = useState();
    const [last_name, setLastName] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    let timer;

    const [errors, setErrors] = useState({
        email: false,
        username: false,
        first_name: false,
        last_name: false,
        password: false,
        confirmPassword: false
    });
    
    const checkCredentials = () => {
        const credentials = {
            email,
            username
        };
        fetch("/api/user/check", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            })
            .then(response => response.json())
            .then(data => {
                const tempErrors = Object.assign(errors);
                if(data.email) tempErrors.email = "Email is already in use. Please use another email.";
                if(data.username) tempErrors.username = "Username is already in use. Please use another username.";
                setErrors(tempErrors);
            });
    }
    useEffect(() => {
        if(timer) clearTimeout(timer);
        timer = setTimeout(() => {
            checkCredentials();
        }, 1000);
    }, [username, email]);

    const validateForm = () => {

    }
    const postToSignUp = (event) => {
        event.preventDefault();
        console.log("post");
    }

    return (
        <form method="POST" onSubmit={event => postToSignUp(event)}>
            <div className="form-block">
                <label htmlFor="emailInput" className="input-label">Email</label>
                <input type="text" className="input" id="emailInput" onInput={(event) => setEmail(event.target.value)} value={email} />
                <span className={`error-message ${errors["email"] ? "" : "hidden"}`}>{errors["email"].toString()}</span>
            </div>
            <div className="form-block">
                <label htmlFor="usernameInput" className="input-label">Username</label>
                <input type="text" className="input" id="usernameInput" onInput={(event) => setUsername(event.target.value)} value={username} />
                <span className={`error-message ${errors["email"] ? "" : "hidden"}`}>{errors["username"].toString()}</span>
            </div>
            
            <button className="btn blue center" type="submit">Create Account</button>
        </form>
    );
}




export {
    ImageForm,
    LogInForm,
    SignupForm
} 