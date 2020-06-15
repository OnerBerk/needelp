
import React, {Component} from 'react';

class x extends Component{
  constructor(props){
    super(props);
    this.state = {
      searchSupplier:"",
     placeHolder: "Wath are you search ?"}
  }
  handleChange(event){
    this.setState({searchSupplier:event.target.value});

  }



  render(){
      return (
        <div>
          <input onChange = {this.handleChange.bind(this)} placeholder = {this.state.placeHolder}/>
          <p> {this.state.searchSupplier}</p>
        </div>
    )
  }

}


export default x;
