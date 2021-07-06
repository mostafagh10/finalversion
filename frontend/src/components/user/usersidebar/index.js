import React , {useContext} from 'react';
import $ from 'jquery'
import {Link} from 'react-router-dom'

import {  UserContext } from '../../../ContextAPI/User'
import logoutUser from '../../../ContextAPI/Node API/logout'
import {useHistory} from 'react-router-dom'
import './style.css'

const UserSidebar = () => {

    const { isUser , userType , userLogout , user } = useContext(UserContext)
    let history = useHistory();
    const x = JSON.stringify(user)
    const y = JSON.parse(x)
    const z = user?.user?._id

    const handlesubmit = (e) => {
        e.preventDefault();
            console.log(userType);
          logoutUser('client',user.token).then((response) => {
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

    $('document').ready(function(){
        $('.filter').click(function(){
            $('.filtertable').fadeToggle(400);
        })
    })

    const togglemenu = () => {
        let navigation = document.querySelector('.navigation');
        let toggle = document.querySelector('.toggleuser');
        navigation.classList.toggle('active');
        toggle.classList.toggle('active');
    }

    return(
    <div>
    <div class="navigation navwidth">
    <ul>
    <li>
            {z ? (
            <a href={`/user/profile/${z}`}>
                <span class="icon"><i class="fas fa-user" aria-hidden="true"></i></span>
                <span class="title">My Profile</span>
            </a>
            ) : (
            <a href={`/user/profile/${y._id}`}>
                <span class="icon"><i class="fas fa-user" aria-hidden="true"></i></span>
                <span class="title">My Profile</span>
            </a>
            )}
        </li>
        <li>
            <Link to="/user/news">
                <span class="icon"><i class="fas fa-newspaper" aria-hidden="true"></i></span>
                <span class="title">News</span>
            </Link>
        </li>
        <li>
            <Link to="/user/advices">
                <span class="icon"><i class="fas fa-comment-medical" aria-hidden="true"></i></span>
                <span class="title">Advices</span>
            </Link>
        </li>
        <li>
            <a href="/user/messenger">
                <span class="icon"><i class="fas fa-comments" aria-hidden="true"></i></span>
                <span class="title">Messenger</span>
            </a>
        </li>
        <li>
            <Link to="/user/diagnose">
                <span class="icon"><i class="fas fa-stethoscope" aria-hidden="true"></i></span>
                <span class="title">diagnose</span>
            </Link>
        </li>
        <li>
            <Link to="/user/statistics">
                <span class="icon"><i class="fas fa-viruses" aria-hidden="true"></i></span>
                <span class="title">Statistics</span>
            </Link>
        </li>
        <li>
            <Link onClick={handlesubmit}>
                <span class="icon"><i class="fas fa-sign-out-alt" aria-hidden="true"></i></span>
                <span class="title">Log out</span>
            </Link>
        </li>
    </ul>
</div>
<div class="toggleuser" onClick={togglemenu}></div>
</div>
    )
}

export default UserSidebar;