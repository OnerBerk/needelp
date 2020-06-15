import React, { Component } from 'react';
import axios from "axios";
import Cookies from 'js-cookie';
import { Link } from "react-router-dom";
import { Header, Table, Button, Input, Image } from 'semantic-ui-react';

class AdminCRUDUserPage extends Component {
    constructor(props) {
        super(props);
        const url = window.location.href;
        const urlArray = url.split('/');
        const urlLength = urlArray.length - 1
        const userId = urlArray[urlLength]
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
            date: "",
            olddate: "",
            oldpassword: "",
            password: "",
            userId: userId,
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
        const headers = { 'authorization': Cookies.get('token') }
        let data = {
            userId: this.state.userId,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            email: this.state.email,
            address: this.state.address,
            phone: this.state.phone,
            date: this.state.date,
            password: this.state.password
        }
        if (this.state.password === '') data.password = this.state.oldpassword
        if (this.state.lastname === '') data.lastname = this.state.oldlastname
        if (this.state.firstname === '') data.firstname = this.state.oldfirstname
        if (this.state.email === '') data.email = this.state.oldemail
        if (this.state.address === '') data.address = this.state.oldaddress
        if (this.state.phone === '') data.phone = this.state.oldphone
        if (this.state.date === '') data.date = this.state.olddate
        axios.post('http://localhost:8080/admin/users/settings/:userId', data, { headers: headers })
            .then(res => {
                window.location.reload(false)
            })
    }

    componentDidMount() {
        const headers = { 'authorization': Cookies.get('token') }
        const params = { userId: this.state.userId }
        axios.get('http://localhost:8080/admin/users/settings/' + this.state.userId, { headers: headers }, { params })
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
                    date: res.data.date,
                    olddate: res.data.date,
                    admin: 'true'
                })
            })
            .catch((error) => {
                console.log(error)
                window.location.href = "http://localhost:3000/404"
            });
    }

    render() {
        if (this.state.admin === 'false') {
            return (
                <div></div>
            )
        }
        else {
            return (
                <div className="container" style = {{padding: "50px"}}>
                    <Link to="/admin">
                        <Button style={{ marginLeft: "20px" }} circular icon='arrow left' />
                    </Link>

                    <Header as='h2' icon textAlign='center'>
                        <Header.Content>Admin - Utilisateur {this.state.oldlastname} {this.state.oldfirstname} </Header.Content>
                    </Header>

                    <Image src='https://react.semantic-ui.com/images/wireframe/square-image.png' size='small' circular centered />

                    <br></br>

                    <Button
                        content="Téléchargez une photo de profil"
                        labelPosition="left"
                        icon="file"
                        onClick={() => this.fileInputRef.current.click()}
                    />
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
                                    <Table.Cell></Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        </Table>
                        <Button type="submit" value="Modifier">Modifier</Button>

                    </form>
                </div>
            );
        }
    };
}

export default AdminCRUDUserPage;