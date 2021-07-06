import React , {useContext} from 'react';
import $ from 'jquery'
import {Link} from 'react-router-dom'

import {  UserContext } from '../../ContextAPI/User'
import logoutUser from '../../ContextAPI/Node API/logout'
import {useHistory} from 'react-router-dom'

const Sidebar = () => {

    const { isUser , userType , userLogout , user } = useContext(UserContext)
    let history = useHistory();
    const x = JSON.stringify(user)
    const y = JSON.parse(x)
    const z = user?.admin?._id

    const handlesubmit = (e) => {
        e.preventDefault();
            console.log(userType);
          logoutUser('admin',user.token).then((response) => {
            if(response.status == 200){
            userLogout()
            history.push('/')  
        } 
        }).catch((err) => {
            console.log(err)
        })
      }

    $('document').ready(function(){
        $('.filter').click(function(){
            $('.filtertable').fadeToggle(400);
        })
    })

    const togglemenu = () => {
        let navigation = document.querySelector('.navigation');
        let toggle = document.querySelector('.toggle');
        navigation.classList.toggle('active');
        toggle.classList.toggle('active');
    }

    return(
    <div>
    <div class="navigation">
    <ul>
        <li>
            <Link to="/admin/add">
                <span class="icon"><i class="fas fa-user-plus" aria-hidden="true"></i></span>
                <span class="title">Add Items</span>
            </Link>
        </li>
        <li>
            {z ? (
            <a href={`/admin/profile/${z}`}>
                <span class="icon"><i class="fas fa-user" aria-hidden="true"></i></span>
                <span class="title">My Profile</span>
            </a>
            ) : (
            <a href={`/admin/profile/${y._id}`}>
                <span class="icon"><i class="fas fa-user" aria-hidden="true"></i></span>
                <span class="title">My Profile</span>
            </a>
            )}
        </li>
        <li>
            <a href="/admin/messenger">
                <span class="icon"><i class="fas fa-comments" aria-hidden="true"></i></span>
                <span class="title">Messenger</span>
            </a>
        </li>
        <li>
            <Link to="/admin/manage/managenews">
                <span class="icon"><i class="fas fa-newspaper" aria-hidden="true"></i></span>
                <span class="title">Manage news</span>
            </Link>
        </li>
        <li>
            <Link to="/admin/manage/manageadvices">
                <span class="icon"><i class="fas fa-comment-medical" aria-hidden="true"></i></span>
                <span class="title">Manage Advices</span>
            </Link>
        </li>
        <li>
            <Link to="/admin/manage/manageadmins">
                <span class="icon"><i class="fas fa-users-cog" aria-hidden="true"></i></span>
                <span class="title">Manage Admins</span>
            </Link>
        </li>
        <li>
            <Link to="/admin/manage/manageusers">
                <span class="icon"><i class="fas fa-users" aria-hidden="true"></i></span>
                <span class="title">Manage Users</span>
            </Link>
        </li>
        <li>
            <Link onClick={handlesubmit}>
            <span class="icon"><span className="fas fa-sign-out-alt" aria-hidden="true"></span></span>
            <span class="title">log out</span>
            </Link>
        </li>
    </ul>
</div>
<div class="toggle" onClick={togglemenu}></div>
</div>
    )
}

export default Sidebar;