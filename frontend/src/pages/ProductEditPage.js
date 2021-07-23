import React, { useEffect, useState } from "react";
import "../styles/productPage.css";
import {ImageSelectModal} from "../partials/image";

const genId = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

const convertHeader = (headerObject) => {
    const props = headerObject.properties;
    const jsx = [];
    const style = {
        fontWeight: props.fontWeight,
        textAlign: props.align
    }
    if(props.style === "italics") style.fontStyle = "italics";
    if(props.style === "underline") style.textDecoration = "underline";

    switch(headerObject.properties.headerType) {
        case "h1":
            jsx.push(<h1 style={style}>{props.value}</h1>);
        break;
        case "h2":
            jsx.push(<h2 style={style}>{props.value}</h2>);
        break;
        case "h3":
            jsx.push(<h3 style={style}>{props.value}</h3>);
        break;
        case "h4":
            jsx.push(<h4 style={style}>{props.value}</h4>);
        break;
        case "h5":
            jsx.push(<h5 style={style}>{props.value}</h5>);
        break;
        case "h6":
            jsx.push(<h6 style={style}>{props.value}</h6>);
        break;

    }
    return jsx;
}

const convertParagraph = (paragraphObject) => {
    const props = paragraphObject.properties;
    const jsx = [];
    const style = {
        fontWeight: props.fontWeight,
        textAlign: props.align
    }
    if(props.style === "italics") style.fontStyle = "italics";
    if(props.style === "underline") style.textDecoration = "underline";

    jsx.push(<p style={style}>{props.value}</p>);

    return jsx;
}



export default function ProductEditPage() {
    const [imageSelectModalSetter, setImageSelectModalSetter] = useState();
    
    const [productId, setProductId] = useState(""); 
    const [title, setTitle] = useState("");
    const [coverImg, setCoverImg] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState("");
    const [pageStructure, setPageStructure] = useState([]);

    const [pageStructureJSX, setPageStructureJSX] = useState([]);

    const [selectedElementId, setSelectedElementId] = useState();


    //Temporary to display 
    useEffect(() => {
        setTitle("Logo Design");
        setCoverImg("https://via.placeholder.com/135x65");
        setDescription("this is a description");
        setPrice("30.00");
        setCategory("ProgrammingTech");
        setPageStructure([
            {
                type: "header",
                id:"87c650d6-a60c-47c4-a7b8-f7537ba9d603",
                position:1,
                properties: {
                    value: "This is an example of a header",
                    fontWeight: 400,
                    align: "left",
                    headerType: "h1",
                    style: "none" //(italics, underline, none)
                }
            },
            {
                type: "split",
                id:"87c650d6-a60c-47c4-a7b8-f7537ba9d604",
                position:2,
                properties: {
                    splitType: 1,
                    children: [
                        {
                            type: "paragraph",
                            id:"87c650d6-a60c-47c4-a7b8-f7537ba9d605",
                            position:2,
                            properties: {
                                value: "This is an example of a nested paragrah",
                                fontWeight: 400,
                                style: "none", //(italics, underline, none)
                                align: "center"
                            }
                        },
                        {
                            type: "image",
                            id:"87c650d6-a60c-47c4-a7b8-f7537ba9d606",
                            position:2,
                            properties: {
                                src: "https://via.placeholder.com/135x65",
                                align: "right",
                                width: "100%"
                            }
                        },
                    ]
                }
            }

        ]);
    }, []);


    useEffect(() => {
        convertPageStructureToJSX();
    }, [pageStructure]);

    const convertPageStructureToJSX = () => {
        const tempJSX = [];
        pageStructure.forEach(pageElement => {
            switch(pageElement.type) {
                case "header": 
                    tempJSX.push(convertHeader(pageElement));
                break;
            }
        });
        setPageStructureJSX(tempJSX);
    }
    const savePage = () => {
        const pageData = {
            title,
            coverImage: coverImg,
            description,
            price,
            category,
            page_structure: pageStructure
        }
        console.log(pageData);
        //post the pageData to the updateProduct method
        console.log(genId());
    }

    const selectImage = (setter) => {
        setImageSelectModalSetter(() => setter);
    }
    return(
        <>
        <div className="product-page">
            <div className="product-main container">
                {/* <h1>Sample Header</h1>
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
                </div>  */}

                {pageStructureJSX}

                {/* ADD MODAL */}
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