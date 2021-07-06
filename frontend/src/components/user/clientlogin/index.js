import React , {useState , useContext , useEffect} from 'react'
import { failedmessage, successmessage } from "../../helpers/messages";
import {useHistory} from 'react-router-dom'
import {  UserContext } from '../../../ContextAPI/User'
import loginUser from '../../../ContextAPI/Node API/loginUser'
import { Link } from 'react-router-dom';
import $ from 'jquery'
import isEmpty from 'validator/lib/isEmpty'
import AOS from 'aos'
import "aos/dist/aos.css"
import './style.css'

const ClientLogin = ({show,handleClose}) => {
      //setup component state
      let history = useHistory();

    const { userLogin } = useContext(UserContext)

    useEffect(()=>{
      AOS.init({
          duration : 1400
      });
  })

  const [formdata, setformdata] = useState({
    email:"",
    password:"",
    succesmsg: false,
    failedmsg: false
    });

       //destructure component state
  const {
    email,
    password,
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
    if(isEmpty(email) || isEmpty(password)){
      setformdata({
        ...formdata,
        failedmsg:'all fields are required'
      })
    }
    else{
    const {email,password} = formdata;
      const data =  {email,password}
      setformdata({
        ...formdata,
        failedmsg:false,
        succesmsg:'validation success'
      })

      loginUser(data , 'client').then((response) => {
        if(response.status == 200){
          console.log('axios login client success' , response)
          const {user , token} = response.data
          console.log(user)
          userLogin({user , token} , {client : true})
          history.push('/user/statistics')
          setformdata({
            email:"",
            password:"",
            succesmsg : "success log in",
            failedmsg : false
          })    
      }
    }).catch((err) => {
        console.log(err)
        setformdata({
          ...formdata,
          succesmsg:"",
          failedmsg:'unable to log in'
        })
    })
  }
  }

    const showTheForm = () => (
  <div style={{position:'relative',backgroundColor:'rgb(126, 178, 182)',height:'100vh'}}>
  <div class="box">
  <div class="custom-shape-divider-top-1624485354">
    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" class="shape-fill"></path>
    </svg>
</div>
  </div>
  <div class="box overlay">
  <div>
      {failedmsg && failedmessage(failedmsg)}
      {succesmsg && successmessage(succesmsg)}
      <main className="container mb-5" id="oneSeat" data-aos="flip-right">
      <div className="loginpage main">
      <form onSubmit={handlesubmit}>
        <div className="row">
          <div
            className="d-none d-sm-none d-md-none d-lg-block col-lg-6 loginimage">
              <img
                src="../../../167591270_117224893677138_4471627755125957513_n.png"
                width="280"
                height="150"
                style={{marginTop: '130px'}}
                alt="Logo"
              />
              <h1 style={{color:"white",fontFamily:'serif',fontWeight:'bold',letterSpacing:'12px'}}>CO-SAFE</h1>
          </div>
          
          <div
            id="oneSeat"
            className="col-lg-6 col-sm-12"
            style={{textAlign: 'center'}}
          >
            <h1 style={{fontFamily:'serif',fontWeight:'bold',letterSpacing:'7px'}}>CO-SAFE</h1><br />
            <h4 style={{fontFamily:'cursive',fontStyle:'italic'}}>welcome to CO-SAFE website</h4>
            <input
              style={{marginBottom: '30px'}}
              placeholder="enter your email" name="email" value={email} onChange={handlechange}
              className="oneseatone"
            /><span className="fas fa-envelope iconlogin"></span><br />

<input type="password" placeholder="enter your password" name="password" value={password} onChange={handlechange} />
<span className="fas fa-lock iconlogin"></span><br />


<button type="submit"className="btn btn-info oneseatbutton">Log In</button>
<h5 style={{paddingTop:'30px'}}><Link to="/forgetpassword/sendemail" style={{color:'white'}}>forgotten password ?</Link></h5>

          </div>
        </div>
      </form>
      </div>
    </main>
    </div>
  </div>
    </div>
    )

    return <div>{showTheForm()}</div>;
}

export default ClientLogin;