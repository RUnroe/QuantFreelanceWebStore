import {
  BrowserRouter,
  Redirect,
  Switch,
  Route,
} from "react-router-dom";
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import SearchPage from './pages/SearchPage';
import CategoryPage from './pages/CategoryPage';
import ProductPage from './pages/ProductPage';
import ProductEditPage from './pages/ProductEditPage';
import PurchasePage from './pages/PurchasePage';
import PurchasedPage from './pages/PurchasedPage';
import AccountPage from './pages/AccountPage';
import AccountSettingsPage from './pages/AccountSettingsPage';
import PurchaseHistoryPage from './pages/PurchaseHistoryPage';
import SellHistoryPage from './pages/SellHistoryPage';
import InboxPage from './pages/InboxPage';
import OrdersPage from './pages/OrdersPage';

import NavigationMenu from "./partials/navbar";

import './styles/quant.css';
import './styles/navbar.css';

import { useEffect, useState } from "react";

function AuthenticatedRoute({currAuthLevel, reqAuthLevel, component}) {
  // if(reqAuthLevel == "noAuth" && (currAuthLevel == "" || currAuthLevel == undefined || currAuthLevel == null)) return component;
  // else if(currAuthLevel == "seller" || (currAuthLevel == "buyer" && reqAuthLevel == "buyer")) return component;
  // else if (currAuthLevel == "buyer" && reqAuthLevel == "seller") return <Redirect to={{pathname: '/'}} />
  // return <Redirect to={{pathname: '/login'}} />;

  if(reqAuthLevel === "noAuth") {
    if(currAuthLevel === "" || currAuthLevel === undefined || currAuthLevel === null) return component;
    return <Redirect to={{pathname: '/'}} />;
  }
  else if (reqAuthLevel === "buyer") {
    if(currAuthLevel === "" || currAuthLevel === undefined || currAuthLevel === null) return <Redirect to={{pathname: '/login'}} />;
    return component;
  }
  else if(reqAuthLevel === "seller") {
    if(currAuthLevel === "buyer") return <Redirect to={{pathname: '/'}} />;
    if(currAuthLevel === "seller") return component;
    return <Redirect to={{pathname: '/login'}} />;
  }
  return <Redirect to={{pathname: '/login'}} />;
}
function Footer() {
  return (
    <footer>
      <div className="section">
        <div> 
            <img src="https://via.placeholder.com/135x45" alt="footer logo" />
            <span>&copy;Quant Freelance</span>
        </div> 
        <span>ryanunroe@gmail.com</span>
      </div>
    </footer>
  );
}

function App() {
  const [currAuthLevel, setCurrAuthLevel] = useState();
  const [currUser, setCurrUser] = useState({});
  const checkAuth = async () => {
    fetch('/api/auth', {credentials:"include"})
    .then(response => response.json())
    .then(data => {
      setCurrUser(data);
      setCurrAuthLevel(data.authLevel);
    })
    .catch(error => setCurrAuthLevel(""));
  }
  useEffect(() => {
    
    //Enable for dev purposes
    //setCurrAuthLevel("seller");
    //setCurrAuthLevel("buyer");
    checkAuth();
  }, []);
  if (currAuthLevel === undefined || currAuthLevel === null) return(<div></div>);
  return (
    <BrowserRouter>

    <NavigationMenu currAuthLevel={currAuthLevel} setCurrAuthLevel={setCurrAuthLevel} username={currUser.username}/>
    
    <div id="main">
      <Switch>
        <Route exact path="/">
          <HomePage currAuthLevel={currAuthLevel} username={currUser.username}/>
        </Route>
        <Route exact path="/signup">
          <AuthenticatedRoute currAuthLevel={currAuthLevel} component={<SignupPage checkAuth={checkAuth}/>} reqAuthLevel="noAuth" />
        </Route>
        <Route exact path="/login">
          <AuthenticatedRoute currAuthLevel={currAuthLevel} component={<LoginPage checkAuth={checkAuth}/>} reqAuthLevel="noAuth" />
        </Route>
        <Route exact path="/store/search/:search_term">
          <SearchPage />
        </Route>
        <Route exact path="/store/category/:category_name">
          <CategoryPage />
        </Route>
        <Route exact path="/store/:product_id/edit">
          <AuthenticatedRoute currAuthLevel={currAuthLevel} component={<ProductEditPage username={currUser.username}/>} reqAuthLevel="seller" />
        </Route>
        <Route exact path="/store/:product_id">
          <ProductPage userId={currUser && currUser.user_id ? currUser.user_id : ""}/>
        </Route>
        <Route exact path="/purchase/:product_id">
          <AuthenticatedRoute currAuthLevel={currAuthLevel} component={<PurchasePage userId={currUser.user_id}/>} reqAuthLevel="buyer" />
        </Route>
        <Route exact path="/purchased/:order_id">
          <AuthenticatedRoute currAuthLevel={currAuthLevel} component={<PurchasedPage />} reqAuthLevel="buyer" />
        </Route>
        <Route exact path="/account/settings">
          <AuthenticatedRoute currAuthLevel={currAuthLevel} component={<AccountSettingsPage user={currUser} checkAuth={checkAuth} />} reqAuthLevel="buyer" />
        </Route>
        <Route exact path="/account/history/purchase">
          <AuthenticatedRoute currAuthLevel={currAuthLevel} component={<PurchaseHistoryPage />} reqAuthLevel="buyer" />
        </Route>
        <Route exact path="/account/history/sell">
          <AuthenticatedRoute currAuthLevel={currAuthLevel} component={<SellHistoryPage />} reqAuthLevel="seller" />
        </Route>
        <Route exact path="/account/:username">
          <AccountPage currUser={currUser} authLevel={currAuthLevel} checkAuth={checkAuth} />
        </Route>
        <Route exact path="/inbox">
          <AuthenticatedRoute currAuthLevel={currAuthLevel} component={<InboxPage />} reqAuthLevel="seller" />
        </Route>
        <Route exact path="/orders">
          <AuthenticatedRoute currAuthLevel={currAuthLevel} component={<OrdersPage />} reqAuthLevel="buyer" />
        </Route>
        <Route path="/">
          <Redirect to={{pathname: '/'}} />
        </Route>
      </Switch>
    </div>
    <Footer />
  </BrowserRouter>
  );
}

export default App;
