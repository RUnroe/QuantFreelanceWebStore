import React, { createElement, useEffect, useState } from "react";
import "../styles/productPage.css";
import {ImageSelectModal} from "../partials/image";

const genId = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}


const getJSXOfElement = (pageElement) => {
    const tempJSX = [];
    switch(pageElement.type) {
        case "header": 
            tempJSX.push(convertHeader(pageElement));
        break;
        case "paragraph": 
            tempJSX.push(convertParagraph(pageElement));
        break;
        case "spacer": 
            tempJSX.push(convertSpacer(pageElement));
        break;
        case "hr": 
            tempJSX.push(convertHr(pageElement));
        break;
        case "image": 
            tempJSX.push(convertImage(pageElement));
        break;
        case "faq": 
            tempJSX.push(convertFAQ(pageElement));
        break;
        case "split": 
            tempJSX.push(convertSplit(pageElement));
        break;
    }
    return tempJSX;
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

const convertSpacer = (object) => {
    const props = object.properties;
    const jsx = [];
    jsx.push(<div className={`spacer ${props.size}`}></div>);
    return jsx;
}

const convertHr = (object) => {
    const props = object.properties;
    const jsx = [];
    const style = {
        backgroundColor: props.color,
        width: props.width,
        height: props.height
    }
    jsx.push(<hr style={style} />);
    return jsx;
}

const convertImage = (object) => {
    const props = object.properties;
    const jsx = [];
    const style = {
        display: "block",
        width: props.width,
        height: props.height
    }
    if(props.align === "center" || props.align === "right") style.marginLeft = "auto";
    if(props.align === "center") style.marginRight = "auto";
    jsx.push(<img style={style} src={props.src} />);
    return jsx;
}


const convertFAQ = (object) => {
    const props = object.properties;
    const jsx = [];
    const modulesJSX = [];
    props.modules.forEach(module => {
        modulesJSX.push(
            <label className="faq-module">
                <input type="checkbox"/>
                <div className="faq-question"><span>{module.question}</span><i className="fas fa-chevron-down"></i> </div>
                <div className="faq-answer"><span>{module.answer}</span></div>
            </label>
        );
    });
    jsx.push(
        <div className="faq-container">
          {modulesJSX}  
        </div>
    );

    return jsx;
}

const convertSplit = (object) => {
    const props = object.properties;
    const jsx = [];
    
    jsx.push(
        <div className="split-section">
            <div className="left-side">
                {getJSXOfElement(props.children[0])}
            </div>
            <div className="right-side">
                {getJSXOfElement(props.children[1])}
            </div>
        </div> 
    );

    return jsx;
}

const getConfigPanelInputs = (selectedElement) => {
    const tempJSX = [];
    switch(selectedElement.type) {
        case "header": 
            tempJSX.push(
                <div className="input-block">
                    <label htmlFor={`${selectedElement.id}headerType`}>Header Type</label>
                    <select id={`${selectedElement.id}headerType`} value={selectedElement.properties.headerType}>
                        <option value="h1">h1</option>
                        <option value="h2">h2</option>
                        <option value="h3">h3</option>
                        <option value="h4">h4</option>
                        <option value="h5">h5</option>
                        <option value="h6">h6</option>
                    </select>
                </div>
            );
            tempJSX.push(
                <div className="input-block">
                    <label htmlFor={`${selectedElement.id}value`}>Text</label>
                    <input type="text" id={`${selectedElement.id}value`} value={selectedElement.properties.value} />
                </div>
            );
            tempJSX.push(
                <div className="input-block">
                    <label htmlFor={`${selectedElement.id}fontWeight`}>Font Weight</label>
                    <select id={`${selectedElement.id}fontWeight`} value={selectedElement.properties.fontWeight}>
                        <option value="200">Light</option>
                        <option value="400">Regular</option>
                        <option value="800">Bold</option>
                    </select>
                </div>
            );
            tempJSX.push(
                <div className="input-block">
                    <label htmlFor={`${selectedElement.id}style`}>Text Style</label>
                    <select id={`${selectedElement.id}style`} value={selectedElement.properties.style}>
                        <option value="">None</option>
                        <option value="italics">Italics</option>
                        <option value="underline">Underline</option>
                    </select>
                </div>
            );
            tempJSX.push(
                <div className="input-block">
                    <label htmlFor={`${selectedElement.id}style`}>Text Alignment</label>
                    <select id={`${selectedElement.id}style`} value={selectedElement.properties.align}>
                        <option value="left">Left</option>
                        <option value="center">Center</option>
                        <option value="right">Right</option>
                    </select>
                </div>
            );
            
        break;
        case "paragraph": 
            // tempJSX.push(convertParagraph(pageElement));
        break;
        case "spacer": 
            // tempJSX.push(convertSpacer(pageElement));
        break;
        case "hr": 
            // tempJSX.push(convertHr(pageElement));
        break;
        case "image": 
            // tempJSX.push(convertImage(pageElement));
        break;
        case "faq": 
            // tempJSX.push(convertFAQ(pageElement));
        break;
        case "split": 
            // tempJSX.push(convertSplit(pageElement));
        break;
    }
    return tempJSX;
}


export default function ProductEditPage() {
    const [imageSelectModalSetter, setImageSelectModalSetter] = useState();
    const [addModalVisible, setAddModalVisible] = useState(false);

    const [productId, setProductId] = useState(""); 
    const [title, setTitle] = useState("");
    const [coverImg, setCoverImg] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState("");
    const [pageStructure, setPageStructure] = useState([]);

    const [pageStructureJSX, setPageStructureJSX] = useState([]);

    const [selectedElement, setSelectedElement] = useState();
    const [configPanelJSX, setConfigPanelJSX] = useState([]);

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

    //Update config panel with correct info when element is selected
    useEffect(() => {
        setupConfigPanel();
    }, [selectedElement]);


    const setupConfigPanel = () => {
        const jsx = [];
        const inputs = [];
        jsx.push(<h2 className="config-panel-header">Edit {selectedElement.type}</h2>);

        inputs = getConfigPanelInputs(selectedElement);
        jsx.push(<div className="config-panel-input-section">{inputs}</div>);
        
        setConfigPanelJSX(jsx);
    } 
    
    
    const convertPageStructureToJSX = () => {
        const tempJSX = [];
        pageStructure.forEach(pageElement => {
            tempJSX.push(getJSXOfElement(pageElement));
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

    const openAddElementModal = () => {
        setAddModalVisible(true);
    }

    const createElement = (elementType) => {
        //CREATE ELEMENT
        //add to page structure
        const newElement = {
            type: elementType,
            position: -1, //not sure how to do order yet lol
            id: genId(),
            properties: {}
        }
        setPageStructure((oldState) => [...oldState, newElement]);
        convertPageStructureToJSX();
        //close modal
        setAddModalVisible(false);
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
                
                {/* Add NEW ELEMENT BUTTON */}
                <div className="open-add-element-btn" onClick={openAddElementModal}>
                    +
                </div>

                {/* ADD MODAL */}
                <div className={`modal ${addModalVisible ? "visible" : ""}`} id="addElementModal">
                    <div className="modal-header">
                        <h2>Add an Element:</h2>
                        <button onClick={() => setAddModalVisible(false)}><i className="fas fa-times"></i></button>
                    </div>
                    <div className="modal-body">
                        <div className="add-modal-list">
                            <div className="add-element-btn" onClick={() => createElement("header")}>Header</div>
                            <div className="add-element-btn" onClick={() => createElement("paragraph")}>Paragraph</div>
                            <div className="add-element-btn" onClick={() => createElement("hr")}>Horizontal Rule</div>
                            <div className="add-element-btn" onClick={() => createElement("spacer")}>Spacer</div>
                            <div className="add-element-btn" onClick={() => createElement("image")}>Image</div>
                            <div className="add-element-btn" onClick={() => createElement("faq")}>FAQ</div>
                            <div className="add-element-btn" onClick={() => createElement("split")}>Split Section</div>
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
    
        <div className={`screen ${addModalVisible ? "visible" : ""}`} id="addModalScreen" onClick={() => setAddModalVisible(false)}></div>
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