import React from "react";
import { LogInForm } from "../form";
import '../../styles/login.css';

export default function LoginPage({checkAuth}) {
    return(
        <div className="container gradient login-section">
            <div className="section">
                <h1 className="text-center text-white">Log In</h1>
                <div className="floating-form">
                    <LogInForm checkAuth={checkAuth} />
                    <a href="/signup">Don't have an account? Create one here</a>
                </div>
            </div>
        </div>
    );

}