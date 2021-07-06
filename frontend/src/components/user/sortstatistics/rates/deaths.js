import React , {Component} from 'react';
import axios from 'axios'


class Deaths extends Component {
  render(){
  return(
    <div className="Deaths">
       <table>
         <thead className="bg-danger">
           <th>rate</th>
           <th>country</th>
           <th>confirmed</th>
           <th>recovered</th>
           <th><b className="d">deaths</b></th>
         </thead>
         <tbody>
          {this.props.returnco3}
          </tbody>
       </table>
    </div>
  )
  }
}

export default Deaths;
