import React, { Component } from 'react';
import axios from "axios";
import Cookies from 'js-cookie';
import { Link } from "react-router-dom";
import { Icon, Header, Table, Button } from 'semantic-ui-react'

class AdminCommentsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: [],
            admin: 'false',
        };
    }

    getAllComments = () => {
        const headers = { 'authorization': Cookies.get('token') }
        axios
            .get("http://localhost:8080/admin/comments", { headers: headers })
            .then((response) => {
                console.log("getAllusers response", response);
                console.log("getAllusers response.data", response.data);
                this.setState({ comments: response.data, admin: 'true' })
            })
            .catch((err) => {
                console.log(err);
                window.location.href = "http://localhost:3000/404";
            })
    }

    displayComments = (comments) => {
        const getAllComments = comments;
        //  console.log("json", JSON.stringify(getAllUsers));
        const commentsList = getAllComments.map((comment) => {
            return (
                <Table.Row>
                    <Table.Cell><Link to={"/admin/comment/" + comment._id}>{comment.content}</Link></Table.Cell>
                    <Table.Cell><Link to={"/admin/comment/" + comment._id}>{comment.date}</Link></Table.Cell>
                    <Table.Cell><Link to={"/admin/comment/" + comment._id}>{comment.note}</Link></Table.Cell>
                    <Table.Cell><Link to={"/admin/comment/" + comment._id}>{comment.user}</Link></Table.Cell>
                    <Table.Cell><Link to={"/admin/comment/" + comment._id}>{comment.supplier}</Link></Table.Cell>
                </Table.Row >
            )
        });
        return (commentsList);
    }

    async componentDidMount() {
        await this.getAllComments();
    }

    render() {
        if (this.state.admin === 'false') {
            return (
                <div></div>
            )
        }
        else {
            let comments = this.state.comments;
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
                        <Header.Content>Admin - Commentaires</Header.Content>
                    </Header>
                    <br></br>
                    <Table celled selectable>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Contenu</Table.HeaderCell>
                                <Table.HeaderCell>Date</Table.HeaderCell>
                                <Table.HeaderCell>Note</Table.HeaderCell>
                                <Table.HeaderCell>Utilisateur</Table.HeaderCell>
                                <Table.HeaderCell>ID Fournisseur</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {this.displayComments(comments)}
                        </Table.Body>
                    </Table>
                </div>
            );
        }
    };
}

export default AdminCommentsPage;