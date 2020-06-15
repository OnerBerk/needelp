import React, { Component } from 'react';
import axios from "axios";
import Cookies from 'js-cookie';
import { Link } from "react-router-dom";


class AdminCRUDDevisPage extends Component {
    
    constructor(props) {
        super(props);
        const url = window.location.href;
        const urlArray = url.split('/');
        const urlLength = urlArray.length-1
        const quoteId = urlArray[urlLength]
        this.state = {
            content: "",
            oldcontent: "",
            statut: "",
            oldstatut: "",
            daterdv: "",
            olddaterdv: "",
            payment: "",
            oldpayment: "",
            supplier: "",
            oldsupplier: "",
            service: "", 
            oldservice: "",
            quoteId: quoteId,
            admin: 'false',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange = async (e) => {
        await this.setState({
            [e.target.name]: e.target.value
        });
    }
    
    handleSubmit(event) {
        event.preventDefault();
        const headers = {'authorization': Cookies.get('token')}
        let data = {
            content: this.state.content,
            statut: this.state.statut,
            daterdv: this.state.daterdv,
            payment: this.state.payment,
            supplier: this.state.supplier,
            service: this.state.service,
        }
        if (this.state.content === '') data.content = this.state.content
        if (this.state.statut === '') data.statut = this.state.statut
        if (this.state.daterdv === '') data.daterdv = this.state.daterdv
        if (this.state.payment === '') data.payment = this.state.payment
        if (this.state.supplier === '') data.supplier = this.state.supplier
        if (this.state.service === '') data.service = this.state.service
        axios.post('http://localhost:8080/admin/users/settings/:quoteId', data, {headers: headers})
        .then(res => {
            window.location.reload(false)
        })
    }
    
    componentDidMount() {
        const headers = {'authorization': Cookies.get('token')}
        const params = {quoteId : this.state.quoteId}
        axios.get('http://localhost:8080/admin/users/settings/'+this.state.quoteId, {headers: headers}, {params})
        .then(res => {
            this.setState({
                content: res.data.content,
                oldcontent: res.data.content,
                statut: res.data.statut,
                oldstatut: res.data.statut,
                daterdv: res.data.daterdv,
                olddaterdv: res.data.daterdv,
                payment: res.data.payment,
                oldpayment: res.data.payment,
                supplier: res.data.supplier,
                oldsupplier: res.data.supplier,
                service: res.data.service,
                oldservice: res.data.service,
                admin: 'true'
            })
        })
        .catch(error => {
            console.log(error);
            window.location.href = "http://localhost:3000/404";
        });
    }
    
    
    
    render() {
        if(this.state.admin === 'false'){
            return(
                <div></div>
                )
            }
            else{
                return (
                    <div className="container">
                    <Link to="/admin/quotes">
                    <button>
                    Retour
                    </button>
                    </Link>
                    
                    <h1 className="title">Compte</h1>
                    
                    <img className="photo"
                    src="#"
                    alt="ID n*" />
                    
                    <br></br>
                    
                    <label htmlFor="photo">Telechargez une photo de profil:</label>
                    
                    <input type="file"
                    id="photo" name="photo"
                    accept="image/png, image/jpeg"></input>
                    
                    <br></br>
                    <br></br>
                    
                    <form onSubmit={this.handleSubmit}>
                    <table className="hoverTable">
                    <theard></theard>
                    <tbody>
                    <tr>
                    <td>Nom</td>
                    <td>{this.state.oldcontent}</td>
                    <input name="content" onChange={this.handleChange} type="text" placeholder="New username"></input>
                    </tr>
                    <tr>
                    <td>Prenom</td>
                    <td>{this.state.oldstatut}</td>
                    <input name="statut" onChange={this.handleChange} type="text" placeholder="New username"></input>
                    </tr>
                    <tr>
                    <td>Adresse</td>
                    <td>{this.state.oldpayment}</td>
                    <div><input name="adress" onChange={this.handleChange} type="text" placeholder="new payment"/></div>
                    </tr>
                    <tr>
                    <td>Numero de telesupplier</td>
                    <td>{this.state.oldsupplier}</td>
                    <div><input name="daterdv" onChange={this.handleChange} type="text" placeholder="new supplier numner"/></div>
                    </tr>
                    <tr>
                    <td>Adresse daterdv</td>
                    <td>{this.state.olddaterdv}</td>
                    <div><input name="daterdv" onChange={this.handleChange} type="text" placeholder="new daterdv" oninvalid="this.setCustomValidity('Invalid daterdv')" oninput="this.setCustomValidity('')"/></div>
                    </tr>
                    <tr>
                    <td>Mot de passe</td>
                    <td>**********</td>
                    <div><input name="service" onChange={this.handleChange} type="service" oninput="this.setCustomValidity(this.validity.patternMismatch ? 'Invalid service' : ''); if(this.checkValidity()) form.service_confirmation.pattern = this.value;"  placeholder="New service"></input></div>
                    </tr>
                    <tr>
                    <td>Date d'enregistrement</td>
                    <td>{this.state.olddate}</td>
                    <td><input type="submit" value="Submit" /></td>
                    {/* <div><input type="service" name="service_confirmation" oninput="this.setCustomValidity(this.validity.patternMismatch ? 'Invalid service' : '');"  pattern="^\S{8,20}$" placeholder="Verify service"></input></div> */}
                    </tr>
                    </tbody>
                    </table>
                    </form>
                    <br></br>
                    <div>Changez une ou plusieurs informations de votre profil.
                    <br></br>
                    
                    </div>
                    </div>
                    );
                }
            };
        }
        
        export default AdminCRUDDevisPage;