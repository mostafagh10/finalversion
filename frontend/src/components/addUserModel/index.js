import React , {useState} from 'react'
import { failedmessage, successmessage } from "../helpers/messages";
import {addinfecteduserprocess} from '../APIs/userapi'
import isEmpty from 'validator/lib/isEmpty'
import isEmail from 'validator/lib/isEmail'

const ShowAddUserModel = () => {

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

      addinfecteduserprocess(data).then((response) => {
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
          succesmsg : "success adding user",
          failedmsg : false
        })     
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
    <div id="AddUserModel" className="modal">
        <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
                <div className="modal-header bg-success text-white">
                    <h5 className="modal-title">Add User</h5>
                    <button className="close" data-dismiss="modal">
                        <span>
                            <i className="fas fa-times"></i>
                        </span>
                    </button>
                </div>
                <form onSubmit={handlesubmit}>
                <div className="modal-body my-2">
                {failedmsg && failedmessage(failedmsg)}
                {succesmsg && successmessage(succesmsg)}
                        <div className="form-row">
                            <div className="form-group col-md-6">
                            <label className="text-secondary">First Name</label>
                            <input type="text" className="form-control" name="firstName" value={firstName} onChange={handlechange} />
                            </div>
                            <div className="form-group col-md-6">
                            <label className="text-secondary">Last Name</label>
                            <input type="text" className="form-control" name="lastName" value={lastName} onChange={handlechange} />
                            </div>
                        </div>
                        <div className="form-group">
                        <label className="text-secondary">Email</label>
                        <input type="email" className="form-control" name="email" value={email} onChange={handlechange} />
                        </div>
                        <div className="form-group">
                        <label className="text-secondary">Password</label>
                        <input type="password" className="form-control" name="password" value={password} onChange={handlechange} />
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                            <label className="text-secondary">City</label>
                            <input type="text" className="form-control" name="city" value={city} onChange={handlechange} />
                            </div>
                            <div className="form-group col-md-6">
                            <label className="text-secondary">Street</label>
                            <input type="text" className="form-control" name="street" value={street} onChange={handlechange} />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                            <label className="text-secondary">Age</label>
                            <input type="number" className="form-control" name="age" value={age} onChange={handlechange} />
                            </div>
                            <div className="form-group col-md-6">
                            <label className="text-secondary">Phone number</label>
                            <input type="text" className="form-control" name="phoneNo" value={phoneNo} onChange={handlechange} />
                            </div>
                        </div>
                </div>
                <div className="modal-footer">
                    <button className="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="submit" className="btn btn-success text-white">Save</button>
                </div>
                </form>
            </div>
        </div>
    </div>
    )

    return <div>{showTheForm()}</div>;
}

export default ShowAddUserModel;