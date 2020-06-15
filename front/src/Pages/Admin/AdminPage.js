import React, { Component } from 'react';
import Cookies from 'js-cookie';
import axios from "axios";
import { Menu } from 'semantic-ui-react';
import { Header, Icon } from 'semantic-ui-react';


class AdminPage extends Component {
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

    render() {
        if (this.state.admin === 'false') {
            return (
                <div></div>
            )
        }
        else {
            return (
                <div className="container">
                    <div>
                        <Menu widths={3}>
                            <Menu.Item href='/admin/users' target=''>
                                Gérer les utilisateurs
                             </Menu.Item>
                            <Menu.Item href='/admin/suppliers' target=''>
                                Gérer les fournisseurs
                             </Menu.Item>
                            <Menu.Item href='/admin/comments' target=''>
                                Gérer les commentaires
                             </Menu.Item>
                            {/* <Link to="/admin/quotes">
                    <button>
                    Afficher les devis
                    </button>
                </Link> */}
                        </Menu>
                    </div>
                    <br></br>
                    <div>
                        <Header as='h2' icon textAlign='center'>
                            <Icon name='users' circular />
                            <Header.Content>Admin</Header.Content>
                        </Header>

                    </div>

                </div>
            )
        }
    }
};

export default AdminPage;