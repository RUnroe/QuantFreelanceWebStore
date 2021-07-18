import { createRef } from "react";


function SignupForm() {
    const image = createRef();

    const postIcon = event => {
        event.preventDefault();
        const formData = new FormData();
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
                <label className="input-label">Icon</label>
                <label className="input-label file-input btn"> Upload Image
                    <input id="imageInput" ref={image} type="file" name="newIcon" accept="image/png, image/jpeg, image/jpg, image/svg" />
                </label>
                <span id="imageErrorMsg" className="error-message hidden">Incorrect file type</span>
            </div>
            <button type="submit">Submit</button>
        </form>
    );
}

function ImageInput({labelName}) {

    return (
        <div className="form-block">
            <label className="input-label">{labelName} </label>
            <label className="input-label file-input btn"> Upload Image
                <input id="imageInput" type="file" name="newIcon" accept="image/png, image/jpeg, image/jpg, image/svg" />
            </label>
            <span id="imageErrorMsg" className="error-message hidden">Incorrect file type</span>
        </div>
    );
}




export {
    SignupForm, 
    ImageInput
} 