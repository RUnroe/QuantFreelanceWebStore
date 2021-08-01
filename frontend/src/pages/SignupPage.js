import React, { useState } from "react";
import { ImageForm } from "../partials/form";
import {ImageSelectModal} from "../partials/image";
import '../styles/signup.css';

export default function SignupPage() {
    const [imageSelectModalSetter, setImageSelectModalSetter] = useState();
    const [selectedIcon, setSelectedIcon] = useState(); //set up https://ui-avatars.com/api/?background=ffff7f&name=
    const [accType, setAccType] = useState("buyer");

    const selectImage = (setter) => {
        setImageSelectModalSetter(() => setter);
    }

    const toSignupForm = (accType) => {
        setAccType(accType);

    }
    const backToAccTypeSelection = () => {

    }
    return(
        <>
        <div className="account-type-section">
            <div className="container gradient">
                <h1 className="text-center text-white">Choose Account Type</h1>
                <div className="account-type-container">
                    <div className="buyer-account account-selection" onClick={() => toSignupForm("buyer")}>
                        <img className="round" src="https://via.placeholder.com/150" alt="account-icon"/>
                        <h3>Basic Account</h3>
                        <p>Perfect for browsing and purchasing services.</p>
                    </div>
                    <div className="seller-account account-selection" onClick={() => toSignupForm("seller")}>
                        <img className="round" src="https://via.placeholder.com/150" alt="seller-icon"/>
                        <h3>Seller Account</h3>
                        <p>For freelancers to do what they do best and make money in the process.</p>
                    </div>
                </div>
            </div>
        </div>
        <div className="form-section">
            <div className="container gradient left-side">
                <p style={{cursor:"pointer"}} className="text-white" onClick={backToAccTypeSelection}><i class="fas fa-arrow-left"></i>&nbsp; Back</p>
                <h1>Sign Up</h1>
                <div className="round-img-container" onClick={() => selectImage(setSelectedIcon)}>{ selectedIcon ? <img src={selectedIcon} /> : <div className="image-picker-button">+</div>}</div>
                <ImageSelectModal setter={imageSelectModalSetter} setSetter={setImageSelectModalSetter} />
            </div>
            <div className="container right-side">
                <div className="section">
                    <ImageForm />
                    
                </div>
            </div>
        </div>
        </>
    );

}