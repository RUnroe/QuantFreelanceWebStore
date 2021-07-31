import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function SecondaryNavigationMenu() {
    const pages = ["Design & Art", "Sales & Marketing", "Business & Finance", "Writing & Translation", "Video & Animation", "Audio & Music", "Programming & Tech", "Engineering & Architecture", "Education & Training"];
    const jsxElements = [];
    pages.forEach(value => {
        jsxElements.push(<a href={`/store/category/${value.replace(" & ", "-").toLowerCase()}`} className="secondary-nav-item" key={value}>{value}</a>)
    });

    const [scrollElement, setScrollElement] = useState();
    const scrollSecondaryNav = direction => {
        if(direction === "left") {
            scrollElement.scrollLeft = 0;
        }
        else {
            scrollElement.scrollLeft = 100000;
        }
    }
    const listener = e => {
        // if(scrollElement) console.log(scrollElement.scrollLeft);
        setScrollElement(document.getElementById("secondaryNavList"));
    };
    useEffect(() => {
        document.getElementById("secondaryNavList").addEventListener("scroll", listener);
        listener();
        return () => {
            document.getElementById("secondaryNavList").removeEventListener("scroll", listener);
        };
      });

    return (
        <div className="secondary-nav section">
            <div className="nav-scroll left" onClick={() => scrollSecondaryNav("left")}><i className="fas fa-angle-left"></i></div>
            <div className="nav-item-list" id="secondaryNavList"> {jsxElements} </div>
            <div className="nav-scroll right" onClick={() => scrollSecondaryNav("right")}><i className="fas fa-angle-right"></i></div>
        </div>
    );
}




export default function NavigationMenu({currAuthLevel, username}) {
    const logoutUser = () => {

    }
    if(currAuthLevel === "seller") {
        return (
        <nav>
            <div className="primary-nav section">
                <div>
                <Link className="nav-logo" to="/"><img src="https://via.placeholder.com/135x45" alt="logo" /></Link>
                </div>
                <div>
                    <div className="dropdown">
                        <div className="nav-item dropdown-toggle"><Link to="/orders">Orders <i className="fas fa-angle-down"></i></Link></div>
                        <ul className="dropdown-menu">
                            <li className="dropdown-item"><Link to="/orders">Orders</Link></li>
                            <li className="dropdown-item"><Link to="/inbox">Inbox</Link></li>
                            <li className="dropdown-item"><Link to="/account/history/purchase">Purchase History</Link></li>
                            <li className="dropdown-item"><Link to="/account/history/sell">Sell History</Link></li>
                        </ul>
                    </div>
                    <div className="dropdown">
                        <div className="nav-item dropdown-toggle"><Link to={`/account/${username}`}>Account <i className="fas fa-angle-down"></i></Link></div>
                        <ul className="dropdown-menu">
                            <li className="dropdown-item"><Link to={`/account/${username}`}>Profile</Link></li>
                            <li className="dropdown-item"><Link to="/account/settings/">Settings</Link></li>
                            <li className="dropdown-item"><button onClick={logoutUser}>Log out</button></li>
                        </ul>
                    </div>

                </div>
            </div>
            <hr />
            <SecondaryNavigationMenu />
            <hr />
        </nav>
        );
    }
    else if (currAuthLevel === "buyer") {
        return (
        <nav>
            <div className="primary-nav section">
                <div>
                <Link className="nav-logo" to="/"><img src="https://via.placeholder.com/135x45" alt="logo" /></Link>
                </div>
                <div>
                    <div className="dropdown">
                        <div className="nav-item dropdown-toggle"><Link to="/orders">Orders <i className="fas fa-angle-down"></i></Link></div>
                        <ul className="dropdown-menu">
                            <li className="dropdown-item"><Link to="/orders">Orders</Link></li>
                            <li className="dropdown-item"><Link to="/account/history/purchase">Purchase History</Link></li>
                        </ul>
                    </div>
                    <div className="dropdown">
                        <div className="nav-item dropdown-toggle"><Link to={`/account/${username}`}>Account <i className="fas fa-angle-down"></i></Link></div>
                        <ul className="dropdown-menu">
                            <li className="dropdown-item"><Link to={`/account/${username}`}>Profile</Link></li>
                            <li className="dropdown-item"><Link to="/account/settings/">Settings</Link></li>
                            <li className="dropdown-item"><button onClick={logoutUser}>Log out</button></li>
                        </ul>
                    </div>

                </div>
            </div>
            <hr />
            <SecondaryNavigationMenu />
            <hr />

        </nav>
        );
        
    }
    return (
        <nav>
            <div className="primary-nav section">
                <div>
                <Link className="nav-logo" to="/"><img src="https://via.placeholder.com/135x45" alt="logo" /></Link>
                </div>
                <div>
                <Link className="nav-item" to="/signup">Sign Up</Link>
                <Link className="nav-item" to="/login">Log In</Link>
                </div>
            </div>
            <hr />
            <SecondaryNavigationMenu />
            <hr />

        </nav>
        );
}