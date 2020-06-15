import React from 'react';
import {Redirect} from "react-router-dom";
import Cookies from 'js-cookie';


class Logout extends React.Component {
  render(){
    Cookies.remove('token');
    Cookies.remove('supplierToken');
    window.location.reload(false)
    return <Redirect to = {{ pathname: "/" }} />;
  }
  
}
export default Logout;
