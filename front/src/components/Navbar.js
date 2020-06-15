import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../images/logo.png'
import Cookies from 'js-cookie';
import { Menu, Icon } from 'semantic-ui-react'


function Navbar() {
  if(Cookies.get('token')){
    return (
      <Menu stackable inverted fluid style={{backgroundColor: "#2D4F6C"}}>
        <Menu.Item name='home' size="1em"> 
          <Link to= "/"><img className ="logo" src={Logo} alt="logo" width="20%"/></Link>
        </Menu.Item>
                  
          <Menu.Menu position='right'>
            <Menu.Item name='Mes Devis'>
              <Link to="/account/profile/" className="butt"><Icon link name='clipboard outline' size="large"/>Mes Devis</Link>
            </Menu.Item>
            <Menu.Item name='Edit'>            
              <Link to="/account/edit" className="butt"><Icon link name='settings' size="large"/>Editer</Link>
            </Menu.Item>
                
            <Menu.Item name='Logout'>            
              <Link to ="/logout" className="butt"><Icon link name='log out' size="large"/>Déconnexion</Link>
            </Menu.Item>
          </Menu.Menu>
        </Menu>

      )
    }
    else if(Cookies.get('supplierToken')){
      return (
        <Menu inverted fluid style={{backgroundColor: "#2D4F6C"}}>
          <Menu.Item name='home'> 
            <Link to= "/"><img className ="logo" src={Logo} alt="logo" width="20%"/></Link>
          </Menu.Item>
              
          <Menu.Menu position='right'>
          
            <Menu.Item name='Mes Devis'>
              <Link to="/supplier/devis" className="butt"><Icon link name='clipboard outline' size="large"/>Mes Demandes</Link>
            </Menu.Item>

            <Menu.Item name='Inscription'>
              <Link to="/supplier/edit" className="butt"><Icon link name='settings' size="large"/>Editer</Link>
            </Menu.Item>
            
            <Menu.Item name='Connexion'>
              <Link to ="/logout" className="butt"><Icon link name='log out' size="large"/>Déconnexion</Link>
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      )
    }
    return (
      <Menu inverted fluid style={{backgroundColor: "#2D4F6C"}}>
        <Menu.Item name='home' size="1em"> 
          <Link to= "/"><img className ="logo" src={Logo} alt="logo" width="20%"/></Link>
        </Menu.Item>
        <Menu.Menu position='right'>
        <Menu.Item name='Inscription'>
          <Link to="/registeruser" className="butt"><Icon link name='signup' size="large"/>Inscription</Link>
        </Menu.Item>
      
        <Menu.Item name='Connexion'>
          <Link to="/loginUser" className="butt"><Icon link name='sign-in' size="large"/>Connexion</Link>
        </Menu.Item>
        </Menu.Menu>
      </Menu>
      );
    }

    export default Navbar;
