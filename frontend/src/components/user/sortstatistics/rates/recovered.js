import React , {Component} from 'react';
import axios from 'axios'


class Recovered extends Component {
  render(){
  return(
    <div className="Recovered">
       <table>
         <thead className="bg-success">
           <th>rate</th>
           <th>country</th>
           <th>confirmed</th>
           <th><b className="r">recovered</b></th>
           <th>deaths</th>
         </thead>
         <tbody>
          {this.props.returnco2}
         </tbody>
       </table>
    </div>
  )
  }
}

export default Recovered;
