import React, { useState } from "react";
import { failedmessage, successmessage } from "../helpers/messages";
import {addadminprocess} from '../APIs/adminapi'
import isEmpty from 'validator/lib/isEmpty'
import isEmail from 'validator/lib/isEmail'

const ShowAddAdminModel = () => {

  //setup component state
  const [formdata, setformdata] = useState({
    firstName:"",
    lastName:"",
    email:"",
    password:"",
    succesmsg: false,
    failedmsg: false
    });

    //destructure component state
  const {
    firstName,
    lastName,
    email,
    password,
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

    if(isEmpty(firstName) || isEmpty(lastName) || isEmpty(email) || isEmpty(password)){
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
    const {firstName,lastName,email,password} = formdata;
      const data = {firstName,lastName,email,password}
      setformdata({
        ...formdata,
        failedmsg:false,
        succesmsg:'validation success'
      })

      addadminprocess(data).then((response) => {
        console.log('axios admin success' , response)
        setformdata({
          firstName : '',
          lastName : '',
          email:'',
          password:'',
          succesmsg : "success adding admin",
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
    <div id="AddAdminModel" className="modal">
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header bg-danger text-white">
            <h5 className="modal-title">Add Admin</h5>
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
            
          </div>
          <div className="modal-footer">
            <button className="btn btn-dismiss" data-dismiss="modal">
              Close
            </button>
            <button type="submit" className="btn btn-danger text-white">Save</button>
          </div>
          </form>
        </div>
      </div>
    </div>
  );

  return <div>{showTheForm()}</div>;
};

export default ShowAddAdminModel;
