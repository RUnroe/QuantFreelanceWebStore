import React, { useEffect, useState } from "react";
import "../styles/productPage.css";
import {ImageSelectModal} from "../partials/image";
export default function ProductEditPage() {
    const [imageSelectModalSetter, setImageSelectModalSetter] = useState();

    const [title, setTitle] = useState("");
    const [coverImg, setCoverImg] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState("");
    const [pageStructure, setPageStructure] = useState([]);

    const [selectedElementId, setSelectedElementId] = useState();


    //Temporary to display 
    useEffect(() => {
        setTitle("Logo Design");
        setCoverImg("https://via.placeholder.com/135x65");
        setDescription("this is a description");
        setPrice("30.00");
        setCategory("DesignArt");
    }, []);

    const savePage = () => {
        console.log(title, coverImg, description, price, category, pageStructure);
    }

    const selectImage = (setter) => {
        setImageSelectModalSetter(() => setter);
    }
    return(
        <>
        <div className="product-page">
            <div className="product-main container">
                <h1>Sample Header</h1>
                <p>Sample paragraph</p>
                <div className="image">
                    <img src="https://via.placeholder.com/600x250" alt="sample" />
                </div>
                <hr />
                <div className="spacer"></div>
                <div className="faq-container">
                    <label className="faq-module">
                        <input type="checkbox"/>
                        <div className="faq-question"><span>Sample Question</span><i className="fas fa-chevron-down"></i> </div>
                        <div className="faq-answer"><span>Sample Answer</span></div>
                    </label>
                    <label className="faq-module">
                        <input type="checkbox"/>
                        <div className="faq-question"><span>Sample Question</span><i className="fas fa-chevron-down"></i> </div>
                        <div className="faq-answer"><span>Sample Answer</span></div>
                    </label>
                </div>
                <div className="split-section">
                    <div className="left-side">
                        <p>Left text</p>
                    </div>
                    <div className="right-side">
                        <p>Right text</p>
                    </div>
                </div>



                <div className="modal" id="addElementModal">
                    <div className="modal-header">
                        <h2>Add an Element:</h2>
                        <button><i className="fas fa-times"></i></button>
                    </div>
                    <div className="modal-body">
                        <div className="add-modal-list">
                            <div className="add-element-btn">Header</div>
                            <div className="add-element-btn">Paragraph</div>
                            <div className="add-element-btn">Horizontal Rule</div>
                            <div className="add-element-btn">Spacer</div>
                            <div className="add-element-btn">Image</div>
                            <div className="add-element-btn">FAQ</div>
                            <div className="add-element-btn">Split Section</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="product-side edit container gradient">
                <div className="options">
                    <div className="input-block">
                        <label>Cover Image</label>
                        <div className="cover-img-container">
                            <img src={coverImg} alt="cover-img" onClick={() => selectImage(setCoverImg)} />
                        </div>
                    </div>
                    <div className="input-block">
                        <label>Product Title</label>
                        <input className="input" type="text" value={title} onInput={event => setTitle(event.target.value)}/>
                    </div>
                    <div className="input-block">
                        <label>Price</label>
                        <div className="combo-input">
                            <div className="unit-display">$</div>
                            <input className="input" type="number" value={price} onInput={event => setPrice(event.target.value)} />
                        </div>
                    </div>
                    <div className="input-block">
                        <label>Category</label>
                        <select className="input" value={category} onInput={event => setCategory(event.target.value)}>
                            <option value="DesignArt">Design &amp; Art</option>
                            <option value="SalesMarketing">Sales &amp; Marketing</option>
                            <option value="BusinessFinance">Business &amp; Finance</option>
                            <option value="WritingTranslation">Writing &amp; Translation</option>
                            <option value="VideoAnimation">Video &amp; Animation</option>
                            <option value="AudioMusic">Audio &amp; Music</option>
                            <option value="ProgrammingTech">Programming &amp; Tech</option>
                            <option value="EngineeringArchitecture">Engineering &amp; Architecture</option>
                            <option value="EducationTraining">Education &amp; Training</option>
                        </select>
                    </div>
                    <div className="input-block">
                        <label>Product Description</label>
                        <textarea className="input" type="text" value={description} onInput={event => setDescription(event.target.value)}/>
                    </div>
                </div>
                <div className="btn-group">
                    <button className="btn blue-outline text-white">Cancel</button>
                    <button className="btn blue" onClick={savePage}>Save Changes</button>
                </div>
            </div>
        </div>
        <ImageSelectModal setter={imageSelectModalSetter} setSetter={setImageSelectModalSetter} />
    
        <div className="screen" id="addModalScreen"></div>
        </>
    );

}









//Load in current page
    //fetch and get page json
    //store in one state variable
    //FUNCTION: loop over data and create jsx. Store in second state
        //Need to create onClick/onInput events on every element
        //Give each element an id in state. Give corresponding JSX element data-id

//insert "add bar" btn under each element
//Add delete btn to each element
//Add event listener to each element to edit (turn text to input fields)

//Create "Add element" btn at bottom

//Modal for selecting what element to add
    //When selecting put in edit mode automatically

//Right panel
//Import title, desc, cover img, price, category
//Save changes and cancel btn