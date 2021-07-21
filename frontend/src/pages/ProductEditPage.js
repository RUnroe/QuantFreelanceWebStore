import React from "react";
import "../styles/productPage.css";

export default function ProductEditPage() {
    return(
        <div className="section">
            <h1>Product Edit Page</h1>
            <div className="product-page">
                <div className="product-main">
                    
                </div>
                <div className="product-side">
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

            <div className="modal">
                <h2>Add an Element:</h2>
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