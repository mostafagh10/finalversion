import React , {Component} from 'react';
import axios from 'axios'


class Confirmed extends Component {
  render(){
  return(
    <div className="Confirmed">
       <table>
         <thead className="bg-warning">
           <th>rate</th>
           <th>country</th>
           <th><b className="c">confirmed</b></th>
           <th>recovered</th>
           <th>deaths</th>
         </thead>
         <tbody>
          {this.props.returnco}
          </tbody>
       </table>
    </div>
  )
  }
}

export default Confirmed;
