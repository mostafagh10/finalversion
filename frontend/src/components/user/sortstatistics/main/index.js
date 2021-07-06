import React , {Component} from 'react';
import axios from 'axios'
import Confirmed from '../rates/confirmed'
import Recovered from '../rates/recovered'
import Deaths from '../rates/deaths'
import Button from '../rates/buttons'
import {BrowserRouter,Route,HashRouter} from 'react-router-dom'
import './style.css';


class MainSortingStatistics extends Component {
  state = {
  list : [   
      {
      country:null,
      confirmed:null,
      recovered:null,
      recovered2:null,
      deaths:null,
      deaths2:null
      }
    ],
    setloading : false
  }

  componentDidMount(){
    this.getdata();
  }

  async getdata(){
    const restapi = await axios.get("https://covid19.mathdro.id/api");
    const restcountries = await axios.get("https://covid19.mathdro.id/api/countries");
    //const countries = Object.keys(restcountries.data.countries);
    const countries = [];
    for(var i = 0; i < restcountries.data.countries.length; i++){
      if(restcountries.data.countries[i].name === "Gambia"){
        continue;
      }
      else{
      const obj = {};
      obj["country"]=restcountries.data.countries[i].name;
      const q = obj["country"];
      console.log(i+1 + " : " + q);
      const res = await axios.get(`https://covid19.mathdro.id/api/countries/${q}`);
      obj["confirmed"]=res.data.confirmed.value;
      obj["recovered"]=res.data.recovered.value;
      var s1 = (res.data.recovered.value/res.data.confirmed.value)*100;
      if((res.data.recovered.value == 0) || (res.data.recovered.value == res.data.confirmed.value)){
        obj["recovered2"] = 100;
      }
      else{
      obj["recovered2"]= s1.toFixed(2);
      }
      obj["deaths"]=res.data.deaths.value;
      var s = (res.data.deaths.value/res.data.confirmed.value)*100;
      if(res.data.deaths.value == 0){
        obj["deaths2"] = 0;
      }
      else{
      obj["deaths2"] = s.toFixed(2);
      }
      countries.push(obj)
      }
     }
    this.setState({
      list : countries,
      setloading : true
    })
  }

  returncountries = () => {
    const {list} = this.state;
    const highestconfirmed = [].concat(this.state.list).sort((a, b) => a.confirmed < b.confirmed ? 1 : -1)
    return highestconfirmed.map((s,i) => {
      return this.state.setloading ? 
      <tr key={i}>
          <td data-label="rate">{i+1}</td>
          <td data-label="country">{s.country}</td>
          <td data-label="confirmed"><b className="c">{s.confirmed}</b></td>
          <td data-label="recovered">{s.recovered}<br />({s.recovered2})%</td>
          <td data-label="deaths">{s.deaths}<br />({s.deaths2})%</td>
        </tr>
        : <tr>
        <td colSpan="5"><h1>please wait <span className="s1">&bull;</span>
        <span className="s2">&bull;</span>
        <span className="s3">&bull;</span>
        <span className="s4">&bull;</span></h1></td>
        </tr>
    })
  }

  returncountries2 = () => {
    const {list} = this.state;
    const highestconfirmed = [].concat(this.state.list).sort((a, b) => a.recovered2 < b.recovered2 ? 1 : -1)
    return highestconfirmed.map((s,i) => {
      return this.state.setloading ? 
      <tr className="truser" key={i}>
          <td data-label="rate">{i+1}</td>
          <td data-label="country">{s.country}</td>
          <td data-label="confirmed">{s.confirmed}</td>
          <td data-label="recovered"><b className="r">({s.recovered2})%</b><br />{s.recovered}</td>
          <td data-label="deaths">{s.deaths}<br />({s.deaths2})%</td>
        </tr>
        : <tr>
        <td colSpan="5"><h1>please wait <span className="s1">&bull;</span>
        <span className="s2">&bull;</span>
        <span className="s3">&bull;</span>
        <span className="s4">&bull;</span></h1></td>
        </tr>
    })
  }

  returncountries3 = () => {
    const {list} = this.state;
    const highestconfirmed = [].concat(this.state.list).sort((a, b) => a.deaths2 < b.deaths2 ? 1 : -1)
    return highestconfirmed.map((s,i) => {
      return this.state.setloading ? 
      <tr className="tradmin" key={i}>
          <td data-label="rate">{i+1}</td>
          <td data-label="country">{s.country}</td>
          <td data-label="confirmed">{s.confirmed}</td>
          <td data-label="recovered">{s.recovered}<br />({s.recovered2})%</td>
          <td data-label="deaths"><b className="d">({s.deaths2})%</b><br />{s.deaths}</td>
        </tr>
        : <tr>
        <td colSpan="5"><h1>please wait <span className="s1">&bull;</span>
        <span className="s2">&bull;</span>
        <span className="s3">&bull;</span>
        <span className="s4">&bull;</span></h1></td>
        </tr>
    })
  }
  render(){
  return(
    <div className="MainSortingStatistics">
      <h1 style={{marginTop:'30px'}}>COVID-19 SORTING Statistics</h1>
      <HashRouter>
      <Button getda = {() => this.getdata()}/><br />
      <Route exact path="/" component={() => <Confirmed returnco={this.returncountries()}/>} />
      <Route exact path="/recovered" component={() => <Recovered returnco2={this.returncountries2()}/>} />
      <Route exact path="/deaths" component={() => <Deaths returnco3={this.returncountries3()}/>} />
      </HashRouter>
    </div>
  )
  }
}

export default MainSortingStatistics;
