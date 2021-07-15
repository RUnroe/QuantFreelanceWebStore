

function SignupForm() {

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