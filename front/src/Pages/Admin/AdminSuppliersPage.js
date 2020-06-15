import React, { Component } from 'react';
import axios from "axios";
import Cookies from 'js-cookie';
import { Link } from "react-router-dom";
import { Icon, Header, Table, Button } from 'semantic-ui-react'


class AdminSuppliersPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            suppliers: [],
            admin: 'false',
        };
    }

    getAllSuppliers = () => {
        const headers = { 'authorization': Cookies.get('token') }
        axios
            .get("http://localhost:8080/admin/suppliers", { headers: headers })
            .then((response) => {
                console.log("getAllusers response", response);
                console.log("getAllusers response.data", response.data);
                this.setState({ suppliers: response.data, admin: 'true' })
            })
            .catch((err) => {
                console.log(err);
                window.location.href = "http://localhost:3000/404";
            })
    }

    displaySuppliers = (suppliers) => {
        const getAllSuppliers = suppliers;
        //  console.log("json", JSON.stringify(getAllUsers));
        const suppliersList = getAllSuppliers.map((supplier) => {
            return (
                <Table.Row>
                    <Table.Cell><Link to={"/admin/supplier/" + supplier._id}>{supplier.lastname}</Link></Table.Cell>
                    <Table.Cell><Link to={"/admin/supplier/" + supplier._id}>{supplier.firstname}</Link></Table.Cell>
                    <Table.Cell><Link to={"/admin/supplier/" + supplier._id}>{supplier.typesupplier}</Link></Table.Cell>
                    <Table.Cell><Link to={"/admin/supplier/" + supplier._id}>{supplier.siret}</Link></Table.Cell>
                    <Table.Cell><Link to={"/admin/supplier/" + supplier._id}>{supplier.address}</Link></Table.Cell>
                    <Table.Cell><Link to={"/admin/supplier/" + supplier._id}>{supplier.zip}</Link></Table.Cell>
                    <Table.Cell><Link to={"/admin/supplier/" + supplier._id}>{supplier.city}</Link></Table.Cell>
                    <Table.Cell><Link to={"/admin/supplier/" + supplier._id}>{supplier.photo}</Link></Table.Cell>
                    <Table.Cell><Link to={"/admin/supplier/" + supplier._id}>{supplier.phone}</Link></Table.Cell>
                    <Table.Cell><Link to={"/admin/supplier/" + supplier._id}>{supplier.email}</Link></Table.Cell>
                    <Table.Cell><Link to={"/admin/supplier/" + supplier._id}>{supplier.expertise}</Link></Table.Cell>
                    <Table.Cell><Link to={"/admin/supplier/" + supplier._id}>{supplier.location}</Link></Table.Cell>
                    <Table.Cell><Link to={"/admin/supplier/" + supplier._id}>{supplier.service}</Link></Table.Cell>
                    <Table.Cell><Link to={"/admin/supplier/" + supplier._id}>{supplier.date}</Link></Table.Cell>
                </Table.Row >

            )
        });
        return (suppliersList);
    }

    async componentDidMount() {
        await this.getAllSuppliers();
    }

    render() {
        if (this.state.admin === 'false') {
            return (
                <div></div>
            )
        }
        else {
            let suppliers = this.state.suppliers;
            return (
                <div className="container" style = {{padding: "50px"}}>

                    <Link to="/admin">
                        <Button style={{ marginLeft: "20px" }} circular icon='arrow left' />
                    </Link>
                    {/* <Link to="/admin/user/create">
                        <button>
                        Create User
                        </button>
                        </Link> */}
                    <Header as='h2' icon textAlign='center'>
                        <Icon name='users' circular />
                        <Header.Content>Admin - Fournisseurs</Header.Content>
                    </Header>
                    <br></br>
                    <Table celled selectable>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Nom</Table.HeaderCell>
                                <Table.HeaderCell>Prénom</Table.HeaderCell>
                                <Table.HeaderCell>Type de fournisseur</Table.HeaderCell>
                                <Table.HeaderCell>Numéro de Siret</Table.HeaderCell>
                                <Table.HeaderCell>Adresse</Table.HeaderCell>
                                <Table.HeaderCell>Code postal</Table.HeaderCell>
                                <Table.HeaderCell>Ville</Table.HeaderCell>
                                <Table.HeaderCell>Photo</Table.HeaderCell>
                                <Table.HeaderCell>Numéro de Téléphone</Table.HeaderCell>
                                <Table.HeaderCell>Email</Table.HeaderCell>
                                <Table.HeaderCell>Expertise</Table.HeaderCell>
                                <Table.HeaderCell>Emplacement / Location</Table.HeaderCell>
                                <Table.HeaderCell>Prestation</Table.HeaderCell>
                                <Table.HeaderCell>Date d'inscription</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {this.displaySuppliers(suppliers)}
                        </Table.Body>
                    </Table>
                </div>
            );
        }
    };
}

export default AdminSuppliersPage;