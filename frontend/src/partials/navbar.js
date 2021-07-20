import { Link } from "react-router-dom";

export default function NavigationMenu({currAuthLevel, username}) {
    const logoutUser = () => {

    }
    if(currAuthLevel == "seller") {
        return (
        <nav>
            <div className="primary-nav section">
                <div>
                <Link className="nav-logo" to="/store"><img src="https://via.placeholder.com/135x45" alt="logo" /></Link>
                </div>
                <div>
                    <div className="nav-item dropdown">
                        <div className="dropdown-toggle">Orders <i class="fas fa-angle-down"></i></div>
                        <ul className="dropdown-menu">
                            <li className="dropdown-item"><Link to="/orders">Orders</Link></li>
                            <li className="dropdown-item"><Link to="/inbox">Inbox</Link></li>
                            <li className="dropdown-item"><Link to="/account/history/purchase">Purchase History</Link></li>
                            <li className="dropdown-item"><Link to="/account/history/sell">Sell History</Link></li>
                        </ul>
                    </div>
                    <div className="nav-item dropdown">
                        <div className="dropdown-toggle"><Link to={`/account/${username}`}>Account <i class="fas fa-angle-down"></i></Link></div>
                        <ul className="dropdown-menu">
                            <li className="dropdown-item"><Link to={`/account/${username}`}>Profile</Link></li>
                            <li className="dropdown-item"><Link to="/account/settings/">Settings</Link></li>
                            <li className="dropdown-item"><button onClick={logoutUser}>Log out</button></li>
                        </ul>
                    </div>
                    <Link className="nav-item" to="/signup">Sign Up</Link>
                    <Link className="nav-item" to="/login">Log In</Link>
                </div>
            </div>
            <hr />
            <div className="secondary-nav section">

            </div>
        </nav>
        );
    }
    else if (currAuthLevel == "buyer") {
        return (
            <nav>
            <div className="primary-nav section">
                <div>
                <Link className="nav-logo" to="/store"><img src="https://via.placeholder.com/135x45" alt="logo" /></Link>
                </div>
                <div>
                <Link className="nav-item" to="/signup">Sign Up</Link>
                <Link className="nav-item" to="/login">Log In</Link>
                </div>
            </div>
            <hr />
            <div className="secondary-nav section">

            </div>
        </nav>
        );
        
    }
    return (
        <nav>
            <div className="primary-nav section">
                <div>
                <Link className="nav-logo" to="/store"><img src="https://via.placeholder.com/135x45" alt="logo" /></Link>
                </div>
                <div>
                <Link className="nav-item" to="/signup">Sign Up</Link>
                <Link className="nav-item" to="/login">Log In</Link>
                </div>
            </div>
            <hr />
            <div className="secondary-nav section">

            </div>
        </nav>
        );
}