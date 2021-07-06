import React , {useState , useEffect} from 'react';
import {Link} from 'react-router-dom'
import {GET_USER} from '../../../redux/actions/userAction'
import {useDispatch} from 'react-redux'
import { useSelector } from 'react-redux'
import axios from 'axios'
import './style.css'
import ShowUserHeader from '../userheader';

const UserProfile = ({ match }) => {

    //match.params.adviceId => this adviceId which i wrote it in app.js 
    const userId = match.params.userId;

    const dispatch = useDispatch();
    const { user } = useSelector(state => state.users)

    const [formdata, setformdata] = useState({
        firstName:'',
        lastName:'',
        email:'',
        city:'',
        street:'',
        age:null,
        phoneNo:'',
        isInfected:Boolean
      });
      useEffect(() => {
        if(!user){
        dispatch(GET_USER(userId))
        }
        else if(user){
          setformdata({
              ...formdata,
    firstName:user.firstName,
    email:user.email,
    lastName:user.lastName,
    city:user.city,
    street:user.street,
    age:user.age,
    phoneNo:user.phoneNo,
    isInfected:user.isInfected
    })
   }},[dispatch,userId,user])
  

  //destructure component state
  const {
    firstName,
    email,
    lastName,
    city,
    street,
    age,
    phoneNo,
    isInfected
  } = formdata;

    return(
        <>
    {ShowUserHeader("fas fa-user","co-safe")}
      <div className="profilebodyadmin">
      <div className="container" style={{textAlign:'center'}}>
          <div className="row">
            <div className="col-md-4 mt-1 padding-0">
              <div className="card text-center sidebarcard2">
                <div className="card-body">
                  <img src="../../../clientlogo.png" className="rounded-circle" width="150" />
                  <div className="mt-3">
                    <h5>{firstName}</h5>
                    <a href={`/user/editprofile/${userId}`}><button className="btn btn-primary"><span className="fas fa-user-edit"></span> &nbsp; update my profile</button></a>
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
                  <div className="row">
                  <div className="col-md-3">
                      <h5>isInfected</h5>
                    </div>
                    <div className="col-md-9 text-secondary">
                      {isInfected.toString()}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                  <div className="col-md-3">
                      <h5>city</h5>
                    </div>
                    <div className="col-md-9 text-secondary">
                      {city}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                  <div className="col-md-3">
                      <h5>street</h5>
                    </div>
                    <div className="col-md-9 text-secondary">
                      {street}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                  <div className="col-md-3">
                      <h5>age</h5>
                    </div>
                    <div className="col-md-9 text-secondary">
                      {age}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                  <div className="col-md-3">
                      <h5>phoneNo</h5>
                    </div>
                    <div className="col-md-9 text-secondary">
                      {phoneNo}
                    </div>
                  </div>
                </div>
              </div>  
            </div>
          </div>
        </div>
        </div>
        </>
    )
}

export default UserProfile;