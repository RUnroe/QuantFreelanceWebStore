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
            <p id="loginErrorMsg" className="error-message text-center">Username / email or password is wrong</p>
            <button type="submit" className="btn blue center">Log In</button>
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
            <button type="submit" className="btn blue center">Log In</button>
        </form>
        );
    }
}

//React hates me so I have to use this force update hook to actually rerender on state change
function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update the state to force render
}

function SignupForm({checkAuth, is_seller, icon_id}) {
    const forceUpdate = useForceUpdate();

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [redirect, setRedirect] = useState(false);

    let timer;

    const [errors, setErrors] = useState({
        email: "",
        username: "",
        first_name: "",
        last_name: "",
        password: "",
        confirmPassword: ""
    });
    
    const checkCredentials = () => {
        if(email.length || username.length) {
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
                // console.log(data);
                const tempErrors = errors;
                if(data.email) tempErrors.email = "Email is already in use. Please use another email.";
                if(data.username) tempErrors.username = "Username is already in use. Please use another username.";
                setErrors(tempErrors);
                forceUpdate();
            });
        }
    }
    useEffect(() => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            checkCredentials();
        }, 1000);
    }, [username, email]);

    useEffect(() => {
        forceUpdate();
    }, [errors]);


    const validateForm = () => {
        const newErrors = {
            email: validate(email, "email"),
            username: validate(username, "username"),
            first_name: validate(first_name, "name"),
            last_name: validate(last_name, "name"),
            password: validate(password, "password"),
            confirmPassword: confirmPasswords(password, confirmPassword)
        }
        setErrors(newErrors);
    }

    const hasErrors = () => {
        let hasErrors = false;
        Object.values(errors).forEach(errorMsg => {
            if(errorMsg.length) hasErrors = true;
        });
        return hasErrors;
    }
    const postToSignUp = (event) => {
        event.preventDefault();
        validateForm();
        if(!hasErrors()) {
            //If there are not any errors, post to backend
            const userData = {
                email,
                username,
                first_name,
                last_name,
                password,
                is_seller,
                icon_id
            }
            fetch("/api/user", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                    },
                body: JSON.stringify(userData)
            })
            .then(response => {
                if(response.ok) {
                    checkAuth();
                    setRedirect(true);
                }
            });


        }
    }
    if(redirect) return <Redirect to={{pathname: '/'}}/>;
    return (
        <form method="POST" onSubmit={event => postToSignUp(event)}>
            <div className="form-block">
                <label htmlFor="emailInput" className="input-label">Email</label>
                <input type="email" className="input" id="emailInput" onInput={(event) => setEmail(event.target.value)} value={email} />
                <span className={`error-message ${errors.email.length ? "" : "hidden"}`}>{errors.email.toString()}&nbsp;</span>
            </div>
            <div className="form-block">
                <label htmlFor="usernameInput" className="input-label">Username</label>
                <input type="text" className="input" id="usernameInput" onInput={(event) => setUsername(event.target.value)} value={username} />
                <span className={`error-message ${errors.username.length ? "" : "hidden"}`}>{errors.username.toString()}&nbsp;</span>
            </div>
            <div className="form-block">
                <label htmlFor="firstNameInput" className="input-label">First Name</label>
                <input type="text" className="input" id="firstNameInput" onInput={(event) => setFirstName(event.target.value)} value={first_name} />
                <span className={`error-message ${errors.first_name.length ? "" : "hidden"}`}>{errors.first_name.toString()}&nbsp;</span>
            </div>
            <div className="form-block">
                <label htmlFor="lastNameInput" className="input-label">Last Name</label>
                <input type="text" className="input" id="lastNameInput" onInput={(event) => setLastName(event.target.value)} value={last_name} />
                <span className={`error-message ${errors.last_name.length ? "" : "hidden"}`}>{errors.last_name.toString()}&nbsp;</span>
            </div>
            <div className="form-block">
                <label htmlFor="passwordInput" className="input-label">Password</label>
                <input type="password" className="input" id="passwordInput" onInput={(event) => setPassword(event.target.value)} value={password} />
                <span className={`error-message ${errors.password.length ? "" : "hidden"}`}>{errors.password.toString()}&nbsp;</span>
            </div>
            <div className="form-block">
                <label htmlFor="confirmPasswordInput" className="input-label">Confirm Password</label>
                <input type="password" className="input" id="confirmPasswordInput" onInput={(event) => setConfirmPassword(event.target.value)} value={confirmPassword} />
                <span className={`error-message ${errors.confirmPassword.length ? "" : "hidden"}`}>{errors.confirmPassword.toString()}&nbsp;</span>
            </div>
            
            <button className="btn blue center" type="submit">Create Account</button>
        </form>
    );
}






function AccountSettingsForm({checkAuth, icon_id, userData}) {
    const forceUpdate = useForceUpdate();

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [redirect, setRedirect] = useState(false);

    const [accountPageUsername, setAccountPageUsername] = useState();

    let timer;
    const [errors, setErrors] = useState({
        username: "",
        first_name: "",
        last_name: ""
    });
    
    const checkCredentials = () => {
        if(email.length || username.length) {
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
                // console.log(data);
                const tempErrors = errors;
                if(data.email) tempErrors.email = "Email is already in use. Please use another email.";
                if(data.username) tempErrors.username = "Username is already in use. Please use another username.";
                setErrors(tempErrors);
                forceUpdate();
            });
        }
    }
    useEffect(() => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            checkCredentials();
        }, 1000);
    }, [username, email]);

    useEffect(() => {
        forceUpdate();
    }, [errors]);

    useEffect(() => {
        setEmail(userData.email);
        setUsername(userData.username);
        setFirstName(userData.first_name);
        setLastName(userData.last_name);
    }, []);

    const validateForm = () => {
        const newErrors = {
            username: validate(username, "username"),
            first_name: validate(first_name, "name"),
            last_name: validate(last_name, "name"),
        }
        setErrors(newErrors);
        return newErrors;
    }

    const hasErrors = (errors) => {
        let hasErrors = false;
        Object.values(errors).forEach(errorMsg => {
            if(errorMsg.length) hasErrors = true;
        });
        return hasErrors;
    }
    const postToUpdate = (event) => {
        event.preventDefault();
        const errors = validateForm();
        if(!hasErrors(errors)) {
            //If there are not any errors, post to backend
            const userData = {
                username,
                first_name,
                last_name,
                icon_id
            }
            fetch("/api/user", {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                    },
                body: JSON.stringify(userData)
            })
            .then(response => {
                if(response.ok) {
                    checkAuth();
                    console.log(response, username);
                    setAccountPageUsername(username);
                    //setRedirect(true);
                }
            });


        }
    }
    if(redirect) return <Redirect to={{pathname: `/account/${accountPageUsername}`}}/>;
    return (
        <form method="POST" onSubmit={event => postToUpdate(event)}>
            <div className="form-block">
                <label htmlFor="emailInput" className="input-label">Email</label>
                <input type="email" className="input disabled" id="emailInput" onInput={(event) => setEmail(event.target.value)} value={email} disabled/>
                <span className="error-message hidden">&nbsp;</span>
            </div>
            <div className="form-block">
                <label htmlFor="usernameInput" className="input-label">Username</label>
                <input type="text" className="input" id="usernameInput" onInput={(event) => setUsername(event.target.value)} value={username} />
                <span className={`error-message ${errors.username.length ? "" : "hidden"}`}>{errors.username.toString()}&nbsp;</span>
            </div>
            <div className="form-block">
                <label htmlFor="firstNameInput" className="input-label">First Name</label>
                <input type="text" className="input" id="firstNameInput" onInput={(event) => setFirstName(event.target.value)} value={first_name} />
                <span className={`error-message ${errors.first_name.length ? "" : "hidden"}`}>{errors.first_name.toString()}&nbsp;</span>
            </div>
            <div className="form-block">
                <label htmlFor="lastNameInput" className="input-label">Last Name</label>
                <input type="text" className="input" id="lastNameInput" onInput={(event) => setLastName(event.target.value)} value={last_name} />
                <span className={`error-message ${errors.last_name.length ? "" : "hidden"}`}>{errors.last_name.toString()}&nbsp;</span>
            </div>
            
            <div class="btn-group">
                <button className="btn blue-outline" type="button" onClick={() => {setAccountPageUsername(userData.username); setRedirect(true);}}>Cancel</button>
                <button className="btn blue" type="submit">Save Changes</button>
            </div>
        </form>
    );
}


const validate = (value, type) => {
    let errorMessage = "";
    switch(type) {
        case "email":
            errorMessage = value.length > 3 && (/\w+@\w+\.\w+/).test(value) ? "" : "Invalid email";
        break;
        case "username":
            errorMessage = value.length > 3 && (/^[a-zA-Z0-9_ ]+$/).test(value) ? "" : "Invalid username";
        break;
        case "name":
            errorMessage = value.length > 1 && (/^[a-zA-Z- ]+$/).test(value) ? "" : "Invalid name";
        break;
        case "password":
            errorMessage = (/^(?=.*[A-Za-z])(?=.*\d).{8,}$/).test(value) ? "" : "Password must contain at least 8 characters, 1 letter, and 1 number";
        break;
        default: errorMessage = "";
    }
    return errorMessage;
}
const confirmPasswords = (password, confirm) => {
    return password === confirm ? "": "Passwords do not match";
}






export {
    ImageForm,
    LogInForm,
    SignupForm,
    AccountSettingsForm
} 