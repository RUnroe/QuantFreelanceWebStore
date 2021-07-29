import React, { useEffect, useState } from "react";
import "../styles/productPage.css";
import {ImageSelectModal} from "../partials/image";
import {Redirect} from "react-router-dom";


//////////////////////////////////////////////////////////////////////////////////////////////
export default function ProductPage() {
    const [productId, setProductId] = useState();
    const [title, setTitle] = useState("");
    const [coverImg, setCoverImg] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState("");
    const [pageStructure, setPageStructure] = useState([]);
    const [pageStructureJSX, setPageStructureJSX] = useState([]);
    const [redirect, setRedirect] = useState("");
    //////////////////////////////////////////////////////////////////////////////////////////////

    
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
                jsx.push(<h2 className={`header `} style={style}>{props.value}</h2>);
            break;
            case "h3":
                jsx.push(<h3 className={`header `} style={style}>{props.value}</h3>);
            break;
            case "h4":
                jsx.push(<h4 className={`header `} style={style}>{props.value}</h4>);
            break;
            case "h5":
                jsx.push(<h5 className={`header `} style={style}>{props.value}</h5>);
            break;
            case "h6":
                jsx.push(<h6 className={`header `} style={style}>{props.value}</h6>);
            break;
            default:
                jsx.push(<h1 className={`header `} style={style}>{props.value}</h1>);
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
    
        jsx.push(<p className={`paragraph `} style={style} >{props.value}</p>);
    
        return jsx;
    }
    
    const convertSpacer = (object) => {
        const props = object.properties;
        const jsx = [];
        jsx.push(<div className={`spacer space${props.size} `} ></div>);
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
        jsx.push(<hr className={`hr `} style={style} />);
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
        jsx.push(<img className={`image `} alt={object.id + "image"} style={style} src={props.src}  />);
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
            <div className={`faq-container `} >
              {modulesJSX}  
            </div>
        );
    
        return jsx;
    }
    
    const convertSplit = (object) => {
        const props = object.properties;
        const jsx = [];
        jsx.push(
            <div className={`split-section split${props.splitType} `} >
                <div className="left-side">
                    { (props.children && props.children.length > 0 && getChildById(props.children, 0)) ? getJSXOfElement(getChildById(props.children, 0)) : <> </>}
                </div>
                <div className="right-side">
                    { (props.children && props.children.length > 0 && getChildById(props.children, 1)) ? getJSXOfElement(getChildById(props.children, 1)) : <> </>}
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
    //??
    // const getDefaultProperties = (elementType) => {
    //     let props = {};
    //     switch(elementType) {
    //         case "header": 
    //             props = {value: "New Header", fontWeight: 400, style: "none", align: "left", headerType: "h1"};
    //         break;
    //         case "paragraph": 
    //             props = {value: "New paragraph", fontWeight: 400, style: "none", align: "left"};
    //         break;
    //         case "spacer": 
    //             props = {size: 1};
    //         break;
    //         case "hr": 
    //             props = {backgroundColor: "#403D52", height: "2px", width: "100%"};
    //         break;
    //         case "image": 
    //             props = {src: "https://via.placeholder.com/320x180", align: "center"}; // give default image
    //         break;
    //         case "faq": 
    //             props = {modules: [{id:genId(), question: "New Question?", answer: "The answer to the question"}]};
    //         break;
    //         case "split": 
    //             props = {children: [], splitType: 2 }; // set split to half and half?
    //         break;
    //         default: break;
    //     }
    //     return props;
    // }


    
   

    //get page data
    const getPageData = () => {
        const _productId =((window.location.href).split("/store/")[1]); 
        setProductId(_productId);
        fetch(`/api/product/${_productId}`)
        .then(response => response.json())
        .then(data => {
            if(!data) setRedirect(true);
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
    

    const convertPageStructureToJSX = () => {
        const tempJSX = [];
        pageStructure.forEach(pageElement => {
            tempJSX.push(getJSXOfElement(pageElement));
        });
        setPageStructureJSX(tempJSX);
    }
    
    


    if (redirect) return (<Redirect to={{pathname: '/'}} />);
    return(
        <>
        <div className="product-page edit">
            <div className="product-main container">
                {pageStructureJSX}
            </div>
            <div className="product-side container gradient">
                <SideBar title={title} price={price} category={category} description={description} />
            </div>
        </div>
    
        </>
    );

}





function SideBar({title, price, category, description}) {
    return <></>;
    // return (
    //     <div className="product-details">
    //     <div className="options">
    //         <div className="input-block">
    //             <label className="input-label">Product Title</label>
    //             <input className="input" type="text" value={title} onInput={event => setTitle(event.target.value)}/>
    //         </div>
    //         <div className="input-block">
    //             <label className="input-label">Price</label>
    //             <div className="combo-input">
    //                 <input className="input" type="number" value={price} onInput={event => {console.log(event.target.value); setPrice(event.target.value)}} />
    //             </div>
    //         </div>
    //         <div className="input-block">
    //             <label className="input-label">Category</label>
    //             <select className="input" value={category} onInput={event => setCategory(event.target.value)}>
    //                 <option value="DesignArt">Design &amp; Art</option>
    //                 <option value="SalesMarketing">Sales &amp; Marketing</option>
    //                 <option value="BusinessFinance">Business &amp; Finance</option>
    //                 <option value="WritingTranslation">Writing &amp; Translation</option>
    //                 <option value="VideoAnimation">Video &amp; Animation</option>
    //                 <option value="AudioMusic">Audio &amp; Music</option>
    //                 <option value="ProgrammingTech">Programming &amp; Tech</option>
    //                 <option value="EngineeringArchitecture">Engineering &amp; Architecture</option>
    //                 <option value="EducationTraining">Education &amp; Training</option>
    //             </select>
    //         </div>
    //         <div className="input-block">
    //             <label className="input-label">Product Description</label>
    //             <textarea className="input" type="text" value={description} onInput={event => setDescription(event.target.value)}/>
    //         </div>
    //     </div>
    //     <div className="btn-group">
    //         <button className="btn blue-outline text-white">Cancel</button>
    //         <button className="btn blue" onClick={savePage}>Save Changes</button>
    //     </div>
    //     </div>
    // );
};




