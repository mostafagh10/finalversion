import React , {useState , useEffect} from 'react';
import {Link} from 'react-router-dom'
import {GET_ADMIN} from '../../../redux/actions/adminAction'
import {useDispatch} from 'react-redux'
import { useSelector } from 'react-redux'
import axios from 'axios'
import './style.css'
import ShowHeader from '../../adminHeader/index'

const AdminProfile = ({ match }) => {

    //match.params.adviceId => this adviceId which i wrote it in app.js 
    const adminId = match.params.adminId;

    const dispatch = useDispatch();
    const { admin } = useSelector(state => state.admins)

    const [formdata, setformdata] = useState({
    firstName:"",
    email:"",
    lastName:""
      });
      useEffect(() => {
        if(!admin){
        dispatch(GET_ADMIN(adminId))
        }
        else if(admin){
          setformdata({
              ...formdata,
    firstName:admin.firstName,
    email:admin.email,
    lastName:admin.lastName
    })
   }},[dispatch,adminId,admin])
  

  //destructure component state
  const {
    firstName,
    email,
    lastName
  } = formdata;

    return(
        <>
    <ShowHeader />
      <div className="profilebodyadmin">
      <div className="container" style={{textAlign:'center'}}>
          <div className="row">
            <div className="col-md-4 mt-1 padding-0">
              <div className="card text-center sidebarcard2">
                <div className="card-body">
                  <img src="../../../adminicon.jpg" className="rounded-circle" width="150" />
                  <div className="mt-3">
                    <h5>{firstName}</h5>
                    <a href={`/admin/editprofile/${adminId}`}><button className="btn btn-primary"><span className="fas fa-user-edit"></span> &nbsp; update my profile</button></a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-8 mt-1 padding-0">
              <div className="card mb-3 content2">
              <div style={{textAlign:'center'}}>
              <h1 className="m-3 pt-3 pagetitle">my profile</h1>
               <hr className="titlehr" size="20" />
               </div>
                <div className="card-body" style={{textAlign:'left'}}>
                  <div className="row">
                    <div className="col-md-3">
                      <h5>Email</h5>
                    </div>
                    <div className="col-md-9 text-secondary">
                      {email}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                  <div className="col-md-3">
                      <h5>firstName</h5>
                    </div>
                    <div className="col-md-9 text-secondary">
                      {firstName}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                  <div className="col-md-3">
                      <h5>lastName</h5>
                    </div>
                    <div className="col-md-9 text-secondary">
                      {lastName}
                    </div>
                  </div>
                  <hr />
                </div>
              </div>  
            </div>
          </div>
        </div>
        </div>
        </>
    )
}

export default AdminProfile;