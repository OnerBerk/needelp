import React, { Component } from 'react';
import axios from "axios";
import Cookies from 'js-cookie';
import { Link } from "react-router-dom";
import { Icon, Header, Table, Button } from 'semantic-ui-react'


class AdminUsersPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            admin: 'false',
        };
    }

    getAllUsers = () => {
        const headers = { 'authorization': Cookies.get('token') }
        axios
            .get("http://localhost:8080/admin/users", { headers: headers })
            .then((response) => {
                console.log(response)
                console.log("getAllusers response", response);
                console.log("getAllusers response.data", response.data);
                this.setState({ users: response.data, admin: 'true' })
            })
            .catch((err) => {
                console.log(err);
                console.log('DENIED')
                window.location.href = "http://localhost:3000/404";
            })
    }

    displayUsers = (users) => {
        const getAllUsers = users;
        //  console.log("json", JSON.stringify(getAllUsers));
        const usersList = getAllUsers.map((user) => {
            return (
                <Table.Row>
                    <Table.Cell><Link to={"/admin/user/" + user._id}>{user.lastname}</Link></Table.Cell>
                    <Table.Cell><Link to={"/admin/user/" + user._id}>{user.firstname}</Link></Table.Cell>
                    <Table.Cell><Link to={"/admin/user/" + user._id}>{user.address}</Link></Table.Cell>
                    <Table.Cell><Link to={"/admin/user/" + user._id}>{user.photo}</Link></Table.Cell>
                    <Table.Cell><Link to={"/admin/user/" + user._id}>{user.phone}</Link></Table.Cell>
                    <Table.Cell><Link to={"/admin/user/" + user._id}>{user.email}</Link></Table.Cell>
                    <Table.Cell><Link to={"/admin/user/" + user._id}>{user.role}</Link></Table.Cell>
                    <Table.Cell><Link to={"/admin/user/" + user._id}>{user.date}</Link></Table.Cell>
                </Table.Row >
            )
    });
    return(usersList);
}

async componentDidMount() {
    await this.getAllUsers();
}

render() {
    if (this.state.admin === 'false') {
        return (
            <div></div>
        )
    }
    else {
        let users = this.state.users;
        return (
            <div className="container" style = {{padding: "50px"}}>
                <Link to="/admin">
                    <Button style ={{marginLeft: "20px"}}circular icon='arrow left' />
                </Link>
                {/* <Link to="/admin/user/create">
                        <button>
                        Create User
                        </button>
                        </Link> */}
                <Header as='h2' icon textAlign='center'>
                    <Icon name='users' circular />
                    <Header.Content>Admin - Utilisateurs</Header.Content>
                </Header>
                <br></br>
                <Table celled selectable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Nom</Table.HeaderCell>
                            <Table.HeaderCell>Prénom</Table.HeaderCell>
                            <Table.HeaderCell>Adresse</Table.HeaderCell>
                            <Table.HeaderCell>Photo</Table.HeaderCell>
                            <Table.HeaderCell>Numéro de téléphone</Table.HeaderCell>
                            <Table.HeaderCell>Email</Table.HeaderCell>
                            <Table.HeaderCell>Role</Table.HeaderCell>
                            <Table.HeaderCell>Date d'inscription</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {this.displayUsers(users)}
                    </Table.Body>
                </Table>
            </div>
        );
    }
};
}

export default AdminUsersPage;