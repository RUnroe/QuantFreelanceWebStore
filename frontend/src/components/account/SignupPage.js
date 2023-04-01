import React, { useState } from "react";
import { SignupForm } from "../form";
import {ImageSelectModal} from "../modal/imageModal";
import '../../styles/signup.css';

export default function SignupPage({checkAuth}) {
    const [imageSelectModalSetter, setImageSelectModalSetter] = useState();
    const [selectedIcon, setSelectedIcon] = useState(); //set up https://ui-avatars.com/api/?background=ffff7f&name=
    const [accType, setAccType] = useState("buyer");
    const [viewedPage, setViewedPage] = useState("account-type");

    const selectImage = (setter) => {
        setImageSelectModalSetter(() => setter);
    }

    const toSignupForm = (accType) => {
        setAccType(accType);
        setViewedPage("form");
    }
    const backToAccTypeSelection = () => {
        setViewedPage("account-type");
    }
    const convertAccType = (accType) => {
        if(accType === "buyer") return "(Standard Account)";
        else return "(Seller Account)";
    }
    return(
        <div className={`screen-section ${viewedPage}`}>
        <div className={`account-type-section`}>
            <div className="container gradient">
                <h1 className="text-center text-white">Choose Account Type</h1>
                <div className="account-type-container">
                    <div className="buyer-account account-selection" onClick={() => toSignupForm("buyer")}>
                        <div className="img-container"><img src="/images/usage/freelancerIcon.svg" alt="account-icon"/></div>
                        <h3>Standard Account</h3>
                        <p>Perfect for browsing and purchasing services.</p>
                    </div>
                    <div className="seller-account account-selection" onClick={() => toSignupForm("seller")}>
                        <div class="img-container"><img src="/images/usage/sellIcon.svg" alt="seller-icon"/></div>
                        <h3>Seller Account</h3>
                        <p>For freelancers to do what they do best and make money in the process.</p>
                    </div>
                </div>
            </div>
        </div>
        <div className={`form-section`}>
            <div className="container gradient left-side">
                <p style={{cursor:"pointer"}} className="text-white" onClick={backToAccTypeSelection}><i className="fas fa-arrow-left"></i>&nbsp; Back</p>
                <h1>Sign Up</h1>
                <p className="account-type-text">{convertAccType(accType)}</p>
                <div className="round-img-container" onClick={() => selectImage(setSelectedIcon)}>{ selectedIcon ? <img src={selectedIcon} /> : <div className="image-picker-button">+</div>}</div>
                <ImageSelectModal setter={imageSelectModalSetter} setSetter={setImageSelectModalSetter} />
            </div>
            <div className="container right-side">
                <div className="section">
                    <div className="form-container">
                        <SignupForm checkAuth={checkAuth} is_seller={(accType === "seller")} icon_id={selectedIcon}/>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );

}