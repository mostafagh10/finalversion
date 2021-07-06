import React, { Component , useEffect } from 'react';
import axios from 'axios'
import Data from '../data/index'
import Form from '../form/index'
import World from '../worlddata/index'
import './style.css'
import ShowUserStatisticsHeader from '../../userheader/statistics';
import AOS from 'aos'
import "aos/dist/aos.css"

class Mainstatistics extends Component {
  constructor(props){
    super(props);

    this.getcountrydata = this.getcountrydata.bind(this);
  }
  componentDidMount(){
    AOS.init({
      duration : 1000
  });
  }
  state = {
    confirmed : 0,
    recovered : 0,
    deaths : 0,
    countries : [],
    confirmed2:0,
    recovered:0,
    deaths:0
  }

  componentDidMount(){
    this.getdata();
  }

  async getdata(){
    const restapi = await axios.get("https://covid19.mathdro.id/api");
    const restcountries = await axios.get("https://covid19.mathdro.id/api/countries");
    const dailycountries = await axios.get("https://covid19.mathdro.id/api/daily/8-12-2020");
    //const countries = Object.keys(restcountries.data.countries);
    const x = [];
    for(var i = 0; i < restcountries.data.countries.length; i++){
        x.push(restcountries.data.countries[i].name);
     }

    this.setState({
      confirmed : 0,
      recovered : 0,
      deaths :0, 
      countries : x,
      confirmed2:restapi.data.confirmed.value,
      recovered2:restapi.data.recovered.value,
      deaths2:restapi.data.deaths.value
    })
  }

  async getcountrydata (e) {
    const res = await axios.get(`https://covid19.mathdro.id/api/countries/${e.target.value}`);
    this.setState({
      confirmed : res.data.confirmed.value,
      recovered : res.data.recovered.value,
      deaths : res.data.deaths.value
    })
  }

  returncountries = () => {
    return this.state.countries.map((country , i) => {
      return <option key={i}>{country}</option>
    });
  }

  render(){
  return (
    <>
    <ShowUserStatisticsHeader />
    <div className="Mainstatistics">
      <p>.</p>
      <div className="container" style={{textAlign:'center'}}>
      <World data={this.state} /><br />
      <Form getcountrydata={this.getcountrydata} returncountries={this.returncountries} /><br />
      <Data data={this.state} />
      </div>
    </div>
    </>
  );
  }
}

export default Mainstatistics;
