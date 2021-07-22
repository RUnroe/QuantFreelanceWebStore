import { createRef, useEffect, useState } from "react";

function ImageSelectModal() {
    const [image, setImage] = useState();
    const [selectedImageUrl, setSelectedImageUrl] = useState();
    const [modalState, setModalState] = useState("upload");
    const [userImages, setUserImages] = useState([]);
    const [userImageJSX, setUserImageJSX] = useState([]);

    const getUsersImages = async () => {
        fetch("/api/icons/user").then(result => result.json()).then(data => {
            console.log(data);
            setUserImages(data);

            let jsxElements = [];
            console.log(userImages);
            userImages.forEach(value => {
                jsxElements.push(<div><img src={value.url}/></div>)
            });
            console.log(jsxElements);
            setUserImageJSX(...jsxElements);
            console.log(userImageJSX);

        })
    }

    useEffect(() => {
        getUsersImages();
    }, []);


    const postIcon = () => {
        //TODO: catch and display error
        const formData = new FormData();
        // console.log(image.current.files[0]);
        console.log(image);
        formData.append('icon', image);
        fetch('/api/icons', {
            method: 'POST',
            body: formData
        }).then(response => response.json())
        .then(data => console.log(data));
    }

    const selectImage = () => {
        if(modalState === "upload"){
            postIcon();
            console.log(image.value);
        }
        else if (modalState === "select") {

        }
    }
    return (
        <>
        <div className="modal visible" id="imageModal">
            <div className="modal-header">
                <h2>Select Image</h2>
                <button><i className="fas fa-times"></i></button>
            </div>
            <div className="modal-body">
                <div className="image-options-container">
                    <div className="image-options">
                        <label><input type="radio" name="image-option" value="upload" onClick={() => setModalState("upload")} checked={modalState === "upload"} /><div className="image-option">Upload Photo</div></label>
                        <label><input type="radio" name="image-option" value="select" onClick={() => setModalState("select")} checked={modalState === "select"} /><div className="image-option">Your Photos</div></label>
                    </div>
                </div>
                <div className="image-container">
                    <div className={`image-upload-container upload-container ${modalState === "upload" ? "" : "hidden"}`}>
                        <div className="form-block">
                            <label className="input-label file-input btn blue"> Upload Image
                                <input id="imageInput"  onInput={e => setImage(e.target.files[0])} type="file" name="newIcon" accept="image/png, image/jpeg, image/jpg, image/svg" />
                            </label>
                            <p>{image ? image.name : "" }</p>
                            <span id="imageErrorMsg" className="error-message hidden">Incorrect file type</span>
                        </div>
                        {/* <button type="submit">Submit</button> */}
                    </div>
                    <div className={`image-select-container upload-container ${modalState === "select" ? "" : "hidden"}`}>
                        {userImageJSX}
                    </div>
                </div>
                <div className="btn-group">
                    <button className="btn blue-outline">Cancel</button>
                    <button className="btn blue" onClick={selectImage}>Select</button>
                </div>
            </div>
        </div>
        <div className="screen" id="imageModalScreen"></div>
        </>
    );
}


export {
    ImageSelectModal
} 

//store state of image modal
//on submit, figure out what to do: upload image or use link from selected image