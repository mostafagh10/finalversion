import React , {useState , useEffect} from 'react';
import {GET_ADMIN} from '../../../redux/actions/adminAction'
import {useDispatch} from 'react-redux'
import { useSelector } from 'react-redux'
import { editadminprocess } from '../../APIs/adminapi'
import {useHistory} from 'react-router-dom'
import {failedmessage , successmessage} from '../../helpers/messages'
import ShowHeader from '../../adminHeader/index'

const EditAdminprofile = ({ match }) => {

    let history = useHistory();

    //match.params.adviceId => this adviceId which i wrote it in app.js 
    const adminId = match.params.adminId;

    const dispatch = useDispatch();
    const { admin } = useSelector(state => state.admins)

    const [formdata, setformdata] = useState({
        firstName:"",
        email:"",
        lastName:"",
    succesmsg: false,
    failedmsg: false
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
        }
   },[dispatch,adminId,admin])
  

  //destructure component state
  const {
    firstName,
    email,
    lastName,
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
        lastName} = formdata;
      const data = { firstName,
        email,
        lastName}
      setformdata({
        ...formdata,
        failedmsg:false,
        succesmsg:'validation success'
      })

      editadminprocess(data,adminId).then((response) => {
        console.log('axios admin success' , response)   
        //history.push(`/admin/profile/${adminId}`)
        setformdata({
            firstName : firstName,
            email : email,
            lastName : lastName,
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
        <ShowHeader />
          <div className="profilebodyadmin">
          {failedmsg && failedmessage(failedmsg)}
        {succesmsg && successmessage(succesmsg)}
          <div className="container" style={{textAlign:'center'}}>
              <div className="row">
                <div className="col-md-4 mt-1 padding-0">
                  <div className="card text-center sidebarcard2">
                    <div className="card-body">
                      <img src="../../../adminicon.jpg" className="rounded-circle" width="150" />
                      <div className="mt-3">
                        <h5>{firstName}</h5>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-8 mt-1 padding-0">
                  <div className="card mb-3 content2">
                  <div style={{textAlign:'center'}}>
                  <h1 className="m-3 pt-3 pagetitle">edit my profile</h1>
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

export default EditAdminprofile;