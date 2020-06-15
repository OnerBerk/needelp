import React, { Component } from 'react';
import axios from "axios";
import Cookies from 'js-cookie';
import { Link } from "react-router-dom";
import { Header, Table, Button, Input } from 'semantic-ui-react';

class AdminCRUDCommentsPage extends Component {
    constructor(props) {
        super(props);
        const url = window.location.href;
        const urlArray = url.split('/');
        const urlLength = urlArray.length - 1
        const commentId = urlArray[urlLength]
        console.log("Comment ID", commentId)
        this.state = {
            content: "",
            date: "",
            note: "",
            user: "",
            supplier: "",
            commentId: commentId,
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
            commentId: this.state.commentId,
            content: this.state.content,
            date: this.state.date,
            note: this.state.note,
            user: this.state.user,
            supplier: this.state.supplier,
        }
        if (this.state.content === '') data.content = this.state.oldcontent
        if (this.state.date === '') data.date = this.state.olddate
        if (this.state.note === '') data.note = this.state.oldnote
        if (this.state.user === '') data.user = this.state.olduser
        if (this.state.supplier === '') data.supplier = this.state.oldsupplier

        axios.post('http://localhost:8080/admin/comments/settings/:commentId', data, { headers: headers })
            .then(res => {
                window.location.reload(false)
            })
    }

    componentDidMount() {
        const headers = { 'authorization': Cookies.get('token') }
        const params = { commentId: this.state.commentId }
        axios.get('http://localhost:8080/admin/comments/settings/' + this.state.commentId, { headers: headers }, { params })
            .then(res => {
                this.setState({
                    content: res.data.content,
                    oldcontent: res.data.content,
                    date: res.data.date,
                    olddate: res.data.date,
                    note: res.data.note,
                    oldnote: res.data.note,
                    user: res.data.user,
                    olduser: res.data.user,
                    supplier: res.data.supplier,
                    oldsupplier: res.data.supplier,
                    admin: 'true'

                })
            })
            .catch(error => {
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
                        <Header.Content>Admin - Commentaires </Header.Content>
                    </Header>

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
                                    <Table.Cell>Contenu</Table.Cell>
                                    <Table.Cell>{this.state.oldcontent}</Table.Cell>
                                    <Table.Cell><Input name="content" onChange={this.handleChange} type="text" transparent placeholder="Nouveau contenu"></Input></Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>Date</Table.Cell>
                                    <Table.Cell>{this.state.olddate}</Table.Cell>
                                    <Table.Cell><Input name="date" onChange={this.handleChange} type="text" transparent placeholder="Nouvelle date"></Input></Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>Note</Table.Cell>
                                    <Table.Cell>{this.state.oldnote}</Table.Cell>
                                    <Table.Cell><Input name="note" onChange={this.handleChange} type="text" transparent placeholder="Nouvelle note" /></Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>Utilisateur</Table.Cell>
                                    <Table.Cell>{this.state.olduser}</Table.Cell>
                                    <Table.Cell><Input name="user" onChange={this.handleChange} type="text" transparent placeholder="Nouvel utilisateur" /></Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>Fournisseur</Table.Cell>
                                    <Table.Cell>{this.state.oldsupplier}</Table.Cell>
                                    <Table.Cell><Input name="supplier" onChange={this.handleChange} type="text" transparent placeholder="Nouveau fournisseur" /></Table.Cell>
                                </Table.Row>

                            </Table.Body>
                        </Table>
                        <Button type="submit" value="Modifier">Modifier</Button>
                    </form>
                    <br></br>

                </div>
            );
        }
    };
}


export default AdminCRUDCommentsPage;