import React from "react";
import { LogInForm } from "../partials/form";
export default function LoginPage({checkAuth}) {
    return(
        <div className="container">
            <div className="section">
                <h1>Log In</h1>
                <LogInForm checkAuth={checkAuth} />
            </div>
        </div>
    );

}