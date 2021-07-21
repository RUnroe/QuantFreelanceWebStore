import React from "react";
import "../styles/productPage.css";

export default function ProductEditPage() {
    return(
        <>
        <div className="product-page">
            <div className="product-main container">
                <h1>Sample Header</h1>
                <p>Sample paragraph</p>
                <div>
                    <img src="https://via.placeholder.com/600x250" alt="sample" />
                </div>
                <hr />
                <div className="spacer"></div>
                <div className="faq-container">
                    <div className="faq-module">
                        <div className="faq-question">Sample Question</div>
                        <div className="faq-answer">Sample Answer</div>
                    </div>
                </div>
                <div className="split-section">
                    <div class="left-side">
                        <p>Left text</p>
                    </div>
                    <div class="right-side">
                        <p>Right text</p>
                    </div>
                </div>



                <div className="modal">
                    <div className="modal-header">
                        <h2>Add an Element:</h2>
                        <button><i class="fas fa-times"></i></button>
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
                <div className="input-block">
                    <label>Cover Image</label>
                    <div>
                        <img src="https://via.placeholder.com/135x65" alt="cover-img" />
                    </div>
                </div>
                <div className="input-block">
                    <label>Product Title</label>
                    <input type="text" />
                </div>
                <div className="input-block">
                    <label>Price</label>
                    <input type="text" />
                </div>
                <div className="input-block">
                    <label>Category</label>
                    <select>
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
                    <textarea type="text" />
                </div>
                
            </div>
        </div>

    
        <div className="screen" id="modalScreen"></div>
        </>
    );

}









//Load in current page
//insert "add bar" btn under each element
//Add delete btn to each element
//Add event listener to each element to edit (turn text to input fields)

//Create "Add element" btn at bottom

//Modal for selecting what element to add
    //When selecting put in edit mode automatically

//Right panel
//Import title, desc, cover img, price, category
//Save changes and cancel btn