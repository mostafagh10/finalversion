import React, { useState , useEffect } from "react";
import adminManageHeader from '../adminDashboard2/index'
import {useDispatch} from 'react-redux'
import {GET_ALLADMINS,DELETE_ADMIN} from '../../redux/actions/adminAction'
import ShowAddAdminModel from '../addAdminModel/index'
import {getadminsprocess} from '../APIs/adminapi'
import { useSelector } from 'react-redux'
import {Link} from 'react-router-dom'

const ShowManageAdminModel = () => {

  const dispatch = useDispatch();

  /*
  useEffect(() => {
    dispatch(GET_ALLADMINS())
  },[dispatch])

  const { admins } = useSelector(state => state.admins)
  */
  const [admins , setadmins] = useState(null)

  const loadadmins = async () => {
      await getadminsprocess().then((response) => {
          setadmins(response.data)
      }).catch((err) => {
          console.log(err)
      });
  }
  useEffect(() => {
      loadadmins();
  },[])

  const filterContent = (admins , searchterm) => {
    const result = admins.filter((admin) => admin.email.includes(searchterm))
    setadmins(result)
  }
  const handletextsearch = async e => {
    const searchterm = e.currentTarget.value
    await getadminsprocess().then((response) => {
      filterContent(response.data , searchterm)
  }).catch((err) => {
      console.log(err)
  });

  }

  const showTheItems = () => (
    <div>
    <div>
    <input className="form-control filteradmin" style={{float:'left'}} placeholder="Filter The Admins" onChange={handletextsearch} />
    <button className="btn btn-danger" data-toggle="modal" data-target="#AddAdminModel" style={{float:'right'}}><i className="fas fa-plus"></i> add admin</button>
    </div><br /><br />
    <table>
        <thead>
            <th>first name</th>
            <th>last name</th>
            <th>email</th>
            <th>Delete</th>
            <th>Update</th>
        </thead>
        <tbody>
        {admins && admins.map(admin => (
              <tr className="tradmin" key={admin._id}>
              <td data-label="first name">{admin.firstName}</td>
              <td data-label="last name">{admin.lastName}</td>
              <td data-label="email">{admin.email}</td>
              <td data-label="Delete">
              <form>
                <button className="btn btn-danger text-white" onClick={() => dispatch(DELETE_ADMIN(admin._id))}><i className="fas fa-trash-alt"></i></button>    
              </form>        
              </td>
              <td data-label="Update">
                <a onClick={() => {window.location.href=`/admin/manage/editadmin/${admin._id}`}}>
                <button className="btn btn-danger text-white" ><i className="fas fa-edit"></i></button> 
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
       <ShowAddAdminModel />
    </div>
  )
};

export default ShowManageAdminModel;
