import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from 'js-cookie';
//import './RegisterForm.css';

class AdminUsersCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            admin: 'false',
        };
    }

    getAllUsers = () => {
        const headers = { 'authorization': Cookies.get('token') }
        axios
        .get("http://localhost:8080/admin/users", { headers: headers })
        .then((response) => {
            console.log('admin status verified')
            this.setState({ admin: 'true' })
        })
        .catch((err) => {
            console.log(err);
            console.log('DENIED')
            window.location.href = "http://localhost:3000/404";
        })
    }
    
    async componentDidMount() {
        await this.getAllUsers()
    }
    
    render(){
        if(this.state.admin === 'false'){
            return(
                <div></div>
                )
            }
            else{
                return (
                    <div className="container">
                    <Link to="/admin">
                    <button>
                    Retour
                    </button>
                    </Link>
                    <div className="registerFormDiv">
                    <h1>Formulaire de création d'un utilisateur</h1>
                    <div className="formItem">
                    <input type="text" placeholder="First name" />
                    </div>
                    <div className="formItem">
                    <input type="text" placeholder="Last name" />
                    </div>
                    <div className="formItem">
                    <input type="email" placeholder="Email" />
                    </div>
                    <div className="formItem">
                    <input type="password" placeholder="Password" />
                    </div>
                    <div className="formItem">
                    <input type="password" placeholder="Confirm password" />
                    </div>
                    <div className="formItem">
                    <button>Register</button>
                    </div>
                    </div>
                    </div>
                    )
                }
            }
        }
        
        export default AdminUsersCreate;