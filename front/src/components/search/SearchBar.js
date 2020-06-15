import React, {Component} from 'react';
import axios from "axios";
import { Button, Icon, Input, Card } from 'semantic-ui-react'

class SearchBar extends Component{
  constructor(props){
    super(props);
    this.state = {
      service:"",
      data: [],
    }
    this.DisplaySupplier = this.DisplaySupplier.bind(this)
  }

  handleServiceChange = (e) => {
    console.log(e.target.value);
    this.setState({
     service: e.target.value
   })
  }
  getSupplierService = (e) =>  {
    axios.post('http://localhost:8080/service',{

      service: this.state.service
    })
    .then((resultFromServer)=>{
      this.setState({
        data: resultFromServer.data

      });
    })
  }

  DisplaySupplier = (data) =>{

    if (!data.length) return null


      return data.map((supplier, index)=>(
        <div key={index} className='display' style={{padding: "1%"}}>
        <a href= {"http://localhost:3000/accountsupplier/" + supplier._id }>
        
          <Card >
            <Card.Content>
              <Card.Header>{supplier.firstname} {supplier.lastname}</Card.Header>
                <Card.Meta>{supplier.service}</Card.Meta>

              <Card.Description>
                {supplier.city}
              </Card.Description>
            </Card.Content>
          </Card>
        </a>
        </div>
        ))
      }
      render(){
        return (
        <div className="search" fluid style= {{paddingLeft:"25%", paddingRight:"25%"}}>
        <div style={{position: "relative"}}>
          <Input fluid icon value={this.state.service} onChange = {this.handleServiceChange} placeholder='A votre service !' >
            <input />
              <Icon name='search' />
            </Input>
       
        <div style={{position: "absolute", top: "4%", right: "-15%"}}>
        <Button primary  onClick={this.getSupplierService}>Chercher</Button>
        
        </div>  
        </div>
        <div className="container" style={{paddingTop: "3%"}}>
        <Card.Group >
          {this.DisplaySupplier(this.state.data)} 
          </Card.Group>
        </div>
        </div>
        )
      }
    }



    export default SearchBar;
