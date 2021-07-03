import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import SearchPage from './SearchPage';
import CategoryPage from './CategoryPage';
import ProductPage from './ProductPage';
import ProductEditPage from './ProductEditPage';
import PurchasePage from './PurchasePage';
import AccountPage from './AccountPage';
import AccountSettingsPage from './AccountSettingsPage';
import PurchaseHistoryPage from './PurchaseHistoryPage';
import SellHistoryPage from './SellHistoryPage';
import InboxPage from './InboxPage';
import OrdersPage from './OrdersPage';


import './App.css';

function App() {
  return (
    <Router>
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/signup">Sign Up</Link>
        </li>
        <li>
          <Link to="/login">Log In</Link>
        </li>
      </ul>

      <hr />

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
        <Route path="/signup">
          <SignupPage />
        </Route>
        <Route path="/login">
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
  </Router>
  );
}

export default App;
