import React, { useState } from "react";
import {addnotificationprocess} from '../../APIs/adminapi'
import isEmpty from 'validator/lib/isEmpty'
import isEmail from 'validator/lib/isEmail'

const Addnotificationprocess = () => {

  //setup component state
  const [formdata, setformdata] = useState({
    title:"",
    message:"",
    userId:"",
    date:""
    });

    //destructure component state
  const {
    title,
    message,
    userId,
    date
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
    const {title,message,userId,date} = formdata;
      const data = {title,message,userId,date}

      addnotificationprocess(data).then((response) => {
        console.log('axios notification success' , response)
        setformdata({
          title : '',
          message : '',
          userId:'',
          date:''
        })    
        console.log("successed adding notification") 
    }).catch((err) => {
        console.log(err)
    })
  }


  const showTheForm = () => (
    <div>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header bg-danger text-white">
            <h5 className="modal-title">Add notification</h5>
            <button className="close" data-dismiss="modal">
              <span>
                <i className="fas fa-times"></i>
              </span>
            </button>
          </div>
          <form onSubmit={handlesubmit}>
          <div className="modal-body my-2">
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label className="text-secondary">title</label>
                  <input type="text" className="form-control" name="title" value={title} onChange={handlechange} />
                </div>
                <div className="form-group col-md-6">
                  <label className="text-secondary">message</label>
                  <input type="text" className="form-control" name="message" value={message} onChange={handlechange} />
                </div>
              </div>
              <div className="form-group">
                <label className="text-secondary">userId</label>
                <input type="text" className="form-control" name="userId" value={userId} onChange={handlechange} />
              </div>
              <div className="form-group">
                <label className="text-secondary">date</label>
                <input type="date" className="form-control" name="date" value={date} onChange={handlechange} />
              </div>
            
          </div>
          <div className="modal-footer">
            <button type="submit" className="btn btn-danger text-white">Save</button>
          </div>
          </form>
        </div>
      </div>
    </div>
  );

  return <div>{showTheForm()}</div>;
};

export default Addnotificationprocess;
