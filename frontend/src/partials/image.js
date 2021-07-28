import { useEffect, useState } from "react";

function ImageSelectModal({setter, setSetter}) {
    const [image, setImage] = useState();
    const [selectedImageUrl, setSelectedImageUrl] = useState();
    const [modalState, setModalState] = useState("upload");
    const [userImages, setUserImages] = useState([]);
    const [userImageJSX, setUserImageJSX] = useState([]);

    const getUsersImages = async () => {
        return fetch("/api/icons/user").then(result => result.json()).then(data => {
            const images = data.map(item => item.url);
            setUserImages(images);
            return images;
        });
    }
    const renderUserImagesJSX = (data, selectedId) => {
        let jsxElements = [];
        data.forEach((value, index) => {
            jsxElements.push(<div class={`image-select-option ${index === selectedId ? "selected" : ""}`} data-id={index} onClick={() => selectImageOption(index, value)}><img alt={index} src={value}/></div>)
        });
        setUserImageJSX(jsxElements);
    }
    useEffect(() => {
        getUsersImages();
    }, []);

    useEffect(() => {
        renderUserImagesJSX(userImages, -1);
    }, [userImages]);


    const postIcon = () => {
        //TODO: catch and display error
        const formData = new FormData();
        // console.log(image.current.files[0]);
        console.log(image);
        formData.append('icon', image);
        return fetch('/api/icons', {
            method: 'POST',
            body: formData
        }).then(response => response.json());
    }
    const selectImageOption = (dataId, url) => {
        renderUserImagesJSX(userImages, dataId);
        setSelectedImageUrl(url);
    }
    const selectImage = async() => {
        if(modalState === "upload"){
            postIcon().then(img => {
                setSelectedImageUrl(img.url);
                console.log(img.url);
                setter(img.url);
                setSetter(""); // clear the setter to hide the modal
            });
        }
        else if (modalState === "select") {
            setter(selectedImageUrl);
            setSetter(""); // clear the setter to hide the modal

        }
    }
    const closeModal = () => {
        setSetter(""); // clear the setter to hide the modal
    }
    if(setter) {
    return (
        <>
        <div className="modal visible" id="imageModal">
            <div className="modal-header">
                <h2>Select Image</h2>
                <button onClick={closeModal}><i className="fas fa-times"></i></button>
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
                    <button className="btn blue-outline" onClick={closeModal}>Cancel</button>
                    <button className="btn blue" onClick={selectImage}>Select</button>
                </div>
            </div>
        </div>
        <div className="screen visible" id="imageModalScreen" onClick={closeModal}></div>
        </>
    );
    } 
    return (<></>)
}


export {
    ImageSelectModal
} 

//store state of image modal
//on submit, figure out what to do: upload image or use link from selected image