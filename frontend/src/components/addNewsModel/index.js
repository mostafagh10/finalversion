import React , {useState} from 'react';
import { failedmessage, successmessage } from "../helpers/messages";
import {addnewsprocess} from '../APIs/newsapi'
import {storage} from '../firebaseload/index'
import isEmpty from 'validator/lib/isEmpty'

const ShowAddNewsModel = () => {
    //setup component state
    const [formdata, setformdata] = useState({
    title:"",
    body:"",
    imagefile:null,
    image:'',
    date:'',
    URL:'',
    succesmsg: false,
    failedmsg: false
});

  //destructure component state
  const {
    title,
    body,
    imagefile,
    image,
    date,
    URL,
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

    if(isEmpty(title) || isEmpty(body) || isEmpty(image) || isEmpty(date) || isEmpty(URL)){
      setformdata({
        ...formdata,
        failedmsg:'all fields are required'
      })
    }
    else{
    const {title , body , image , date, URL} = formdata;
      const data = {title , body , image , date, URL}
      setformdata({
        ...formdata,
        failedmsg:false,
        succesmsg:'validation success'
      })

      addnewsprocess(data).then((response) => {
        console.log('axios news success' , response)
        setformdata({
          title : '',
          body : '',
          imagefile:null,
          image:'',
          date:'',
          URL:'',
          succesmsg : "success adding news",
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
    <div id="AddNewsModel" className="modal">
        <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
                <div className="modal-header bg-info text-white">
                    <h5 className="modal-title">Add News</h5>
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
                <button className="btn btn-info text-white" onClick={handleupload}>Upload The image</button>
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
                        <div className="form-row">
                            <div className="form-group col-md-6">
                            <label className="text-secondary">Date</label>
                            <input type="date" className="form-control" name="date" value={date} onChange={handlechange} />
                            </div>
                            <div className="form-group col-md-6">
                            <label className="text-secondary">URL</label>
                            <input type="text" className="form-control" name="URL" value={URL} onChange={handlechange} />
                            </div>
                        </div>
                </div>
                <div className="modal-footer">
                    <button className="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="submit" className="btn btn-info">Save</button>
                </div>
                </form>
            </div>
        </div>
    </div>
    )

    return(
        <div>
            {showTheForm()}
         </div>
       )
}

export default ShowAddNewsModel;