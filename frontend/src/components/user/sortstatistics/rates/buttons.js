import React , {Component} from 'react';
import {Link} from 'react-router-dom'

class Button extends Component {
    render(){
        return(
            <div style={{marginTop:'20px'}}>
                <Link to="/"><button className="btn btn-warning statisticbutton">CONFIRMED</button></Link><p className="buttonspace">&nbsp;</p>
                <Link to="/recovered"><button className="btn btn-success statisticbutton">RECOVERED</button></Link><p className="buttonspace">&nbsp;</p>
                <Link to="/deaths"><button className="btn btn-danger statisticbutton">DEATHS</button></Link>
            </div>
        )
    }
}
export default Button;