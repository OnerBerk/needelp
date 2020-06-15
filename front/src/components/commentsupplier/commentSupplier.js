import React, { Component } from 'react';
import axios from "axios";
import Cookies from 'js-cookie';
import { Button,  Icon,  List, Table} from 'semantic-ui-react'


class CommentSupplier extends Component {
    constructor(props) {
        const url = window.location.href;
        const urlArray = url.split('/');
        const urlLength = urlArray.length - 1
        const supplierId = urlArray[urlLength]
        
        super(props);
        this.state = {
            comments: [],
            content: "",
            supplierId: supplierId,
            user: "",
            note: "",
            notes:[],
            total:0,            
            answer: "",
            answers: [],
        };
        this.handleContentChange = this.handleContentChange.bind(this);
        this.handleNoteChange = this.handleNoteChange.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
    }
    
    createComment = () => {
        const headers = { 'authorization': Cookies.get('token') }
        axios.post("http://localhost:8080/suppliers/createComment/" + this.state.supplierId, {
            supplier: this.state.supplierId,
            content: this.state.content,
            note: this.state.note
        // user: this.state.user
    }, { headers: headers })
        .then((response) => {
            console.log("Success")
            window.location.reload(false)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    answerComment = (commentId) => {
        const headers = { 'authorization': Cookies.get('token') }
        console.log("eh ho Answer comment: ", commentId)
        axios.post("http://localhost:8080/suppliers/answerComment/"+commentId, {
            answer: this.state.answer,

        }, { headers: headers })
        .then((response) => {
            console.log("Answer ", this.state.answer)
            console.log("Answer Success")
            window.location.reload(false)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    getCommentsbySupplier = () => {
        const params = { supplierId: this.state.supplierId }
        axios
        .get("http://localhost:8080/suppliers/comments/" + this.state.supplierId, { params })
        .then((response) => {
            let total = 0
            const average = []
            this.setState({ comments: response.data })
            this.state.comments.forEach (element=>{
                average.push(element.note)
                total+=element.note
            })
            this.setState({ notes: average,total:total })

        })
        .catch((err) => {
            console.log(err);
        })
    }

    getAllAnswers = () => {
        axios
        .get("http://localhost:8080/suppliers/answers")
        .then((response) => {     
            console.log('fonction getAllAnswers'+response) 
            this.setState({ answers: response.data })
        })
        .catch((err) => {
            console.log(err);
        })
    }

    displayAnswers = (commentId) => {
        const getAllAnswers = this.state.answers;
        //console.log('Récupère les réponses :', getAllAnswers);
        const answerList =  getAllAnswers.map((answer) => {
            if(commentId === answer.commentId){
                return (
                    <div className="container" style={{ padding: "4%" }}>

                   <Table celled>
                    <Table.Header>
                    <Table.Row >
                    <Table.HeaderCell ><List relaxed>
                    <List.Item>

                    <h5> Réponse de {answer.commentedBy} {" "} le {answer.date}</h5>
                    <List.Header as='a'><h5>  </h5></List.Header>
                    <List.Description>
                    <p></p>{' '}
                    <a>
                    <p>{answer.answer}</p>
                    </a>{' '}
                   </List.Description>
                    </List.Item>
                    </List> </Table.HeaderCell>
                    </Table.Row>
                    </Table.Header>
                    </Table>                           
                    </div>
                    )
                }
            })
            // return(<div>Patate</div>)
                return (answerList);
            }


            displayComments = (comments) => {
                const getAllComments = comments;
                const commentsList = getAllComments.map((comment) => {
                    return (
                    <div className="container" style={{ padding: "5%" }}>

                    <Table celled>
                    <Table.Header>
                    <Table.Row >
                    <Table.HeaderCell ><List relaxed>
                    <List.Item>
                    <h5> Posté le {" "} {new Date(comment.date).toDateString()} par </h5>
                    <List.Header as='a'><h5> {comment.user} </h5></List.Header>
                    <List.Description>
                    <p>Note : {comment.note}<Icon name='star' color="yellow" /></p>{' '}
                    <a>
                    <p>{comment.content}</p>
                    </a>{' '}

                    </List.Description>

                    </List.Item>
                    </List> </Table.HeaderCell>

                    </Table.Row>
                    </Table.Header>


                    </Table>                                            

                    <div>

                    <div>{this.displayAnswers(comment._id)}</div>

                    <input onChange={this.handleTextChange} placeholder="Répondre"></input>
                    <Button  primary onClick={ () => {this.answerComment(comment._id)}}>Répondre</Button>
                    <hr />      
                    </div>
                    </div>
                    )
                });
                return (commentsList);
            }


            componentDidMount() {
                this.getCommentsbySupplier();
                this.getAllAnswers();
            }


            handleContentChange = (e) => {
                this.setState({
                    content: e.target.value
                })
                this.setState({
                    user: Cookies.get('token')
                })
            }

            handleTextChange = async (e) => {
                await this.setState({ answer: e.target.value })

                // this.setState({
            //     user: Cookies.get('token')
            // })
        }
        
        handleNoteChange(event) {
            this.setState({note: event.target.value});
        }
        
        render() {
            let comments = this.state.comments;
            return (
                <div>
                <p> Note Moyenne : {(this.state.total/this.state.notes.length).toFixed(1)} <Icon name='star' color="yellow" /></p>

                <br/>
                <Table celled>
                <Table.Header>
                <Table.Row textAlign='center'>
                <Table.HeaderCell ><h2 className="title">Commentaires</h2></Table.HeaderCell>
                </Table.Row>
                </Table.Header>
                </Table>


                
                <h3 className="add comment">Ajouter un commentaire</h3>
                <input value={this.state.content} onChange={this.handleContentChange} placeholder=" Commenter" />
                <Button primary onClick={this.createComment}>Valider</Button>
                <p>Noter le fournisseur :</p>
                <select value={this.state.note}  onChange={this.handleNoteChange}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                </select>
                
                {this.displayComments(comments)}
                
                </div>
                );
            };
        }
        export default CommentSupplier;
        
        