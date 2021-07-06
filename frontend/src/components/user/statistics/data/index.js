import React, { Component , useEffect } from 'react';
import axios from 'axios'
import './style.css'
import AOS from 'aos'
import "aos/dist/aos.css"

class Data extends Component {

  componentDidMount(){
    AOS.init({
      duration : 1000
  })
 }

  render(){
  return (
    <div className="Data">
    <div className="row">
    <div className="col-md-4">  
    <div className="card confirmed allcard_s" data-aos="fade-right">
      <h2><span className="fas fa-clipboard-check"></span></h2>
      <h1>Confirmed</h1>  
      <h3>{this.props.data.confirmed} cases</h3>
      </div>
    </div>
    <div className="col-md-4">
    <div className="card  recovered allcard_s" data-aos="fade-up">
    <h2><span className="fas fa-heart"></span></h2>
      <h1>Recovered</h1>
      <h3>{this.props.data.recovered} cases</h3>
      </div>
      </div>
    <div className="col-md-4">
    <div className="card deaths allcard_s" data-aos="fade-left">
    <h2><span className="fas fa-heartbeat"></span></h2>
      <h1>Deaths</h1>
      <h3>{this.props.data.deaths} cases</h3>
      </div>
    </div>

    </div>
    </div>
  );
  }
}

export default Data;
