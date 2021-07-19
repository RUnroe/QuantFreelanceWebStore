import {
  StaticRouter,
  BrowserRouter,
  Redirect,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Cookie from "js-cookie";
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import SearchPage from './pages/SearchPage';
import CategoryPage from './pages/CategoryPage';
import ProductPage from './pages/ProductPage';
import ProductEditPage from './pages/ProductEditPage';
import PurchasePage from './pages/PurchasePage';
import AccountPage from './pages/AccountPage';
import AccountSettingsPage from './pages/AccountSettingsPage';
import PurchaseHistoryPage from './pages/PurchaseHistoryPage';
import SellHistoryPage from './pages/SellHistoryPage';
import InboxPage from './pages/InboxPage';
import OrdersPage from './pages/OrdersPage';

import './App.css';
import { useEffect, useState } from "react";

function AuthenticatedRoute({currAuthLevel, reqAuthLevel, component}) {
  console.log(Cookie.get());
  if(currAuthLevel == "seller" || (currAuthLevel == "buyer" && reqAuthLevel == "buyer")) {console.log("Auth is good mate"); return component;}
  return <Redirect to={{pathname: '/login'}} />
}

// nav
//   div.primary-nav.section
//       div
//           a(href="/").nav-logo
//               img(src="https://via.placeholder.com/135x45", alt="logo")
//       div
//           a(href="signup").nav-item Sign Up
//           a(href="login").nav-item Log In
//   hr
//   div.secondary-nav.section
//       each val in ["Design & Art", "Sales & Marketing", "Business & Finance", "Writing & Translation", "Video & Animation", "Audio & Music", "Programming & Tech", "Engineering & Architecture", "Education & Training"]
//           a(href=val.replace(" & ", "-").toLowerCase()).secondary-nav-item= val
function App() {
  const [currAuthLevel, setCurrAuthLevel] = useState();
  useEffect(() => {
    const checkAuth = async () => {
      fetch('/api/checkAuth', {credentials:include})
      .then(response => response.json())
      .then(data => setCurrAuthLevel(data.authLevel ? data.authLevel : ""));
    }
    checkAuth();
  }, []);

  return (
    <BrowserRouter>
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
      <div className="secondary-nav section">

      </div>
    </nav>
    <div id="main">
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/signup">
          <SignupPage />
        </Route>
        <Route exact path="/login">
          <LoginPage />
        </Route>
        <Route exact path="/store/search">
          <SearchPage />
        </Route>
        <Route exact path="/store/category/:category_name">
          <CategoryPage />
        </Route>
        <Route exact path="/store/:product_id/edit">
          <AuthenticatedRoute currAuthLevel={currAuthLevel} component={<ProductEditPage />} reqAuthLevel="seller" />
        </Route>
        <Route exact path="/store/:product_id">
          <ProductPage />
        </Route>
        <Route exact path="/purchase/:product_id">
          <AuthenticatedRoute currAuthLevel={currAuthLevel} component={<PurchasePage />} reqAuthLevel="buyer" />
        </Route>
        <Route exact path="/account/settings">
          <AccountSettingsPage />
        </Route>
        <Route exact path="/account/history/purchase">
          <PurchaseHistoryPage />
        </Route>
        <Route exact path="/account/history/sell">
          <SellHistoryPage />
        </Route>
        <Route exact path="/account/:username">
          <AccountPage />
        </Route>
        <Route exact path="/inbox">
          <InboxPage />
        </Route>
        <Route exact path="/orders">
          <OrdersPage />
        </Route>
        <Route path="/">
          <Redirect to={{pathname: '/'}} />
        </Route>
      </Switch>
    </div>
  </BrowserRouter>
  );
}

export default App;
