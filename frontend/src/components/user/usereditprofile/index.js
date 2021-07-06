import React , {useState , useEffect} from 'react';
import {GET_USER} from '../../../redux/actions/userAction'
import {useDispatch} from 'react-redux'
import { useSelector } from 'react-redux'
import { edituserprocess } from '../../APIs/userapi'
import {useHistory} from 'react-router-dom'
import {failedmessage , successmessage} from '../../helpers/messages'
import ShowUserHeader from '../userheader';

const EditUserprofile = ({ match }) => {

    let history = useHistory();

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
        isInfected:Boolean,
    succesmsg: false,
    failedmsg: false
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
        }
   },[dispatch,userId,user])
  

  //destructure component state
  const {
    firstName,
    email,
    lastName,
    city,
    street,
    age,
    phoneNo,
    isInfected,
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

    const { firstName,
        email,
        lastName,
        city,
        street,
        age,
        phoneNo,
        isInfected} = formdata;
      const data = { firstName,
        email,
        lastName,
        city,
        street,
        age,
        phoneNo,
        isInfected}
      setformdata({
        ...formdata,
        failedmsg:false,
        succesmsg:'validation success'
      })

      edituserprocess(data,userId).then((response) => {
        console.log('axios user success' , response)   
        //history.push(`/admin/profile/${adminId}`)
        setformdata({
            firstName : firstName,
    email : email,
    lastName : lastName,
    city : city,
    street : street,
    age : age,
    phoneNo : phoneNo,
    isInfected : isInfected,
          succesmsg : "success upating your profile",
          failedmsg : false
        })   
    }).catch((err) => {
        console.log(err)
        setformdata({
          ...formdata,
          succesmsg:"",
          failedmsg:"try again"
        })
    })
  }


  const showtheform = () => {
    return(
        <>
        {ShowUserHeader("fas fa-user","co-safe")}
          <div className="profilebodyadmin">
          {failedmsg && failedmessage(failedmsg)}
        {succesmsg && successmessage(succesmsg)}
          <div className="container" style={{textAlign:'center'}}>
              <div className="row">
                <div className="col-md-4 mt-1 padding-0">
                  <div className="card text-center sidebarcard2">
                    <div className="card-body">
                      <img src="../../../clientlogo.png" className="rounded-circle" width="150" />
                      <div className="mt-3">
                        <h5>{firstName}</h5>
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
                   <form onSubmit={handlesubmit}>
                    <div className="card-body" style={{textAlign:'left'}}>
                      <div className="row">
                        <div className="col-md-3">
                          <h5>Email</h5>
                        </div>
                        <div className="col-md-9 text-secondary">
                        <input type="email" class="form-control" placeholder="enter the email" name="email" value={email} onChange={handlechange} />
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                      <div className="col-md-3">
                          <h5>firstName</h5>
                        </div>
                        <div className="col-md-9 text-secondary">
                        <input type="text" class="form-control" placeholder="enter the first name" name="firstName" value={firstName} onChange={handlechange} />
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                      <div className="col-md-3">
                          <h5>lastName</h5>
                        </div>
                        <div className="col-md-9 text-secondary">
                        <input type="text" class="form-control" placeholder="enter the last name" name="lastName" value={lastName} onChange={handlechange} />
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                      <div className="col-md-3">
                          <h5>isInfected</h5>
                        </div>
                        <div className="col-md-9 text-secondary">
                        <input type="text" class="form-control" name="isInfected" value={isInfected} onChange={handlechange} readOnly />
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                      <div className="col-md-3">
                          <h5>city</h5>
                        </div>
                        <div className="col-md-9 text-secondary">
                        <input type="text" class="form-control" placeholder="enter the city" name="city" value={city} onChange={handlechange} />
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                      <div className="col-md-3">
                          <h5>street</h5>
                        </div>
                        <div className="col-md-9 text-secondary">
                        <input type="text" class="form-control" placeholder="enter the street" name="street" value={street} onChange={handlechange} />
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                      <div className="col-md-3">
                          <h5>age</h5>
                        </div>
                        <div className="col-md-9 text-secondary">
                        <input type="number" class="form-control" placeholder="enter the age" name="age" value={age} onChange={handlechange} />
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                      <div className="col-md-3">
                          <h5>phoneNo</h5>
                        </div>
                        <div className="col-md-9 text-secondary">
                        <input type="text" class="form-control" placeholder="enter the phone number" name="phoneNo" value={phoneNo} onChange={handlechange} />
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                          <div className="col-md-12">
                          <button type="submit" class="btn btn-info">Edit profile</button>
                          </div>
                      </div>
                    </div>
                    </form>
                  </div>  
                </div>
              </div>
            </div>
            </div>
            </>
    )
    }

    return(
      <div>
        {showtheform()}
      </div>
    )
}

export default EditUserprofile;