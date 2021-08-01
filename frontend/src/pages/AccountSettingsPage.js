import React, { useEffect, useState } from "react";
import { AccountSettingsForm } from "../partials/form";
import {ImageSelectModal} from "../partials/image";
import '../styles/accountSettings.css';

export default function AccountSettingsPage({checkAuth, user}) {
    const [imageSelectModalSetter, setImageSelectModalSetter] = useState();
    const [selectedIcon, setSelectedIcon] = useState(); //set up https://ui-avatars.com/api/?background=ffff7f&name=
    
    const selectImage = (setter) => {
        setImageSelectModalSetter(() => setter);
    }
    useEffect(() => {
        setSelectedIcon(user.icon_id);
    }, []);

    return(
        <div className="account-form">
            <div className="container gradient left-side">
                <h1>Account Settings</h1>
                <div className="round-img-container" onClick={() => selectImage(setSelectedIcon)}>{ selectedIcon ? <img src={selectedIcon} /> : <div className="image-picker-button">+</div>}</div>
                <ImageSelectModal setter={imageSelectModalSetter} setSetter={setImageSelectModalSetter} />
            </div>
            <div className="container right-side">
                <div className="section">
                    <div className="form-container">
                        <AccountSettingsForm checkAuth={checkAuth} icon_id={selectedIcon} userData={user}/>
                    </div>
                </div>
            </div>
        </div>
    );

}