import React, { useState , useEffect } from "react";
import adminManageHeader from '../adminDashboard2/index'
import {useDispatch} from 'react-redux'
import {GET_ALLUSERS,DELETE_USER} from '../../redux/actions/userAction'
import ShowAddUserModel from '../addUserModel'
import { getusersprocess } from '../APIs/userapi'
import { useSelector } from 'react-redux'
import {Link} from 'react-router-dom'

const ShowManageUserModel = () => {

  const dispatch = useDispatch();

  /*
  useEffect(() => {
    dispatch(GET_ALLUSERS())
  },[dispatch])

  const { users } = useSelector(state => state.users)
  */

  const [users , setusers] = useState(null)

  const loadusers = async () => {
      await getusersprocess().then((response) => {
          setusers(response.data)
      }).catch((err) => {
          console.log(err)
      });
  }
  useEffect(() => {
      loadusers();
  },[])

  const filterContent = (users , searchterm) => {
    const result = users.filter((users) => users.email.includes(searchterm))
    setusers(result)
  }
  const handletextsearch = async e => {
    const searchterm = e.currentTarget.value
    await getusersprocess().then((response) => {
      filterContent(response.data , searchterm)
  }).catch((err) => {
      console.log(err)
  });

  }

  const showTheItems = () => (
    <div>
    <div>
    <input className="form-control filteradmin" style={{float:'left'}} placeholder="Filter The Users" onChange={handletextsearch} />
    <button className="btn btn-success" data-toggle="modal" data-target="#AddUserModel" style={{float:'right'}}><i className="fas fa-plus"></i> add user</button>
    </div><br /><br />
    <table>
        <thead>
            <th>first name</th>
            <th>last name</th>
            <th>email</th>
            <th>is-infected</th>
            <th>city</th>
            <th>street</th>
            <th>age</th>
            <th>phone number</th>
            <th>Delete</th>
            <th>Update</th>
        </thead>
        <tbody>
        {users && users.map(user => (
              <tr className="truser" key={user._id}>
              <td data-label="first name">{user.firstName}</td>
              <td data-label="last name">{user.lastName}</td>
              <td data-label="email">{user.email}</td>
              <td data-label="is-infected">{user.isInfected.toString()}</td>
              <td data-label="city">{user.city}</td>
              <td data-label="street">{user.street}</td>
              <td data-label="age">{user.age}</td>
              <td data-label="phone number">{user.phoneNo}</td>
              <td data-label="Delete">
              <form>
                <button className="btn btn-success text-white" onClick={() => dispatch(DELETE_USER(user._id))}><i className="fas fa-trash-alt"></i></button>  
              </form>          
              </td>
              <td data-label="Update">
                <a href={`/admin/manage/edituser/${user._id}`}>
                <button className="btn btn-success text-white" ><i className="fas fa-edit"></i></button> 
                </a> 
              </td>
              </tr>
           ))}
        </tbody> 
        </table>
        </div>
  );

  return(
   <div>
     {adminManageHeader()}
     <div className="container">
       {showTheItems()}
       </div>
      <ShowAddUserModel />
    </div>
  )
};

export default ShowManageUserModel;
