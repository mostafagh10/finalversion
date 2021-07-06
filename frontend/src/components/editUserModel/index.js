import React , {useState , useEffect} from 'react'
import ShowHeader from '../adminHeader/index'
import {GET_USER} from '../../redux/actions/userAction'
import {useDispatch} from 'react-redux'
import { useSelector } from 'react-redux'
import {storage} from '../firebaseload/index'
import { edituserprocess } from '../APIs/userapi'
import {useHistory} from 'react-router-dom'


const EditUser = ({ match }) => {
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
        oppositeofstatus:Boolean
      });
      useEffect(() => {
        if(!user){
        dispatch(GET_USER(userId))
        }
        else if(user){
          setformdata({
              ...formdata,
              firstName : user.firstName,
              lastName:user.lastName,
              email:user.email,
              city:user.city,
              street:user.street,
              age:user.age,
              phoneNo:user.phoneNo,
              isInfected:user.isInfected,
              oppositeofstatus:!user.isInfected
          })
        }
   },[dispatch,userId,user])

  //destructure component state
  const {
    firstName,
    lastName,
    email,
    city,
    street,
    age,
    phoneNo,
    isInfected,
    oppositeofstatus
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

    const {firstName , lastName , email , city , street,age,phoneNo,isInfected} = formdata;
      const data = {firstName , lastName , email , city , street,age,phoneNo,isInfected}
      setformdata({
        ...formdata
      })

      edituserprocess(data,userId).then((response) => {
        console.log('axios user success' , response)   
        history.push('/admin/manage/manageusers')
    }).catch((err) => {
        console.log(err)
    })
  }

    const Showtheform = () => (
        <div className="container my-3">
        <div className="row">
        <div className="col-md-8 mx-auto">
            <a href="/admin/manage/manageusers">
                <span className="fas fa-arrow-left">GO BACK</span>
            </a>
        </div>
        <br />
        <div className="col-md-8 mx-auto">
        <div className="modal-content">
          <div className="modal-header bg-success text-white">
            <h5 className="modal-title">Edit User</h5>
          </div>
          <form onSubmit={handlesubmit}>
          <div className="modal-body my-2">
            
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
                        <label className="text-secondary">Is Infected</label>
                        <select className="form-control" name="isInfected" value={isInfected} onChange={handlechange}>
                            <option>{isInfected.toString()}</option>
                            <option>{oppositeofstatus.toString()}</option>
                        </select>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                            <label className="text-secondary">City</label>
                            <input type="text" className="form-control" name="city" value={city} onChange={handlechange} />
                            </div>
                            <div className="form-group col-md-6">
                            <label className="text-secondary">Street</label>
                            <input type="text" className="form-control" name="street" value={street} onChange={handlechange} />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                            <label className="text-secondary">Age</label>
                            <input type="number" className="form-control" name="age" value={age} onChange={handlechange} />
                            </div>
                            <div className="form-group col-md-6">
                            <label className="text-secondary">Phone number</label>
                            <input type="text" className="form-control" name="phoneNo" value={phoneNo} onChange={handlechange} />
                            </div>
                        </div>
          </div>
          <div className="modal-footer">
            <button type="submit" className="btn btn-success text-white">Save</button>
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

export default EditUser;