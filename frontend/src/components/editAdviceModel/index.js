import React , {useState , useEffect} from 'react'
import ShowHeader from '../adminHeader/index'
import {GET_ADVICE} from '../../redux/actions/categoryAction'
import {useDispatch} from 'react-redux'
import { useSelector } from 'react-redux'
import {storage} from '../firebaseload/index'
import axios from 'axios'
import { editadviceprocess } from '../APIs/adviceapi'
import {useHistory} from 'react-router-dom'


const EditAdvice = ({ match }) => {
  let history = useHistory();

    //match.params.adviceId => this adviceId which i wrote it in app.js 
    const adviceId = match.params.adviceId;

    const dispatch = useDispatch();
    const { advice } = useSelector(state => state.advices)

    const [formdata, setformdata] = useState({
        title:"",
        body:"",
        imagefile:null,
        image:''
      });
      useEffect(() => {
        if(!advice){
        dispatch(GET_ADVICE(adviceId))
        }
        else if(advice){
          setformdata({
              ...formdata,
              title : advice.title,
              body:advice.body,
              image:advice.image
          })
        }
   },[dispatch,adviceId,advice])
  

  //destructure component state
  const {
    title,
    body,
    imagefile,
    image,
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

    const {title , body , image} = formdata;
      const data = {title , body , image}
      setformdata({
        ...formdata
      })

      editadviceprocess(data,adviceId).then((response) => {
        console.log('axios advice success' , response)   
        history.push('/admin/manage/manageadvices')
    }).catch((err) => {
        console.log(err)
    })
  }

    const Showtheform = () => (
        <div className="container my-3">
        <div className="row">
        <div className="col-md-8 mx-auto">
            <a href="/admin/manage/manageadvices">
                <span className="fas fa-arrow-left">GO BACK</span>
            </a>
        </div>
        <br />
        <div className="col-md-8 mx-auto">
        <div className="modal-content">
          <div className="modal-header bg-warning text-white">
            <h5 className="modal-title">Edit Advice</h5>
          </div>
          <form onSubmit={handlesubmit}>
          <div className="modal-body my-2">
            
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
                <textarea className="form-control" rows="3" name="body" value={body} onChange={handlechange} ></textarea>
              </div>
              
          </div>
          <div className="modal-footer">
            <button type="submit" className="btn btn-warning text-white">Save</button>
          </div>
          </form>
        </div>
        </div>
      </div>
    </div>
    )

    return(
    <div>
        {ShowHeader()}
        {Showtheform()}
    </div>
    )
}

export default EditAdvice;