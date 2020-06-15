import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Error404Page extends Component {

    render() {
        return (
            <div>
                Error 404
                <p><Link to="/">Cliquer ici pour retourner sur la page d'acceuil</Link></p>
            </div>
            );
        };
    }
    
    export default Error404Page;