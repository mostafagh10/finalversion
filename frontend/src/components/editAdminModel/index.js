import React , {useState , useEffect} from 'react'
import ShowHeader from '../adminHeader/index'
import {GET_ADMIN} from '../../redux/actions/adminAction'
import {useDispatch} from 'react-redux'
import { useSelector } from 'react-redux'
import {storage} from '../firebaseload/index'
import axios from 'axios'
import { editadminprocess } from '../APIs/adminapi'
import {useHistory} from 'react-router-dom'


const EditAdmin = ({ match }) => {
  let history = useHistory();

    //match.params.adviceId => this adviceId which i wrote it in app.js 
    const adminId = match.params.adminId;

    const dispatch = useDispatch();
    const { admin } = useSelector(state => state.admins)

    const [formdata, setformdata] = useState({
        firstName:'',
        lastName:'',
        email:''
      });
      useEffect(() => {
        if(!admin){
        dispatch(GET_ADMIN(adminId))
        }
        else if(admin){
          setformdata({
              ...formdata,
              firstName : admin.firstName,
              lastName:admin.lastName,
              email:admin.email
          })
        }
   },[dispatch,adminId,admin])
  

  //destructure component state
  const {
    firstName,
    lastName,
    email
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

    const {firstName,lastName,email} = formdata;
      const data = {firstName,lastName,email}
      setformdata({
        ...formdata
      })

      editadminprocess(data,adminId).then((response) => {
        console.log('axios admin success' , response)   
        history.push('/admin/manage/manageadmins')
    }).catch((err) => {
        console.log(err)
    })
  }

    const Showtheform = () => (
        <div className="container my-3">
        <div className="row">
        <div className="col-md-8 mx-auto">
            <a href="/admin/manage/manageadmins">
                <span className="fas fa-arrow-left">GO BACK</span>
            </a>
        </div>
        <br />
        <div className="col-md-8 mx-auto">
        <div className="modal-content">
          <div className="modal-header bg-danger text-white">
            <h5 className="modal-title">Edit Admin</h5>
          </div>
          <form onSubmit={handlesubmit}>
          <div className="modal-body my-2">
            
              <div className="form-group">
                <label className="text-secondary">First Name</label>
                <input type="text" className="form-control" name="firstName" value={firstName} onChange={handlechange} />
              </div>
              <div className="form-group">
                <label className="text-secondary">Last Name</label>
                <textarea className="form-control" rows="3" name="lastName" value={lastName} onChange={handlechange} ></textarea>
              </div>
              <div className="form-group">
                <label className="text-secondary">Email</label>
                <textarea className="form-control" rows="3" name="email" value={email} onChange={handlechange} ></textarea>
              </div>
              
          </div>
          <div className="modal-footer">
            <button type="submit" className="btn btn-danger text-white">Save</button>
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

export default EditAdmin;