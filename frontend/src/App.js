import {
  StaticRouter,
  BrowserRouter,
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


import './App.css';
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
      {/*
        A <Switch> looks through all its children <Route>
        elements and renders the first one whose path
        matches the current URL. Use a <Switch> any time
        you have multiple routes, but you want only one
        of them to render at a time
      */}
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
        <Route path="/store/search">
          <SearchPage />
        </Route>
        <Route path="/store/category/:category_name">
          <CategoryPage />
        </Route>
        <Route path="/store/:product_id/edit">
          <ProductEditPage />
        </Route>
        <Route path="/store/:product_id">
          <ProductPage />
        </Route>
        <Route path="/purchase/:product_id">
          <PurchasePage />
        </Route>
        <Route path="/account/settings">
          <AccountSettingsPage />
        </Route>
        <Route path="/account/history/purchase">
          <PurchaseHistoryPage />
        </Route>
        <Route path="/account/history/sell">
          <SellHistoryPage />
        </Route>
        <Route path="/account/:username">
          <AccountPage />
        </Route>
        <Route path="/inbox">
          <InboxPage />
        </Route>
        <Route path="/orders">
          <OrdersPage />
        </Route>
      </Switch>
    </div>
  </BrowserRouter>
  );
}

export default App;
