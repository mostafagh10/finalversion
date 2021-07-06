import React , {useState} from 'react'
import { failedmessage, successmessage } from "../../helpers/messages";
import {signupprocess} from '../../APIs/userapi'
import isEmpty from 'validator/lib/isEmpty'
import isEmail from 'validator/lib/isEmail'
import { useHistory } from 'react-router';
import './style.css'

const Signup = () => {

    const history = useHistory();

    //setup component state
  const [formdata, setformdata] = useState({
    firstName:"",
    lastName:"",
    email:"",
    password:"",
    city:"",
    street:"",
    age:"",
    phoneNo:"",
    succesmsg: false,
    failedmsg: false
    });

     //destructure component state
  const {
    firstName,
    lastName,
    email,
    password,
    city,
    street,
    age,
    phoneNo,
    succesmsg,
    failedmsg
  } = formdata;

  //event handlers

  const handlechange = (e) => {
    setformdata({
      ...formdata,
      [e.target.name] : e.target.value
    })
  }

  const handlesubmit = (e) => {
    e.preventDefault();

    if(isEmpty(firstName) || isEmpty(lastName) || isEmpty(email) || isEmpty(password) || isEmpty(city) || isEmpty(street) || isEmpty(age) || isEmpty(phoneNo)){
      setformdata({
        ...formdata,
        failedmsg:'all fields are required'
      })
    }else if(!isEmail(email)){
      setformdata({
        ...formdata,
        failedmsg:'the email format is not correct'
      })
    }
    else{
    const {firstName,lastName,email,password,city,street,age,phoneNo} = formdata;
      const data =  {firstName,lastName,email,password,city,street,age,phoneNo}
      setformdata({
        ...formdata,
        failedmsg:false,
        succesmsg:'validation success'
      })

      signupprocess(data).then((response) => {
        console.log('axios user success' , response)
        setformdata({
          firstName : '',
          lastName : '',
          email:'',
          password:'',
          city:'',
          street:'',
          age:'',
          phoneNo:'',
          succesmsg : "success adding admin",
          failedmsg : false
        })    
        history.push('/login/client')
    }).catch((err) => {
        console.log(err)
        setformdata({
          ...formdata,
          succesmsg:"",
          failedmsg:err.response.data.error
        })
    })
  }
  }

    const showTheForm = () => (
    <div className="signupbody">
        {failedmsg && failedmessage(failedmsg)}
        {succesmsg && successmessage(succesmsg)}
        <p>.</p>
        <div className="container">
            <div className="signupdiv" data-aos="flip-right">
                <div className="row">
                    <div className="col-lg-7 col-md-12 signupinputs">
                        <h2 className="pagetitle2">sign up</h2><br />
                        <form onSubmit={handlesubmit}>
                        <div className="form-row signuprow">
                        <div className="form-group col-md-6">
                        <input type="text" placeholder="enter the firstname" className="form-control" name="firstName" value={firstName} onChange={handlechange} />
                        </div>
                        <div className="form-group col-md-6">
                        <input type="text" placeholder="enter the lastname" className="form-control" name="lastName" value={lastName} onChange={handlechange} />
                        </div>
                        </div>

                        <div className="form-row signuprow">
                        <div className="form-group col-md-6">
                        <input type="email" placeholder="enter the email" className="form-control" name="email" value={email} onChange={handlechange} />
                        </div>
                        <div className="form-group col-md-6">
                        <input type="password" placeholder="enter the password" className="form-control" name="password" value={password} onChange={handlechange} />
                        </div>
                        </div>

                        <div className="form-row signuprow">
                        <div className="form-group col-md-6">
                        <input type="text" placeholder="enter the city" className="form-control" name="city" value={city} onChange={handlechange} />
                        </div>
                        <div className="form-group col-md-6">
                        <input type="text" placeholder="enter the street" className="form-control" name="street" value={street} onChange={handlechange} />
                        </div>
                        </div>

                        <div className="form-row signuprow">
                        <div className="form-group col-md-6">
                        <input type="number" placeholder="enter the age" className="form-control" name="age" value={age} onChange={handlechange} />
                        </div>
                        <div className="form-group col-md-6">
                        <input type="text" placeholder="enter the phone number" className="form-control" name="phoneNo" value={phoneNo} onChange={handlechange} />
                        </div>
                        </div>
                        <button type="submit" className="btn btn-primary text-white" style={{padding:'12px',fontSize:'20px'}}>sign up</button>
                        </form>
                    </div>
                    <div className="d-none d-sm-none d-md-none d-lg-block col-lg-5 signupimage" >
                    <img
                src="../../../167591270_117224893677138_4471627755125957513_n.png"
                width="260"
                height="150"
                style={{marginTop: '120px'}}
                alt="Logo"
              />
              <h1 style={{color:"white",fontFamily:'serif',fontWeight:'bold',letterSpacing:'10px'}}>CO-SAFE</h1>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )

    return <div>{showTheForm()}</div>;
}

export default Signup;