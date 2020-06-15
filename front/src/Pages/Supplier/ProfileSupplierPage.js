import React, { Component } from "react";
import axios from "axios";
import Avatar from '../../images/avatar.png'
import Map from '../../map/map'
import Calendar from '../../components/calendar'
import CommentSupplier from '../../components/commentsupplier/commentSupplier'
import { Image, List, Table } from 'semantic-ui-react'

class ProfileSupplierPage extends Component {
    constructor(props){
        const url = window.location.href;
        const urlArray = url.split('/');
        const urlLength = urlArray.length-1
        const supplierId = urlArray[urlLength]
        super(props);
        this.state = {
            lastname:"",
            firstname:"",
            email:"",
            password:"",
            photo:"",
            typesupplier:"",
            siret:"",
            address:"",
            zip:"",
            city:"",
            phone:"",
            expertise:"",
            date:"",
            location:"",
            service:"",
            supplierId: supplierId
        }
    }

    componentDidMount() {
        const params = {supplierId : this.state.supplierId}

        axios.get('http://localhost:8080/settings/suppliers/'+this.state.supplierId, {params})
        .then(res => {
            this.setState({
                firstname: res.data.firstname,
                lastname: res.data.lastname,
                email: res.data.email,
                photo: res.data.photo,
                typesupplier: res.data.typesupplier,
                siret : res.data.siret,
                zip: res.data.zip,
                city: res.data.city,
                address: res.data.address,
                phone: res.data.phone,
                expertise: res.data.expertise,
                service: res.data.service,
                location: res.data.location,
                date: res.data.date,
            })
        })
        .catch(error => console.log(error));
    }


    render() {

        return (
            <div className="container">
        {/* <DisplayMapClass/> */}

        <div>
        <div> <Map /></div>
<br/>
        </div>

        <div>
        <div>
        <List>
        <List.Item>
        {/* <Image className ="card-img-top" src={Avatar} alt={this.state.photo} width="100"/> */}
        <img width="200" height="200" src={this.state.photo}/>
        <List.Content>
        <h1>Profil </h1>
        <List.Header as='a'><h1> {this.state.lastname} {this.state.firstname}</h1></List.Header>
        <List.Description>
        {' '}
        <a>
        <b>{this.state.service}</b><p>Categorie : {this.state.typesupplier}</p> <p>Siret : {this.state.siret} </p>
        </a>{' '}

        </List.Description>
        </List.Content>
        </List.Item>
        </List>

        <Table celled>
        <Table.Header>
        <Table.Row textAlign='center'>
        <Table.HeaderCell >Adresse</Table.HeaderCell>
        <Table.HeaderCell>Code postal </Table.HeaderCell>
        <Table.HeaderCell>Ville</Table.HeaderCell>
        <Table.HeaderCell>Email</Table.HeaderCell>
        <Table.HeaderCell>Téléphone</Table.HeaderCell>
         <Table.HeaderCell>Date d'inscription</Table.HeaderCell>
        </Table.Row>
        </Table.Header>

        <Table.Body  >
        <Table.Row textAlign='center'>
        <Table.Cell >
        <p> {this.state.address}</p>
        </Table.Cell>
        <Table.Cell><p> {this.state.zip}</p></Table.Cell>
        <Table.Cell> <p> {this.state.city}</p></Table.Cell>
        <Table.Cell><p>{this.state.email}</p></Table.Cell>
        <Table.Cell><p>{this.state.phone}</p></Table.Cell>
        <Table.Cell> <p>{this.state.date}</p> </Table.Cell>
        </Table.Row>

        </Table.Body>
        </Table>               

                

        </div>
        <div> <Calendar/> </div>
        </div>
        <CommentSupplier/>
        </div>
        )

    }
}

export default ProfileSupplierPage;
