import React from 'react';
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import { Menu, Form, Button, Segment } from 'semantic-ui-react'
//import './RegisterForm.css';
class RegisterUserPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      address: "",
      phone: "",
      redirect: false,
      activeItem: 'userRegister', 
      
      
    }
    this.handleFirstnameChange = this.handleFirstnameChange.bind(this);
    this.handleLastnameChange = this.handleLastnameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
    
  }
  
  
  handleFirstnameChange = (e) => {
    this.setState({
      firstname: e.target.value
    })
  }
  
  handleLastnameChange = (e) => {
    this.setState({
      lastname: e.target.value
    })
  }
  
  handleEmailChange = (e) => {
    this.setState({
      email: e.target.value
    })
  }
  
  handlePasswordChange = (e) => {
    this.setState({
      password: e.target.value
    })
  }
  
  handleAddressChange = (e) => {
    this.setState({
      address: e.target.value
    })
  }
  handlePhoneChange = (e) => {
    this.setState({
      phone: e.target.value
    })
  }
  
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  
  
  registerUser = (e) => {
    
    axios.post('http://localhost:8080/register', {
    firstname: this.state.firstname,
    lastname: this.state.lastname,
    email: this.state.email,
    password: this.state.password,
    address: this.state.address,
    phone: this.state.phone,
    
    
  })
  .then(function (response) {
    // Quand resulat OK => Redirige vers la bonne page
    // console.log('on est dans register baby', response)
  })
  .then(() => this.setState({ redirect: true })) 
  .catch(function (error) {
    alert("Veuillez renseigner les champs manquants.");
  });
  
  
}


render() {
  const { activeItem } = this.state
  if (this.state.redirect) {
      return (<Redirect to = "/loginUser"/>)
  }
  return (
<div className="container" style = {{paddingLeft: "30%", paddingRight: "30%"}}>
<Form>
  <Segment>
    <Menu  attached='top' tabular>
        <Link to ="/registerUser">
          <Menu.Item name='/userRegister' active={activeItem === 'userRegister'} onClick={this.handleItemClick}>
            Inscription Utilisateur
          </Menu.Item>
        </Link>
        <Link to ="/registerSupplier">
          <Menu.Item name='supplierRegister' active={activeItem === 'supplierRegister'} onClick={this.handleItemClick}>
            Inscription Fournisseur
          </Menu.Item>
        </Link>
      </Menu>
      <h1>Formulaire d'inscription Utilisateur</h1>
      
    <Form.Input
      // error={{ content: 'Entrer votre prénom.', pointing: 'below' }}
      fluid
      label='Prénom'
      placeholder='Prénom'
      id='form-input-first-name'
      value={this.state.firstname} 
      onChange={this.handleFirstnameChange}
    />
    <Form.Input
      // error='Entrez votre nom.'
      fluid
      label='Lastname'
      placeholder="Nom" 
      value={this.state.lastname} 
      onChange={this.handleLastnameChange}
    />
    <Form.Input
      // error='Entrez un email.'
      fluid
      type = "email"
      label='Email'
      placeholder="Email" 
      value={this.state.email} 
      onChange={this.handleEmailChange}
    />
    <Form.Input
      // error='Entrez une adresse.'
      fluid
      type="text"
      label='Adresse'
      placeholder="Adresse" 
      value={this.state.address} 
      onChange={this.handleAddressChange}
    />
    <Form.Input
      // error='Entrez un téléphone.'
      fluid
      type="phone"
      label='Téléphone'
      placeholder="Téléphone" 
      value={this.state.phone} 
      onChange={this.handlePhoneChange}
    />
    <Form.Input
      // error='Entrez un mot de passe.'
      fluid
      type="password"
      label='Mot de passe.'
      placeholder="Mot de passe." 
      value={this.state.password} 
      onChange={this.handlePasswordChange}
    />
    <Form.Input
      // error='Veuillez confirmer votre mot de passe.'
      fluid
      type="password"
      label='Confirmation de mot de passe'
      placeholder="Confirmer le mot de passe" 
    />

    <Button centered type= "button" onClick={this.registerUser} >S'inscrire</Button>
  </Segment>
  </Form>
  </div>    
    );
  }
}


export default RegisterUserPage;
