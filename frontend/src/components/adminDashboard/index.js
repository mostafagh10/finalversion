import React , {useContext} from 'react'
import ShowHeader from '../adminHeader/index'
import ShowAddActionsBtns from '../adminAddBtns/index'
import ShowAddNewsModel from '../addNewsModel/index'
import ShowAddAdviceModel from '../addAdviceModel/index'
import ShowAddUserModel from '../addUserModel/index'
import ShowAddAdminModel from '../addAdminModel/index'
import {  UserContext } from '../../ContextAPI/User'

const AdminAddingPage = () => {
  const {user} = useContext(UserContext)
    /*          navbar             */
    const x = JSON.stringify(user)
    const y = JSON.parse(x)
    console.log("user = ",user._id)
    console.log("y = ",y._id)
    
    return (
    <div className="AdminAddingPage">
      <ShowHeader />
      <ShowAddActionsBtns />
      <ShowAddNewsModel />
      <ShowAddAdviceModel />
      <ShowAddUserModel />
      <ShowAddAdminModel />
    </div>
  );
}

export default AdminAddingPage;
