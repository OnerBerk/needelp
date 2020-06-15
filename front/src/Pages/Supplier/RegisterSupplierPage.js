import React from 'react';
import axios from 'axios';
import { Link, Redirect } from "react-router-dom";
import { Menu, Form, Button, Segment } from 'semantic-ui-react'
//import './RegisterForm.css';

class RegisterSupplierPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      address: "",
      phone: "",
      particulier: "",
      supplier: "",
      typesupplier: "",
      siret: "",
      zip: "",
      city: "",
      expertise: "",
      service: "",
      redirect: false,
      error: false,
      activeItem: 'supplierRegister'
      
      
    }
    this.handleFirstnameChange = this.handleFirstnameChange.bind(this);
    this.handleLastnameChange = this.handleLastnameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    // this.handleParticulierChange = this.handleParticulierChange.bind(this);
    // this.handlesupplierChange = this.handleSupplierChange.bind(this);
    this.handleSiretChange = this.handleSiretChange.bind(this);
    this.handleZipeChange = this.handleZipeChange.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
    this.handleExpertiseChange = this.handleExpertiseChange.bind(this);
    this.handleServiceChange = this.handleServiceChange.bind(this);
    
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  
  handleTypeChange = (event) => {

    this.setState({
      typesupplier: event.target.value
    })
    
  }
   // handleParticulierChange = (event) => {
  //   const target = event.target;
  //    const value = target.name === 'particulier' ? target.checked : target.value;
    
  //    const name = target.name;
  //   this.setState({
  //     particulier: event.target.value
  //   })
    
  // }
  // handleSupplierChange = (event) => {
  //   const target = event.target;
  //    const value = target.name === 'professionnel' ? target.checked : target.value;
    
  //    const name = target.name;
  //   this.setState({
  //     supplier: event.target.value
  //   })
    
  // }
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
  
  handleSiretChange = (e) => {
    this.setState({
      siret: e.target.value
    })
  }
  handleZipeChange = (e) => {
    this.setState({
      zip: e.target.value
    })
  }
  handleCityChange = (e) => {
    this.setState({
      city: e.target.value
    })
  }
  handleExpertiseChange = (e) => {
    this.setState({
      expertise: e.target.value
    })
  }
  
  handleServiceChange = (e) => {
    this.setState({
      service: e.target.value
    })
  }
  registerSupplier = (e) => {
    
    console.log(this.state);
    axios.post('http://localhost:8080/supplierRegister', {
    firstname: this.state.firstname,
    lastname: this.state.lastname,
    email: this.state.email,
    password: this.state.password,
    address: this.state.address,
    phone: this.state.phone,
    particulier: this.state.particulier,
    typesupplier: this.state.typesupplier,
    supplier: this.state.supplier,
    siret: this.state.siret,
    zip: this.state.zip,
    city: this.state.city,
    expertise: this.state.expertise,
    service: this.state.service
    
  })
  .then(function (response) {
    // Quand resulat OK => Redirige vers la bonne page
  })
  .then(() => this.setState({ redirect: true, error: false })) 
  .catch(function (error) {
    alert(error.response.data.error);
  });
}

handleSubmit(event) {
  if (!event.target.checkValidity()) {
    // form is invalid! so we do nothing
    return;
  }
  // form is valid! We can parse and submit data
}

render() {
  const { activeItem } = this.state
  
  if (this.state.redirect) {
    return (<Redirect to = "/loginSupplier"/>)
}
  return (
<div className="container" style = {{paddingLeft: "30%", paddingRight: "30%"}}>  
  <Form key= 'medium'>
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

    <h1>Formulaire d'inscription Fournisseur</h1>
      
    <Form.Input 
      //error={{ content: 'Entrer votre prénom.', pointing: 'below' }}
      fluid
      label='Prénom'
      placeholder='Prénom'
      id='form-input-first-name'
      type="text" 
      value={this.state.firstname} 
      onChange={this.handleFirstnameChange} 
    />
    <Form.Input
      //error='Entrez votre nom.'
      fluid
      label='Lastname'
      type="text" 
      placeholder="Nom" 
      value={this.state.lastname} 
      onChange={this.handleLastnameChange}
    />
    <Form.Input
      // error='Entrez un email.'
      fluid
      label='Email'
      type="email"
      pattern ='/.+\@.+\..+/'
      placeholder="Email" 
      value={this.state.email} 
      onChange={this.handleEmailChange}
    />

    <Form.Input
      // error='Entrez une adresse.'
      fluid
      label='Adresse'
      type="text" 
      placeholder="Adresse" 
      value={this.state.address} 
      onChange={this.handleAddressChange}
    />
    <Form.Input
      // error='Entrez une adresse.'
      fluid
      label='Ville'
      type="text" 
      placeholder="Ville" 
      value={this.state.city} 
      onChange={this.handleCityChange}
    />
    <Form.Input
      // error='Entrez une adresse.'
      fluid
      label='Code Postal'
      type="number" 
      placeholder="Code postal" 
      value={this.state.zip} 
      onChange={this.handleZipeChange}
    />
    <Form.Input
      // error='Entrez un téléphone.'
      fluid
      label='Téléphone'
      type="texte" 
      placeholder="Telephone" 
      value={this.state.phone} 
      onChange={this.handlePhoneChange}
    />
    <Form.Input
      // error='Entrez un téléphone.'
      fluid
      label='Siret'
      type="number" 
      placeholder="Siret" 
      value={this.state.siret} 
      onChange={this.handleSiretChange}
    />
      <Form.Group inline>
          <label>Type de Fournisseur</label>
          <Form.Radio
            label='Particulier'
            value='particulier'
            name='particulier'
            checked={this.state.typesupplier}  
            onChange={this.handleTypeChange} 
          />
          <Form.Radio
            label='Professionnel'
            value='professionnel'
            name='professionnel'
            type="checkbox"
            checked={this.state.typesupplier}
            onChange={this.handleTypeChange}
          />

        </Form.Group>
      <Form.Input
      // error='Entrez un téléphone.'
      fluid
      label='Service'
      type="text" 
      placeholder="Profession" 
      value={this.state.service} 
      onChange={this.handleServiceChange}
      />
      <Form.Input
      // error='Entrez un mot de passe.'
      fluid
      label='Mot de passe.'
      type="password" 
      placeholder="Mot de passe" 
      value={this.state.password} 
      onChange={this.handlePasswordChange}
    />
    <Form.Input
      // error='Veuillez confirmer votre mot de passe.'
      fluid
      type="password" 
      placeholder="Confirmer le mot de passe"
    />

    <Button type= "button" onClick={this.registerSupplier}>S'inscrire</Button>
    </Segment>
  </Form>
  </div>  
    );
  }
}

export default RegisterSupplierPage;
