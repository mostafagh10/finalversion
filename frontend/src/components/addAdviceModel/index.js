import React, { useState } from "react";
import { failedmessage, successmessage } from "../helpers/messages";
import {addadviceprocess} from '../APIs/adviceapi'
import {storage} from '../firebaseload/index'
import isEmpty from 'validator/lib/isEmpty'

const ShowAddAdviceModel = () => {
  //setup component state
  const [formdata, setformdata] = useState({
    title:"",
    body:"",
    imagefile:null,
    image:'',
    succesmsg: false,
    failedmsg: false
  });
  //destructure component state
  const {
    title,
    body,
    imagefile,
    image,
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

  const handlechange2 = (e) => {
    if(e.target.files[0]){
      const imagefile = e.target.files[0];
      setformdata({
        ...formdata,
        imagefile:imagefile
      })
    }
  }


  const handleupload = (e) => {
    e.preventDefault();
    const imagefile = formdata.imagefile;
    const uploadtask = storage.ref(`images/${imagefile.name}`).put(imagefile)
    uploadtask.on('state_changed',
    (snapshot) => {

    }, 
    (error) => {
      console.log(error)
    } , 
    () => {
      storage.ref('images').child(imagefile.name).getDownloadURL().then(url => {
        console.log(url);
        setformdata({
          ...formdata,
          image : url
        })
      })
    })
  }
  
  const handlesubmit = (e) => {
    e.preventDefault();

    if(isEmpty(title) || isEmpty(body) || isEmpty(image)){
      setformdata({
        ...formdata,
        failedmsg:'all fields are required'
      })
    }
    else{

    const {title , body , image} = formdata;
      const data = {title , body , image}
      setformdata({
        ...formdata,
        failedmsg:false,
        succesmsg:'validation success'
      })

      addadviceprocess(data).then((response) => {
        console.log('axios advice success' , response)
        setformdata({
          title : '',
          body : '',
          imagefile:null,
          image:'',
          succesmsg : "success adding advice",
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
    <div id="AddAdviceModel" className="modal">
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header bg-warning text-white">
            <h5 className="modal-title">Add Advice</h5>
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
            
              <div className="custom-file mb-2">
              <input type="file" className="custom-file-input" onChange={handlechange2} />
              <label className="custom-file-label">choose image</label>
              </div>
              <div className="form-row">
                            <div className="form-group col-md-6">
                            <button className="btn btn-warning text-white" onClick={handleupload}>Upload The image</button>
                            </div>
                            {image && 
                            <div className="form-group col-md-6">
                            <img src={image} height="200" width="200" />
                            </div>
                            }
              </div>
              <div className="form-group">
                <label className="text-secondary">Title</label>
                <input type="text" className="form-control" name="title" value={title} onChange={handlechange} />
              </div>
              <div className="form-group">
                <label className="text-secondary">Body</label>
                <textarea className="form-control" rows="3" name="body" value={body} onChange={handlechange}></textarea>
              </div>
              
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" data-dismiss="modal">
              Close
            </button>
            <button type="submit" className="btn btn-warning text-white">Save</button>
          </div>
          </form>
        </div>
      </div>
    </div>
  );

  return(
   <div>
       {showTheForm()}
    </div>
  )
};

export default ShowAddAdviceModel;
