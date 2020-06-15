import React, { Component } from 'react';
import axios from "axios";
import Cookies from 'js-cookie';
import { Link } from "react-router-dom";
import { Header, Table, Button, Input, Image } from 'semantic-ui-react';

class ProfileUserPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: "",
            oldfirstname: "",
            lastname: "",
            oldlastname: "",
            email: "",
            oldemail: "",
            address: "",
            oldaddress: "",
            phone: "",
            oldphone: "",
            photo: "",
            oldphoto: "",
            date: "",
            olddate: "",
            oldpassword: "",
            password: "",
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePageChange =this.handlePageChange.bind(this)
    }

    handleChange = async (e) => {
        await this.setState({
            [e.target.name]: e.target.value
        });
    }

    handlePageChange() {
 
        window.location = "http://localhost:3000/account/profile/";
        }

    handleSubmit = async (event) => {
        event.preventDefault();
        var headers = { 'authorization': Cookies.get('token') }
        

        axios.post('http://localhost:8080/login', {
            email: this.state.oldemail,
            password: this.state.oldpassword
        })
            .then((res, err) => {
                if (res.status === 200) {
                    let data = {
                        firstname: this.state.firstname,
                        lastname: this.state.lastname,
                        email: this.state.email,
                        address: this.state.address,
                        phone: this.state.phone,
                        date: this.state.date,
                        password: this.state.password,
                        photo: this.state.photo
                    }
                    if (this.state.password === '') data.password = this.state.oldpassword
                    if (this.state.lastname === '') data.lastname = this.state.oldlastname
                    if (this.state.firstname === '') data.firstname = this.state.oldfirstname
                    if (this.state.email === '') data.email = this.state.oldemail
                    if (this.state.address === '') data.address = this.state.oldaddress
                    if (this.state.phone === '') data.phone = this.state.oldphone
                    if (this.state.photo === '') data.photo = this.state.oldphoto
                    if (this.state.date === '') data.date = this.state.olddate

                    axios.post('http://localhost:8080/settings', data, { headers: headers })
                        .then(res => {
                            window.location.reload(false)
                        })
                }
            })
            .catch(error => alert('Password confirmation failed, please input your current password.'));
    }

    deleteAccount = () => {
        var headers = { 'authorization': Cookies.get('token') }
        // var user = {
        //     email: this.state.oldemail,
        //     password: this.state.oldpassword
        // };

        axios.post('http://localhost:8080/login', {
            email: this.state.email,
            password: this.state.oldpassword
        })
            .then((res, err) => {
                if (res.status === 200) {
                    axios.delete('http://localhost:8080/settings', { headers: headers })
                        .then(res => {
                            Cookies.remove('token');
                            window.location.reload(false)
                        })
                }
            })
    }

    componentDidMount() {
        const headers = { 'authorization': Cookies.get('token') }
        axios.get('http://localhost:8080/settings', { headers: headers })
            .then(res => {
                this.setState({
                    firstname: res.data.firstname,
                    oldfirstname: res.data.firstname,
                    lastname: res.data.lastname,
                    oldlastname: res.data.lastname,
                    email: res.data.email,
                    oldemail: res.data.email,
                    address: res.data.address,
                    oldaddress: res.data.address,
                    phone: res.data.phone,
                    oldphone: res.data.phone,
                    oldphoto: res.data.photo,
                    date: res.data.date,
                    olddate: res.data.date,
                })
            })
            .catch(error => console.log(error));
    }

    render() {

        return (
            <div className="container" style = {{padding: "50px"}}>
            <Link to="/">
                <Button style={{ marginLeft: "20px" }} circular icon='arrow left' />
            </Link>

            <Header as='h2' icon textAlign='center'>
                <Header.Content>Compte - Utilisateur {this.state.oldlastname} {this.state.oldfirstname} </Header.Content>
            </Header>

            <Image src='https://react.semantic-ui.com/images/wireframe/square-image.png' size='small' circular centered />

            <br></br>
            
            <br></br>

            <br></br>
            <br></br>
            <form onSubmit={this.handleSubmit}>
                <Table definition>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell />
                            <Table.HeaderCell>Actuel</Table.HeaderCell>
                            <Table.HeaderCell>Nouveau</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>Prénom</Table.Cell>
                            <Table.Cell>{this.state.oldfirstname}</Table.Cell>
                            <Table.Cell><Input name="firstname" onChange={this.handleChange} type="text" transparent placeholder='Prénom...' /></Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>Nom</Table.Cell>
                            <Table.Cell>{this.state.oldlastname}</Table.Cell>
                            <Table.Cell><Input name="lastname" onChange={this.handleChange} type="text" transparent placeholder='Nom de famille...' /></Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>Adresse</Table.Cell>
                            <Table.Cell>{this.state.oldaddress}</Table.Cell>
                            <Table.Cell> <Input name="address" onChange={this.handleChange} type="text" transparent placeholder='Adresse...' /></Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>Numero de téléphone</Table.Cell>
                            <Table.Cell>{this.state.oldphone}</Table.Cell>
                            <Table.Cell><Input name="phone" onChange={this.handleChange} type="text" transparent placeholder='Numero de téléphone...' /></Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>Email</Table.Cell>
                            <Table.Cell>{this.state.oldemail}</Table.Cell>
                            <Table.Cell><Input name="email" onChange={this.handleChange} type="email" transparent placeholder='Email...' /></Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>Mot de passe</Table.Cell>
                            <Table.Cell>*******</Table.Cell>
                            <Table.Cell><Input name="password" onChange={this.handleChange} type="password" transparent placeholder='Mot de passe...' /></Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>Date d'enregistrement</Table.Cell>
                            <Table.Cell>{this.state.olddate}</Table.Cell>
                            <Table.Cell><Input type="password" onChange={this.handleChange} name="oldpassword" label={{ icon: 'asterisk' }} labelPosition='left corner' placeholder="Mot de passe" required></Input></Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>Image de profil</Table.Cell>
                            <Table.Cell><img width="200" height="200" src={this.state.oldphoto}/></Table.Cell>
                            <Table.Cell><Input type="text" onChange={this.handleChange} name="photo" placeholder="Entrez l'url d'une image"></Input></Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
                <Input type="password" onChange={this.handleChange} name="oldpassword" label={{ icon: 'asterisk' }} labelPosition='left corner' placeholder="Mot de passe" required></Input>
                <Button type="submit" value="Mettre à jour" onClick={this.handleSubmit}>Confirmer</Button>
    

            </form>
          
        <br></br>
        <div>Changez une ou plusieurs informations de votre profil.
        <br></br><br></br>

        </div>  
        </div>

        );
    };
}

export default ProfileUserPage;
