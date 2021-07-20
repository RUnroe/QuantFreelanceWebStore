import {
  StaticRouter,
  BrowserRouter,
  Redirect,
  Switch,
  Route,
  Link
} from "react-router-dom";
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

import NavigationMenu from "./partials/navbar";

import './App.css';
import { useEffect, useState } from "react";

function AuthenticatedRoute({currAuthLevel, reqAuthLevel, component}) {
  if(currAuthLevel == "seller" || (currAuthLevel == "buyer" && reqAuthLevel == "buyer")) return component;
  else if (currAuthLevel == "buyer" && reqAuthLevel == "seller") return <Redirect to={{pathname: '/'}} />
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
  const [currUser, setCurrUser] = useState({});
  useEffect(() => {
    const checkAuth = async () => {
      fetch('/api/auth', {credentials:"include"})
      .then(response => response.json())
      .then(data => {
        setCurrUser(data);
        setCurrAuthLevel(data.authLevel);
      })
      .catch(error => setCurrAuthLevel(""));
      //setCurrAuthLevel("seller");
    }
    checkAuth();
  }, []);
  if (currAuthLevel === undefined || currAuthLevel === null) return(<div></div>);
  return (
    <BrowserRouter>

    <NavigationMenu currAuthLevel={currAuthLevel} username={currUser.username}/>
    
    <div id="main">
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/signup">
          <AuthenticatedRoute currAuthLevel={currAuthLevel} component={<SignupPage />} reqAuthLevel="" />
        </Route>
        <Route exact path="/login">
          <AuthenticatedRoute currAuthLevel={currAuthLevel} component={<LoginPage />} reqAuthLevel="" />
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
          <AuthenticatedRoute currAuthLevel={currAuthLevel} component={<AccountSettingsPage />} reqAuthLevel="buyer" />
        </Route>
        <Route exact path="/account/history/purchase">
          <AuthenticatedRoute currAuthLevel={currAuthLevel} component={<PurchaseHistoryPage />} reqAuthLevel="buyer" />
        </Route>
        <Route exact path="/account/history/sell">
          <AuthenticatedRoute currAuthLevel={currAuthLevel} component={<SellHistoryPage />} reqAuthLevel="seller" />
        </Route>
        <Route exact path="/account/:username">
          <AccountPage />
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
  </BrowserRouter>
  );
}

export default App;
