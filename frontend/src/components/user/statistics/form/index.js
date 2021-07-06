import React, { Component } from 'react';
import axios from 'axios'
import './style.css'

class Form extends Component {

  render(){
  return (
    <div className="Form">
      <select className="selectstatistics" onChange={this.props.getcountrydata}>
      <optgroup>
      <option selected hidden>select the country</option>
        {this.props.returncountries()}
      </optgroup>
      </select>
    </div>
  );
  }
}

export default Form;
