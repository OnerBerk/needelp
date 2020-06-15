import React, {Component} from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react'


class Calendar extends Component {

  constructor(props){
    const url = window.location.href;
    const urlArray = url.split('/');
    const urlLength = urlArray.length - 1
    const supplierId = urlArray[urlLength]

    super(props)

    this.state={
      startdate: new Date(),
      content: [],
      supplierId: supplierId,
      user: "",
      x: false,
      title:''

    }
      localStorage.setItem('supplierId', this.state.supplierId)
    this.handelStartdatechange = this.handelStartdatechange.bind(this);
    this.handelContentchange = this.handelContentchange.bind(this);
    this.handelTitlechange = this.handelTitlechange.bind(this)
  }

  handelStartdatechange=(e) =>{
    console.log(e)
    this.setState({
      startdate: e
    })

  }
  handelContentchange=(e) =>{
    console.log(e)
    this.setState({
      content: e.target.value
    })
  }

  handelTitlechange=(e) =>{
    console.log(e)
    this.setState({
      title: e.target.value
    })
  }

  Devis = (e) =>{
    console.log("ligne47", this.state.supplierId)

    const headers = { 'authorization': Cookies.get('token') }
    axios.post("http://localhost:8080/devis" ,{
      title:this.state.title,
      supplierId: this.state.supplierId,
      content: this.state.content,
      startdate: this.state.startdate

    }
    , { headers: headers })
        .then((response) => {
            console.log("Success")
        })
        .catch((err) => {
            console.log("err")
        })
  }
  render(){
   

    if(Cookies.get('token')){

    return (
        <div>


        <DatePicker selected={this.state.startdate}

        onChange={this.handelStartdatechange}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            timeCaption="time"
            dateFormat=" d, MMMM, yyyy h:mm "
        />
          <div>
          <input type="text" placeholder="Objet" value={this.state.title} onChange={this.handelTitlechange} />
          </div>
          <div>
          <input type="text" placeholder="rediger votre probleme" value={this.state.content} onChange={this.handelContentchange} />
          </div>
          <button onClick={this.Devis}>Demmande de devis</button>
        </div>
    );

  }
  else {
    return (
    <div>
<br/>
    Vous souhaitez prendre un Rdv ou passer votre commande ? 
 <Button.Group>
 <Link to ="/registeruser">
    <Button > inscription</Button>
    </Link>
    <Button.Or text='ou' />
    <Link to ="/loginUser">
    <Button primary >connexion</Button>
    </Link>
  </Button.Group>

    </div>
  );
}
}
}



export default Calendar
