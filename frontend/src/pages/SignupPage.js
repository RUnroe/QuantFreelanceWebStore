import React from "react";
import { ImageForm } from "../partials/form";

export default function SignupPage() {
    return(
        <div className="container">
            <div className="section">
                <h1>Sign Up</h1>
                <ImageForm />
                <button className="btn blue">Primary</button>
                <button className="btn blue-outline">Primary Outline</button>
                <button className="btn green">Secondary</button>
                <button className="btn green-outline">Secondary Outline</button>
                <button className="btn danger">Danger</button>
                <button className="btn danger-outline">Danger Outline</button>
            </div>
        </div>
    );

}