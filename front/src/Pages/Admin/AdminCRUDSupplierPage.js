import React, { Component } from 'react';
import axios from "axios";
import Cookies from 'js-cookie';
import { Link } from "react-router-dom";
import { Header, Table, Button, Input, Image } from 'semantic-ui-react';

class AdminCRUDSupplierPage extends Component {
    constructor(props) {
        super(props);
        const url = window.location.href;
        const urlArray = url.split('/');
        const urlLength = urlArray.length - 1;
        const supplierId = urlArray[urlLength];
        this.state = {
            lastname: "",
            firstname: "",
            email: "",
            password: "",
            photo: "",
            typesupplier: "",
            siret: "",
            adress: "",
            zip: "",
            city: "",
            phone: "",
            expertise: "",
            date: "",
            location: "",
            service: "",
            oldlastname: "",
            oldfirstname: "",
            oldemail: "",
            oldpassword: "",
            oldphoto: "",
            oldtypesupplier: "",
            oldsiret: "",
            oldadress: "",
            oldzip: "",
            oldcity: "",
            oldphone: "",
            oldexpertise: "",
            olddate: "",
            oldlocation: "",
            oldservice: "",
            supplierId: supplierId
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
            supplierId: this.state.supplierId,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            email: this.state.email,
            password: this.state.password,
            photo: this.state.photo,
            typesupplier: this.state.typesupplier,
            siret: this.state.siret,
            address: this.state.address,
            zip: this.state.zip,
            city: this.state.city,
            phone: this.state.phone,
            expertise: this.state.expertise,
            date: this.state.date,
            location: this.state.location,
            service: this.state.service,
            admin: 'false',
        }
        if (this.state.lastname === '') data.lastname = this.state.oldlastname
        if (this.state.firstname === '') data.firstname = this.state.oldfirstname
        if (this.state.email === '') data.email = this.state.oldemail
        if (this.state.password === '') data.password = this.state.oldpassword
        if (this.state.photo === '') data.photo = this.state.oldphoto
        if (this.state.typesupplier === '') data.typesupplier = this.state.oldtypesupplier
        if (this.state.siret === '') data.siret = this.state.oldsiret
        if (this.state.address === '') data.address = this.state.oldaddress
        if (this.state.zip === '') data.zip = this.state.oldzip
        if (this.state.city === '') data.city = this.state.oldcity
        if (this.state.phone === '') data.phone = this.state.oldphone
        if (this.state.expertise === '') data.expertise = this.state.oldexpertise
        if (this.state.date === '') data.date = this.state.olddate
        if (this.state.location === '') data.location = this.state.oldlocation
        if (this.state.service === '') data.service = this.state.oldservice

        axios.post('http://localhost:8080/admin/supplier/settings/:supplierId', data, { headers: headers })
            .then(res => {
                window.location.reload(false)
            })
    }

    componentDidMount() {
        const headers = { 'authorization': Cookies.get('token') }
        const params = { supplierId: this.state.supplierId }
        axios.get('http://localhost:8080/admin/supplier/settings/' + this.state.supplierId, { headers: headers }, { params })
            .then(res => {
                this.setState({
                    firstname: res.data.firstname,
                    oldfirstname: res.data.firstname,
                    lastname: res.data.lastname,
                    oldlastname: res.data.lastname,
                    email: res.data.email,
                    oldemail: res.data.email,
                    photo: res.data.photo,
                    oldphoto: res.data.photo,
                    typesupplier: res.data.typesupplier,
                    oldtypesupplier: res.data.typesupplier,
                    siret: res.data.siret,
                    oldsiret: res.data.siret,
                    address: res.data.address,
                    oldaddress: res.data.address,
                    zip: res.data.zip,
                    oldzip: res.data.zip,
                    city: res.data.city,
                    oldcity: res.data.city,
                    phone: res.data.phone,
                    oldphone: res.data.phone,
                    expertise: res.data.expertise,
                    oldexpertise: res.data.expertise,
                    date: res.data.date,
                    olddate: res.data.date,
                    location: res.data.location,
                    oldlocation: res.data.location,
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
        if (this.state.admin === 'false') {
            return (
                <div></div>
            )
        }
        else {
            return (
                <div className="container" style={{ padding: "50px" }}>
                    <Link to="/admin">
                        <Button style={{ marginLeft: "20px" }} circular icon='arrow left' />
                    </Link>

                    <Header as='h2' icon textAlign='center'>
                        <Header.Content>Admin - Fournisseurs </Header.Content>
                    </Header>

                    <br></br>
                    <br></br>
                    <br></br>

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
                                    <Table.Cell>Type de fournisseur</Table.Cell>
                                    <Table.Cell>{this.state.oldtypesupplier}</Table.Cell>
                                    <Table.Cell>

                                        <div>
                                            <input type="radio" id="particulier" name="typesupplier" value="particulier" onChange={this.handleChange}/>
                                            <label for="particulier">Particulier</label>
                                        </div>

                                        <div>
                                            <input type="radio" id="fournisseur" name="typesupplier" value="fournisseur" onChange={this.handleChange} />
                                            <label for="fournisseur">Fournisseur</label>
                                        </div>

                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>Numero de siret</Table.Cell>
                                    <Table.Cell>{this.state.oldsiret}</Table.Cell>
                                    <Table.Cell><Input type="tel" name="siret" onChange={this.handleChange} id="siret" transparent placeholder="Numero de siret" /></Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>Code postal</Table.Cell>
                                    <Table.Cell>{this.state.oldzip}</Table.Cell>
                                    <Table.Cell><Input type="tel" name="zip" onChange={this.handleChange} id="zip" pattern="[0-9]{5}" transparent placeholder="Code postal" /></Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>Adresse</Table.Cell>
                                    <Table.Cell>{this.state.oldaddress}</Table.Cell>
                                    <Table.Cell><Input type="text" name="address" onChange={this.handleChange} id="address" transparent placeholder="Adresse" /></Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>Ville</Table.Cell>
                                    <Table.Cell>{this.state.oldcity}</Table.Cell>
                                    <Table.Cell><Input type="text" name="city" onChange={this.handleChange} id="city" transparent placeholder="Ville" /></Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>Numero de téléphone</Table.Cell>
                                    <Table.Cell>{this.state.oldphone}</Table.Cell>
                                    <Table.Cell><Input name="phone" onChange={this.handleChange} type="text" transparent placeholder='Numero de téléphone...' /></Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>Service</Table.Cell>
                                    <Table.Cell>{this.state.oldservice}</Table.Cell>
                                    <Table.Cell> <label>
                                        <input list="service" name="service" onChange={this.handleChange} />
                                    </label>
                                        <datalist id="service">
                                            <option value="Garde d'enfants" />
                                            <option value="Cuisine" />
                                            <option value="Cours particuliers" />
                                            <option value="Jardinage" />
                                            <option value="Informatique" />
                                            <option value="Ménage" />
                                        </datalist> </Table.Cell>
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

export default AdminCRUDSupplierPage;