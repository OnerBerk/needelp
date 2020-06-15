import React, { Component } from 'react';
import axios from "axios";
import Cookies from 'js-cookie';
import { Link } from "react-router-dom";


class AdminDevisPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            devis: [],
            admin: 'false',
        };
    }
    
    getAllDevis = () => {
        const headers = { 'authorization': Cookies.get('token') }
        axios
        .get("http://localhost:8080/admin/devis", { headers: headers })
        .then((response) => {
            console.log("getAlldevis response", response);
            console.log("getAlldevis response.data", response.data);
            this.setState({ devis: response.data, admin: 'true' })
        })
        .catch((err) => {
            console.log(err);
        })
    }
    
    displayDevis = (devis) => {
        const getAllDevis = devis;
        //  console.log("json", JSON.stringify(getAllDevis));
        const devisList = getAllDevis.map((devis) => {
            return (
                <tr key={devis.id}>
                <td>{devis.content}</td>
                <td>{devis.statut}</td>
                <td>{devis.daterdv}</td>
                <td>{devis.payment}</td>
                <td>{devis.supplier}</td>
                <td>{devis.photo}</td>
                <td>{devis.date}</td>
                <td>
                <Link to={"/admin/devis/"+devis._id}>
                <button name={devis._id} value={devis._id}>{devis._id}</button>
                </Link>
                </td>
                </tr>
                )
            });
            return (devisList);
        }
        
        async componentDidMount() {
            await this.getAllDevis();
        }
        
        render() {
            if(this.state.admin === 'false'){
                return(
                    <div></div>
                    )
                }
                else{
                    let devis = this.state.devis;
                    return (
                        <div className="container">
                        <Link to="/admin">
                        <button>
                        Retour
                        </button>
                        </Link>
                        {/* <Link to="/admin/quote/create">
                        <button>
                        Créer un devis
                        </button>
                    </Link> */}
                    <h1 className="title">Admin</h1>
                    
                    <h2 className="title">CRUD Devis</h2>
                    
                    <table id='devis'>
                    
                    <thead>
                    <tr>
                    <td>content</td>
                    <td>statut</td>
                    <td>daterdv</td>
                    <td>payment</td>
                    <td>supplier</td>
                    {/* <td>photo</td> */}
                    <td>date de création</td>
                    </tr>
                    </thead>
                    <tbody>
                    {this.displayDevis(devis)}
                    </tbody>
                    </table>
                    </div>
                    );
                }
            };
        }
        
        export default AdminDevisPage;