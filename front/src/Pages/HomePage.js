import React from 'react';
//import './style/Home.css';
import SearchBar from '../components/search/SearchBar';
import { Card, Image, Header } from 'semantic-ui-react'
import BabySitting from '../images/babysitting.jpg'
import CoursParticuliers from '../images/coursparticuliers.jpg'
import Jardinage from '../images/jardinage.jpg'
import Informatique from '../images/informatique.jpg'
import Menage from '../images/menage.jpg'
import Cuisine from '../images/cuisine.jpg'


function HomePage() {
	return (
		
		<div className= "container"> 

		<Header  textAlign='center'   style={{color: "grey", paddingTop: "3%"}}  icon >
	
     		<h2> All you Need is ... Help </h2>

 		</Header>

		<div className="homeFormDiv" style= {{padding: "5%"}} >
				<div className="container" >
		 <SearchBar />
		</div> 
		<br/>
	
		<div className="container" style={{paddingTop:"5%"}}>
		<Card.Group stackable style={{marginLeft:"10px"}} itemsPerRow={3}>
		<Card color='red'   >
		<Image src={BabySitting}  />
		<Card.Content>
		<Card.Header textAlign='center'  >Garde d'enfants</Card.Header>  
		</Card.Content>
		</Card >
		<Card color='orange'>
		<Image src={Cuisine} />
		<Card.Content textAlign='center'>
		<Card.Header>Cuisine</Card.Header>  
		</Card.Content>
		</Card>
		<Card color='yellow'>
		<Image src={Jardinage} />
		<Card.Content textAlign='center'>
		<Card.Header>Jardinage</Card.Header>  
		</Card.Content>
		</Card>
		<Card color='olive'>
		<Image src={CoursParticuliers} />
		<Card.Content textAlign='center'>
		<Card.Header>Cours particuliers</Card.Header>  
		</Card.Content>
		</Card>
		<Card color='green'>
		<Image src={Informatique} />
		<Card.Content textAlign='center'>
		<Card.Header  >Informatique</Card.Header>  
		</Card.Content>
		</Card>
		<Card color='teal'>
		<Image src={Menage} />
		<Card.Content textAlign='center'>
		<Card.Header>Ménage</Card.Header>  
		</Card.Content>
		</Card>
		</Card.Group>
		<br/> <br/>
		</div>
  <Header as='h3'  textAlign='center'  block>

    Un site innovant de Needelp 
  </Header>
		</div>
	</div>





		);
	}

	export default HomePage;
