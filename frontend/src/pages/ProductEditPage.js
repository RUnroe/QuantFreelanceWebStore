import React, { useEffect, useState } from "react";
import "../styles/productPage.css";
import {ImageSelectModal} from "../partials/image";
import {Redirect} from "react-router-dom";


//////////////////////////////////////////////////////////////////////////////////////////////
export default function ProductEditPage({username}) {
    const [imageSelectModalSetter, setImageSelectModalSetter] = useState();
    const [addModalVisible, setAddModalVisible] = useState(false);
    const [addElementLocation, setAddElementLocation] = useState("");

    const [statusBar, setStatusBar] = useState("");

    const [productId, setProductId] = useState(""); 
    const [title, setTitle] = useState("");
    const [coverImg, setCoverImg] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState("");
    const [pageStructure, setPageStructure] = useState([]);

    const [pageStructureJSX, setPageStructureJSX] = useState([]);

    const [selectedElementId, setSelectedElementId] = useState();
    const [selectedElement, setSelectedElement] = useState();
    const [configPanelJSX, setConfigPanelJSX] = useState([]);
    const [newCreatedElementId, setNewCreatedElementId] = useState();

    const [redirect, setRedirect] = useState(false);

    //////////////////////////////////////////////////////////////////////////////////////////////

    const genId = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
            let r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
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
            default: break;
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
        if(props.style === "italics") style.fontStyle = "italic";
        if(props.style === "underline") style.textDecoration = "underline";
    
        switch(headerObject.properties.headerType) {
            case "h2":
                jsx.push(<h2 className={`header ${headerObject.id === selectedElementId ? "selected" : ""}`} onClick={(event) => {selectElement(headerObject.id); event.stopPropagation();}} style={style}>{props.value}</h2>);
            break;
            case "h3":
                jsx.push(<h3 className={`header ${headerObject.id === selectedElementId ? "selected" : ""}`} onClick={(event) => {selectElement(headerObject.id); event.stopPropagation();}} style={style}>{props.value}</h3>);
            break;
            case "h4":
                jsx.push(<h4 className={`header ${headerObject.id === selectedElementId ? "selected" : ""}`} onClick={(event) => {selectElement(headerObject.id); event.stopPropagation();}} style={style}>{props.value}</h4>);
            break;
            case "h5":
                jsx.push(<h5 className={`header ${headerObject.id === selectedElementId ? "selected" : ""}`} onClick={(event) => {selectElement(headerObject.id); event.stopPropagation();}} style={style}>{props.value}</h5>);
            break;
            case "h6":
                jsx.push(<h6 className={`header ${headerObject.id === selectedElementId ? "selected" : ""}`} onClick={(event) => {selectElement(headerObject.id); event.stopPropagation();}} style={style}>{props.value}</h6>);
            break;
            default:
                jsx.push(<h1 className={`header ${headerObject.id === selectedElementId ? "selected" : ""}`} onClick={(event) => {selectElement(headerObject.id); event.stopPropagation();}} style={style}>{props.value}</h1>);
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
        if(props.style === "italics") style.fontStyle = "italic";
        if(props.style === "underline") style.textDecoration = "underline";
    
        jsx.push(<p className={`paragraph ${paragraphObject.id === selectedElementId ? "selected" : ""}`} style={style} onClick={(event) => {selectElement(paragraphObject.id); event.stopPropagation();}}>{props.value}</p>);
    
        return jsx;
    }
    
    const convertSpacer = (object) => {
        const props = object.properties;
        const jsx = [];
        jsx.push(<div className={`spacer space${props.size} ${object.id === selectedElementId ? "selected" : ""}`} onClick={(event) => {selectElement(object.id); event.stopPropagation();}}></div>);
        return jsx;
    }
    
    const convertHr = (object) => {
        const props = object.properties;
        const jsx = [];
        const style = {
            backgroundColor: props.backgroundColor,
            width: props.width,
            height: props.height
        }
        jsx.push(<hr className={`hr ${object.id === selectedElementId ? "selected" : ""}`} style={style} onClick={(event) => {selectElement(object.id); event.stopPropagation();}}/>);
        return jsx;
    }
    
    const convertImage = (object) => {
        const props = object.properties;
        const jsx = [];
        const style = {
            display: "block",
            width: props.width ?? "auto",
            height: props.height ?? "auto"
        }
        if(props.align === "center" || props.align === "right") style.marginLeft = "auto";
        if(props.align === "center") style.marginRight = "auto";
        jsx.push(<img className={`image ${object.id === selectedElementId ? "selected" : ""}`} alt={object.id + "image"} style={style} src={props.src} onClick={(event) => {selectElement(object.id); event.stopPropagation();}} />);
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
            <div className={`faq-container ${object.id === selectedElementId ? "selected" : ""}`} onClick={(event) => {selectElement(object.id); event.stopPropagation();}}>
              {modulesJSX}  
            </div>
        );
    
        return jsx;
    }
    
    const convertSplit = (object) => {
        const props = object.properties;
        const jsx = [];
        //TODO: Create add button for split section that does not have elements in it
        jsx.push(
            <div className={`split-section split${props.splitType} ${object.id === selectedElementId ? "selected" : ""}`} onClick={(event) => {selectElement(object.id); event.stopPropagation();}}>
                <div className="left-side">
                    { (props.children && props.children.length > 0 && getChildById(props.children, 0)) ? getJSXOfElement(getChildById(props.children, 0)) : <div className="nested-add-element-btn" onClick={() => openAddElementModal(`L${object.id}`)}>+</div>}
                </div>
                <div className="right-side">
                    { (props.children && props.children.length > 0 && getChildById(props.children, 1)) ? getJSXOfElement(getChildById(props.children, 1)) : <div className="nested-add-element-btn" onClick={() => openAddElementModal(`R${object.id}`)} >+</div>}
                </div>
            </div> 
        );
    
        return jsx;
    }

    const getChildById = (list, position) => {
        let selected;
        list.forEach(child => {
            if(child.position == position) selected = child;
        });
        return selected;
    }
    
    const getDefaultProperties = (elementType) => {
        let props = {};
        switch(elementType) {
            case "header": 
                props = {value: "New Header", fontWeight: 400, style: "none", align: "left", headerType: "h1"};
            break;
            case "paragraph": 
                props = {value: "New paragraph", fontWeight: 400, style: "none", align: "left"};
            break;
            case "spacer": 
                props = {size: 1};
            break;
            case "hr": 
                props = {backgroundColor: "#403D52", height: "2px", width: "100%"};
            break;
            case "image": 
                props = {src: "https://via.placeholder.com/320x180", align: "center", width:"100%"}; // give default image
            break;
            case "faq": 
                props = {modules: [{id:genId(), question: "New Question?", answer: "The answer to the question"}]};
            break;
            case "split": 
                props = {children: [], splitType: 2 }; // set split to half and half?
            break;
            default: break;
        }
        return props;
    }
    const clearSelection = () => {
        setSelectedElementId(null);
        setSelectedElement(null);
    }

    const updatePropInput = (location, value) => {
        const newProps = Object.assign(selectedElement.properties);
        newProps[location] = value;
        setSelectedElement({...selectedElement, properties: newProps});
    }

    const updatePropImage = (value) => {
        const newProps = Object.assign(selectedElement.properties);
        newProps["src"] = value;
        setSelectedElement({...selectedElement, properties: newProps});
    }
    const updateFAQModuleText = (id, location, value) => {
        const newProps = Object.assign(selectedElement.properties);
        newProps["modules"] = newProps["modules"].map(faqModule => {
            if(faqModule.id === id) {
                faqModule[location] = value;
            }
            return faqModule;
        });
        setSelectedElement({...selectedElement, properties: newProps});
    }
    const removeFAQModule = (id) => {
        const newProps = Object.assign(selectedElement.properties);
        newProps["modules"] = newProps["modules"].filter(faqModule => {
            let keepItem = true;
            if(faqModule.id === id) keepItem = false;
            return keepItem;
        });
        setSelectedElement({...selectedElement, properties: newProps});
    }
    const getConfigPanelInputs = (selectedElement) => {
        const tempJSX = [];
        switch(selectedElement.type) {
            case "header": 
                tempJSX.push(
                    <div className="input-block">
                        <label className="input-label" htmlFor={`${selectedElement.id}headerType`}>Header Type</label>
                        <select className="input" id={`${selectedElement.id}headerType`} value={selectedElement.properties.headerType} onInput={event => updatePropInput("headerType", event.target.value)}>
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
                        <label className="input-label" htmlFor={`${selectedElement.id}value`}>Text</label>
                        <input className="input" type="text" id={`${selectedElement.id}value`} value={selectedElement.properties.value} onInput={event => updatePropInput("value", event.target.value)}/>
                    </div>
                );
                tempJSX.push(
                    <div className="input-block">
                        <label className="input-label" htmlFor={`${selectedElement.id}fontWeight`}>Font Weight</label>
                        <select className="input" id={`${selectedElement.id}fontWeight`} value={selectedElement.properties.fontWeight} onInput={event => updatePropInput("fontWeight", event.target.value)}>
                            <option value="200">Light</option>
                            <option value="400">Regular</option>
                            <option value="800">Bold</option>
                        </select>
                    </div>
                );
                tempJSX.push(
                    <div className="input-block">
                        <label className="input-label" htmlFor={`${selectedElement.id}style`}>Text Style</label>
                        <select className="input" id={`${selectedElement.id}style`} value={selectedElement.properties.style} onInput={event => updatePropInput("style", event.target.value)}>
                            <option value="">None</option>
                            <option value="italics">Italics</option>
                            <option value="underline">Underline</option>
                        </select>
                    </div>
                );
                tempJSX.push(
                    <div className="input-block">
                        <label className="input-label" htmlFor={`${selectedElement.id}align`}>Text Alignment</label>
                        <select className="input" id={`${selectedElement.id}align`} value={selectedElement.properties.align} onInput={event => updatePropInput("align", event.target.value)}>
                            <option value="left">Left</option>
                            <option value="center">Center</option>
                            <option value="right">Right</option>
                        </select>
                    </div>
                );
                
            break;
            case "paragraph": 
                tempJSX.push(
                    <div className="input-block">
                        <label className="input-label" htmlFor={`${selectedElement.id}value`}>Text</label>
                        <textarea className="input" type="text" id={`${selectedElement.id}value`} value={selectedElement.properties.value} onInput={event => updatePropInput("value", event.target.value)}> </textarea>
                    </div>
                );
                tempJSX.push(
                    <div className="input-block">
                        <label className="input-label" htmlFor={`${selectedElement.id}fontWeight`}>Font Weight</label>
                        <select className="input" id={`${selectedElement.id}fontWeight`} value={selectedElement.properties.fontWeight} onInput={event => updatePropInput("fontWeight", event.target.value)}>
                            <option value="200">Light</option>
                            <option value="400">Regular</option>
                            <option value="800">Bold</option>
                        </select>
                    </div>
                );
                tempJSX.push(
                    <div className="input-block">
                        <label className="input-label" htmlFor={`${selectedElement.id}style`}>Text Style</label>
                        <select className="input" id={`${selectedElement.id}style`} value={selectedElement.properties.style} onInput={event => updatePropInput("style", event.target.value)}>
                            <option value="">None</option>
                            <option value="italics">Italics</option>
                            <option value="underline">Underline</option>
                        </select>
                    </div>
                );
                tempJSX.push(
                    <div className="input-block">
                        <label className="input-label" htmlFor={`${selectedElement.id}align`}>Text Alignment</label>
                        <select className="input" id={`${selectedElement.id}align`} value={selectedElement.properties.align} onInput={event => updatePropInput("align", event.target.value)}>
                            <option value="left">Left</option>
                            <option value="center">Center</option>
                            <option value="right">Right</option>
                        </select>
                    </div>
                );
            break;
            case "spacer": 
                tempJSX.push(
                    <div className="input-block">
                        <label className="input-label" htmlFor={`${selectedElement.id}spacer`}>Space Size</label>
                        <select className="input" id={`${selectedElement.id}spacer`} value={selectedElement.properties.size} onInput={event => updatePropInput("size", event.target.value)}>
                            <option value="1">Small</option>
                            <option value="2">Medium</option>
                            <option value="3">Large</option>
                        </select>
                    </div>
                );
            break;
            case "hr": 
            //TODO change input to color input
                tempJSX.push(
                    <div className="input-block">
                        <label className="input-label" htmlFor={`${selectedElement.id}backgroundColor`}>Background Color</label>
                        <input className="input" type="text" id={`${selectedElement.id}backgroundColor`} value={selectedElement.properties.backgroundColor} onInput={event => updatePropInput("backgroundColor", event.target.value)}/>
                    </div>
                );
                tempJSX.push(
                    <div className="input-block">
                        <label className="input-label" htmlFor={`${selectedElement.id}height`}>Height</label>
                        <input className="input" type="text" id={`${selectedElement.id}height`} value={selectedElement.properties.height} onInput={event => updatePropInput("height", event.target.value)}/>
                    </div>
                );
                tempJSX.push(
                    <div className="input-block">
                        <label className="input-label" htmlFor={`${selectedElement.id}width`}>Width</label>
                        <input className="input" type="text" id={`${selectedElement.id}width`} value={selectedElement.properties.width} onInput={event => updatePropInput("width", event.target.value)}/>
                    </div>
                );
            break;
            case "image": 
                tempJSX.push(
                    <div className="input-block">
                        {/* <label className="input-label" htmlFor={`${selectedElement.id}image`}>Image</label> */}
                        <button id={`${selectedElement.id}image`} className="btn blue center" onClick={() => selectImage(updatePropImage) }>Select Image</button>
                    </div>
                );
                tempJSX.push(
                    <div className="input-block">
                        <label className="input-label" htmlFor={`${selectedElement.id}align`}>Alignment</label>
                        <select className="input" id={`${selectedElement.id}align`} value={selectedElement.properties.align} onInput={event => updatePropInput("align", event.target.value)}>
                            <option value="left">Left</option>
                            <option value="center">Center</option>
                            <option value="right">Right</option>
                        </select>
                    </div>
                );
                tempJSX.push(
                    <div className="input-block">
                        <label className="input-label" htmlFor={`${selectedElement.id}height`}>Height</label>
                        <input className="input" type="text" placeholder="auto" id={`${selectedElement.id}height`} value={selectedElement.properties.height} onInput={event => updatePropInput("height", event.target.value)}/>
                    </div>
                );
                tempJSX.push(
                    <div className="input-block">
                        <label className="input-label" htmlFor={`${selectedElement.id}width`}>Width</label>
                        <input className="input" type="text" placeholder="auto" id={`${selectedElement.id}width`} value={selectedElement.properties.width} onInput={event => updatePropInput("width", event.target.value)}/>
                    </div>
                );
            break;
            case "faq": 
            //TODO::::Add event listeners (on Clicks)
                selectedElement.properties.modules.forEach(faqModule => {
                    tempJSX.push(
                    <div className="side-faq-module-container">
                        <div className="left-side">
                            <div className="input-block">
                                <label>Q: &nbsp;</label>
                                <input type="text" className="input" value={faqModule.question} onInput={(event) => updateFAQModuleText(faqModule.id, "question", event.target.value)} />
                            </div>
                            <div className="input-block">
                                <label>A: &nbsp;</label>
                                <textarea className="input" value={faqModule.answer} onInput={(event) => updateFAQModuleText(faqModule.id, "answer", event.target.value)}> </textarea>
                            </div>
                        </div>
                        <div className="right-side">
                            <button className="cancel-btn" onClick={() => removeFAQModule(faqModule.id)}><i className="fas fa-times"></i></button>
                        </div>
                    </div>
                    );
                });
                tempJSX.push(<button className="btn blue center add" onClick={addToSelectedFAQModule}>+</button>);

            break;
            case "split": 
                tempJSX.push(
                    <div className="input-block">
                        <label className="input-label" htmlFor={`${selectedElement.id}splitType`}>Split Type</label>
                        <select className="input" id={`${selectedElement.id}splitType`} value={selectedElement.properties.splitType} onInput={event => updatePropInput("splitType", event.target.value)}>
                            <option value="1">2:1</option>
                            <option value="2">1:1</option>
                            <option value="3">1:2</option>
                        </select>
                    </div>
                );
            break;
            default: break;
        }
        return tempJSX;
    }
    const addToSelectedFAQModule = () => {
        const newProps = Object.assign(selectedElement.properties);
        newProps["modules"].push({id: genId(), question: "New Question?", answer: "The answer to the question"});
        setSelectedElement({...selectedElement, properties: newProps});
    }
    //////////////////////////////////////////////////////////////////////////////////////////////

    //get page data
    const getPageData = () => {
        const _productId =((window.location.href).split("/store/")[1]).split("/edit")[0]; 
        setProductId(_productId);
        fetch(`/api/product/edit/${_productId}`, {
            credentials:"include"
        })
        .then(response => response.json())
        .then(data => {
            if(!data) setRedirect("/");
            setTitle(data.title);
            setCoverImg(data.icon_id);
            setDescription(data.description);
            setPrice(data.price);
            setCategory(data.category);
            setPageStructure(JSON.parse(data.page_structure));
        })
        .catch(err => console.log(err));
    }
    useEffect(()=> {
        getPageData();
    }, []);

    useEffect(() => {
        convertPageStructureToJSX();
        if(newCreatedElementId) {
            selectElement(newCreatedElementId);
            setNewCreatedElementId(null);
        }
    }, [pageStructure]);

    //Update config panel with correct info when element is selected
    useEffect(() => {
        if(selectedElementId) setupConfigPanel();
    }, [selectedElement]);

    useEffect(() => {
        let newStructure = pageStructure.map(element => {
            if(element.id === selectedElementId) return selectedElement;
            return element;
        });
        setPageStructure(newStructure);
    }, [selectedElement]);

    const deleteElement = () => {
        //Remove selected element from pageStructure
        let newPageStructure = Object.assign(pageStructure);
        newPageStructure = newPageStructure.filter((element) => {
            let keepItem = true;
            if(element.id === selectedElementId) keepItem = false;
            else if(element.type === "split") {
                element.properties.children = element.properties.children.filter(child => {
                    return child.id !== selectedElementId;
                });
            }
            return keepItem;
        });
        setPageStructure(newPageStructure);
        //unselect element
        clearSelection();
    }
    const setupConfigPanel = () => {
        const jsx = [];
        let inputs;
        jsx.push(<p style={{cursor:"pointer"}} className="text-white" onClick={clearSelection}><i class="fas fa-arrow-left"></i>&nbsp; Back</p>);
        jsx.push(<h2 className="config-panel-header text-center">Edit {selectedElement ? selectedElement.type : ""}</h2>);

        inputs = getConfigPanelInputs(selectedElement);
        jsx.push(
            <div className="config-panel-body"> 
                <div className="config-panel-input-section">{inputs}</div>
                <div className="btn-group">
                    <button className="btn danger" onClick={deleteElement}>Delete</button>
                </div>
            </div>
        );
        
        setConfigPanelJSX(jsx);
    } 
    
    const selectElement = (id) => {
        setSelectedElementId(id);
        //Select element based on id
        const element = findElementInPageStructure(id);
        setSelectedElement(Object.assign(element));
    }

    const findElementInPageStructure = id => {
        let selected;
        pageStructure.forEach(element => {
            if(element.id === id) selected = element;
            else if(element.type === "split") {
                element.properties.children.forEach(child => {
                    if(child.id === id) selected = child;
                });
            }
        });
        return selected;
    }
    
    const createAddBtn = (position) => {
        return (
        <div className="inbetween-add-element-btn" onClick={() => openAddElementModal(position)}>
            <div className="bobber">+</div>
            <hr />
        </div>
        );
    }

    const convertPageStructureToJSX = () => {
        const tempJSX = [];
        pageStructure.forEach((pageElement, index) => {
            //add btn index index
            tempJSX.push(createAddBtn(index));
            tempJSX.push(getJSXOfElement(pageElement));
        });
        setPageStructureJSX(tempJSX);
    }
    const savePage = () => {
        const data = {
            product_id: productId,
            title,
            icon_id: coverImg,
            description,
            price,
            category,
            page_structure: JSON.stringify(pageStructure)

        }
        
        fetch('/api/product', {
            method: "PUT",
            credentials:"include",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
          setStatusBar("Changes have been saved");
          setTimeout(() => setStatusBar(""), 2500);

        })
        .catch(error => {
            setStatusBar("An error occured. Please refresh and try again");
            setTimeout(() => setStatusBar(""), 2500);

        });
    }

    const selectImage = (setter) => {
        setImageSelectModalSetter(() => setter);
    }

    const openAddElementModal = (addLocation) => {
        setAddElementLocation(addLocation);
        setAddModalVisible(true);
    }

    const createElement = (elementType) => {
        //CREATE ELEMENT
        //add to page structure
        const newElement = {
            type: elementType,
            position: -1, //not sure how to do order yet lol
            id: genId(),
            properties: getDefaultProperties(elementType)
        }

        if(addElementLocation === "") setPageStructure((oldState) => [...oldState, newElement]);
        else if (addElementLocation[0] === "L" || addElementLocation[0] === "R") {
            //add element to properties.children of section

            const splitSide = addElementLocation[0];
            //Get Id by removing the split position indicator 
            const id = addElementLocation.substring(1);
            let newState = pageStructure.map(element => {
                if(element.id === id && element.type === "split") {
                    newElement.position = splitSide == "L" ? 0 : 1;
                    element.properties.children.push(newElement);
                }
                return element;
            });
            setPageStructure(newState);
        }
        else {
            //add element in array based on index
            let newState = [...pageStructure];
            newState.splice(parseInt(addElementLocation), 0, newElement);
            setPageStructure(newState);


        }
        //TODO renumber the positions


        //close modal
        setAddModalVisible(false);
        //select new element
        setNewCreatedElementId(newElement.id);
    }

    const createSplitSection = () => {
        if(typeof(addElementLocation) !== "string" || addElementLocation === "" || !addElementLocation[0] === "L" && !addElementLocation[0] === "R") {
            createElement("split") ;
        } 
    }

    if (redirect === "/") return (<Redirect to={{pathname: redirect}} />);
    else if (redirect) return (<Redirect push to={{pathname: redirect}} />); // if user clicks cancel btn, route back to their account page and keep the browser history
    return(
        <>
        <div className={statusBar ? "status-bar open" : "status-bar"}><p>{statusBar}</p></div>
        <div className="product-page edit">
            <div className="product-main container">

                {pageStructureJSX}
                
                {/* Add NEW ELEMENT BUTTON */}
                <div className="open-add-element-btn" onClick={() => openAddElementModal("")}>
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
                            <div className={`add-element-btn ${addElementLocation[0] === "L" || addElementLocation[0] === "R" ? "disabled": ""}`} onClick={createSplitSection}>Split Section</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="product-side container gradient">
                <SideBar configPanelJSX={configPanelJSX} coverImg={coverImg} selectImage={selectImage} setCoverImg={setCoverImg}
                    title={title} setTitle={setTitle} price={price} setPrice={setPrice} category={category} setCategory={setCategory}
                    description={description} setDescription={setDescription} savePage={savePage} selectedElementId={selectedElementId}
                    username={username} setRedirect={setRedirect}
                />
            </div>
        </div>
        <ImageSelectModal setter={imageSelectModalSetter} setSetter={setImageSelectModalSetter} />
    
        <div className={`screen ${addModalVisible ? "visible" : ""}`} id="addModalScreen" onClick={() => setAddModalVisible(false)}></div>
        </>
    );

}





function SideBar({configPanelJSX, selectedElementId, coverImg, selectImage, setCoverImg, title, setTitle, price, setPrice, category, setCategory, description, setDescription, savePage, username, setRedirect}) {
    if (configPanelJSX.length > 0 && selectedElementId != null) return (<div className="config-menu">{configPanelJSX}</div>);
    else return (
        <div className="product-details">
        <div className="options">
            <div className="input-block">
                <label className="input-label">Cover Image</label>
                <div className="cover-img-container">
                    {coverImg ? <img src={coverImg} alt="cover-img" onClick={() => selectImage(setCoverImg)} /> : <h1 onClick={() => selectImage(setCoverImg)}>+</h1>}
                </div>
            </div>
            <div className="input-block">
                <label className="input-label">Service Title</label>
                <input className="input" type="text" value={title} onInput={event => setTitle(event.target.value)}/>
            </div>
            <div className="input-block">
                <label className="input-label">Price</label>
                <div className="combo-input">
                    <div className="unit-display">$</div>
                    <input className="input" type="number" value={price} onInput={event => {setPrice(event.target.value)}} />
                </div>
            </div>
            <div className="input-block">
                <label className="input-label">Category</label>
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
                <label className="input-label">Service Description</label>
                <textarea className="input" type="text" value={description} onInput={event => setDescription(event.target.value)}/>
            </div>
        </div>
        <div className="btn-group">
            <button className="btn blue-outline text-white" onClick={() => setRedirect(`/account/${username}`)}>Return</button>
            <button className="btn blue" onClick={savePage}>Save Changes</button>
        </div>
        </div>
    );
};



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


