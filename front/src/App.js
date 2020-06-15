import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { ProtectedRouteUser, ProtectedRouteSupplier }from "./protectedRoute";

import HomePage from './Pages/HomePage';
import Navbar from './components/Navbar';
import Logout from './components/logout/Logout';
import Error404Page from "./Pages/Error404Page";

import RegisterSupplierPage from './Pages/Supplier/RegisterSupplierPage';
import LoginSupplierPage from './Pages/Supplier/LoginSupplierPage';
import ProfileSettingSupplierPage from './Pages/Supplier/ProfileSettingSupplierPage';
import ProfileSupplierPage from "./Pages/Supplier/ProfileSupplierPage";
import RepDevis from './Pages/Supplier/RepDevis'
import DevisSupplierPage from './Pages/Supplier/DevisSupplierPage'

import RegisterUserPage from './Pages/User/RegisterUserPage';
import LoginUserPage from './Pages/User/LoginUserPage'
import ProfileSettingUserPage from "./Pages/User/ProfileSettingUserPage";
import ProfileUserPage from "./Pages/User/ProfileUserPage"


import AdminPage from "./Pages/Admin/AdminPage";
import AdminUsersPage from "./Pages/Admin/AdminUsersPage";
import AdminSuppliersPage from "./Pages/Admin/AdminSuppliersPage";
import AdminDevisPage from "./Pages/Admin/AdminDevisPage";
import AdminCommentsPage from "./Pages/Admin/AdminCommentsPage";
import AdminCRUDUserPage from "./Pages/Admin/AdminCRUDUserPage";
import AdminCRUDSupplierPage from "./Pages/Admin/AdminCRUDSupplierPage";
import AdminCRUDCommentsPage from "./Pages/Admin/AdminCRUDCommentsPage";
import AdminCRUDDevisPage from "./Pages/Admin/AdminCRUDDevisPage";
// import AdminUsersCreate from "./Pages/Admin/AdminUsersCreate";
// import AdminQuoteCreate from "./Pages/Admin/AdminQuoteCreate";



function App() {

  return (
    <div className="container">
      <BrowserRouter>

      <Navbar />

        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/logout"><Logout /></Route>

          {/* Register */}
          <Route path="/registerUser" component={RegisterUserPage} />
          <Route path="/registerSupplier" component={RegisterSupplierPage} />

          {/* Login */}
          <Route path="/loginUser" component={LoginUserPage} />
          <Route path="/loginSupplier" component={LoginSupplierPage} />

          {/* Users */}

          <ProtectedRouteUser exact path="/account/edit" component={ProfileSettingUserPage} />
          <ProtectedRouteUser exact path="/account/profile" component={ProfileUserPage} />


          {/* Suppliers */}
          <Route exact path="/accountsupplier/:id" component={ProfileSupplierPage} />
          <ProtectedRouteSupplier  exact path="/supplier/edit" component={ProfileSettingSupplierPage} />
          <ProtectedRouteSupplier  exact path="/supplier/repDevis/:id" component={RepDevis} />
          <Route path="/supplier/devis" component={DevisSupplierPage} />
          
          {/* Admin */}
          <Route exact path="/admin" component={AdminPage} />
          <Route path="/admin/users" component={AdminUsersPage} />
          <Route path="/admin/suppliers" component={AdminSuppliersPage} />
          <Route path="/admin/comments" component={AdminCommentsPage} />
          <Route path="/admin/quotes" component={AdminDevisPage} />
          <Route path="/admin/user/:_id" component={AdminCRUDUserPage} />
          <Route path="/admin/supplier/:id" component={AdminCRUDSupplierPage} />
          <Route path="/admin/comment/:id" component={AdminCRUDCommentsPage} />
          <Route path="/admin/quote/:id" component={AdminCRUDDevisPage} />

          <Route path="/404" component={Error404Page} />
          <Redirect to="/404" />
        </Switch>
      </BrowserRouter>
      </div>
  );
}

export default App;
