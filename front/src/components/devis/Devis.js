import React, {Component} from 'react';
import axios from "axios";
import { Card } from 'semantic-ui-react';


class Devis extends Component{
  constructor(props){
    super(props);
    this.state = {
     data: [],
   }
   this.getDevis =this.getDevis.bind(this)
   this.DisplayDevis = this.DisplayDevis.bind(this)
  }


  getDevis = () =>  {
    const supplier = localStorage.getItem('supplierId')
    //console.log("LIGNE23",supplier)

    const params = supplier
    axios.post('http://localhost:8080/getdevis/', { params })
    .then((resultFromServer)=>{

      const x = resultFromServer.data
      this.setState({
        data: x
      });
      console.log(this.state.data)
      localStorage.setItem('data', JSON.stringify(this.state.data))
  
    })
  }
  
  
  DisplayDevis = (data) =>{
    
    if (!data.length) return null
    return data.map((devis, index)=>(
      <div key={index} className="container" style={{paddingLeft: "30%", paddingRight: "30%", paddingTop: "1%"}}>

      <Card fluid href= {"http://localhost:3000/supplier/repDevis/" + devis._id }>
      <Card.Content>
        <Card.Header>Devis" {devis.title}</Card.Header>
        <Card.Description>
        Demande le : { devis.date } 
        </Card.Description>
      </Card.Content>
      </Card>
      </div>
    ))
  }
  componentDidMount = () => {
    this.getDevis()
    this.DisplayDevis(this.state.data)
}


  render(){
      return (
        <div className="getdevis">
        
              <div>
                {this.DisplayDevis(this.state.data)}
              </div>
        </div>
    )
  }
}



export default Devis;
