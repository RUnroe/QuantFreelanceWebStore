import React, { useEffect, useState } from "react";
import "../styles/productPage.css";
import {Redirect, Link} from "react-router-dom";


//////////////////////////////////////////////////////////////////////////////////////////////
export default function ProductPage() {
    const [productId, setProductId] = useState();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState("");
    const [pageStructure, setPageStructure] = useState([]);
    const [pageStructureJSX, setPageStructureJSX] = useState([]);
    const [redirect, setRedirect] = useState("");

    const [user, setUser] = useState();
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


    
   

    //get page data
    const getPageData = () => {
        const _productId =((window.location.href).split("/store/")[1]); 
        setProductId(_productId);
        fetch(`/api/product/${_productId}`)
        .then(response => response.json())
        .then(data => {
            if(!data) setRedirect(true);
            setTitle(data.title);
            setDescription(data.description);
            setPrice(data.price);
            setCategory(data.category);
            setPageStructure(JSON.parse(data.page_structure));

            //get seller info
            fetch(`/api/user/${data.seller}`).then(result => result.json())
            .then(data => setUser(data));
        })
        .catch(err => console.log(err));
    }
    useEffect(()=> {
        getPageData();
    }, []);
    useEffect(()=> {
        convertPageStructureToJSX();
    }, [pageStructure]);

    const convertPageStructureToJSX = () => {
        const tempJSX = [];
        pageStructure.forEach(pageElement => {
            tempJSX.push(getJSXOfElement(pageElement));
        });
        setPageStructureJSX(tempJSX);
    }
    
    


    if (redirect) return (<Redirect to={{pathname: redirect}} />);
    return(
        <>
        <div className="product-page display">
            <div className="product-main container">
                {pageStructureJSX}
            </div>
            <div className="product-side container gradient">
                <SideBar title={title} price={price} category={category} description={description} user={user}  />
            </div>
        </div>
    
        </>
    );

}


const getCategoryTitle = (categorySelector) => {
    switch(categorySelector) {
        case "DesignArt": return "Design & Art";
        case "SalesMarketing": return "Sales & Marketing";
        case "BusinessFinance": return "Business & Finance";
        case "WritingTranslation": return "Writing & Translation";
        case "VideoAnimation": return "Video & Animation";
        case "AudioMusic": return "Audio & Music";
        case "ProgrammingTech": return "Programming & Tech";
        case "EngineeringArchitecture": return "Engineering & Architecture";
        case "EducationTraining": return "Education & Training";
        default: return "";
    }
}


function SideBar({title, price, category, description, user}) {
    return (
        <div className="product-details">
            <div className="top">
                <div className="product-details-header">
                    <h2>{title}</h2>
                    <div className="price-display">{`$${price}`}</div>
                </div>
                <p className="category">{getCategoryTitle(category)}</p>
                <p className="description">{description}</p>
            </div>

            <div className="bottom">
                <Link to={`/account/${user.username}`}>
                    <div className="profile-display">
                        <div className="round-img-container"> {user ? <img src={user.icon_id} /> : <></>}</div>
                        <div>
                            <p className="profile-name">{user ? `${user.first_name} ${user.last_name}`: ""}</p>
                            <p className="profile-username">{user ? `@${user.username}` : ""}</p>
                        </div>
                    </div>
                </Link>
                <button className="btn blue wide center">Purchase</button>
            </div>
        </div>
    );
};




