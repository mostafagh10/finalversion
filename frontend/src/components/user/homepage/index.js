import React , {useState , useEffect} from 'react';
import './style.css'
import { Link } from 'react-router-dom';
import axios from 'axios';
import ClientLogin from '../clientlogin';
import AOS from 'aos'
import "aos/dist/aos.css"
import Typical from "react-typical"
import Typewriter from 'typewriter-effect'

const Homepage = () => {
  const [services , setservices] = useState(null)
  const [team , setteam] = useState(null)

    const loadservices = () => {
        axios.get('../../../data.json').then((response) => {
            setservices(response.data.services)
        }).catch((err) => {
            console.log(err)
        });
    }
    useEffect(() => {
        loadservices();
    },[])

    const loadteam = () => {
        axios.get('../../../data.json').then((response) => {
            setteam(response.data.team)
        }).catch((err) => {
            console.log(err)
        });
    }
    useEffect(() => {
        loadteam();
    },[])

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(()=>{
        AOS.init({
            duration : 1000
        });
    })


    return(
       <div>
           <div className="header">
                  <div className="videoedit">
                  <video muted="true" style={{width:'100%'}} autoPlay loop>
                                  <source src="VID-20210402-WA0001.mp4" type="video/mp4" />
                                Your browser does not support the video tag.
                  </video>
                  </div>
                  <div className="content">       
                      <h1 className="homeheader" data-aos="fade-right">HELLO ,</h1><br /><br />
                      <h1><Typewriter options={{
                          autoStart:true,
                          loop:true,
                          delay:40,
                          strings:[
                              "welcome to co-safe website",
                              "you can know all about covid-19 news",
                              "you can know all advices to avoid covid-19",
                              "you can know all about statistics"
                          ]
                      }}
                       /></h1><br /><br />
                      <Link to="/login/client"><button className="btn btn-light homebutton1" data-aos="fade-right">log in</button></Link>
                      <Link to="/signup/client"><button className="btn btn-primary homebutton2" data-aos="fade-left">sign up</button></Link>
                  </div>
              </div>
           <div className="onee">
            <div className="container">
            <h1 data-aos="fade-right" className="pagetitle">our services</h1>
            <hr className="titlehr" size="20" data-aos="fade-right" />
            <br />
                <div className="row">
                {services && services.map(x => (
                        <div className="col-md-4" key={x.id}>
                        <div className="card" id="service11" data-aos="flip-up">
                        <span className={x.icon} id="service5"></span><br />
                            <h3>{x.type}</h3>
                            <p>{x.des}</p>
                        </div>
                      </div>
                ))}
              </div>
              </div>
              </div><br /><br />
              <div className="wave1" style={{position:'relative',backgroundColor:'#e1efe3',minHeight:'110vh'}}>
      <div className="container">
        <div className="row" style={{textAlign:'center'}}>
          <div className="d-none d-sm-none d-md-none d-lg-block col-lg-6" style={{marginTop:'90px'}} data-aos="fade-right">
              <img src="undraw_Co_workers_re_1i6i.png" width="95%" height="95%" />
          </div>
          <div data-aos="fade-left" className="col-lg-6 col-sm-12 homebody1" style={{marginTop:'100px'}}>
              <h3 style={{color:'#17a2b8',fontFamily:'cursive','fontStyle':'italic',fontWeight:'bolder'}}>welcome to co-safe website</h3><br />
              <div className="homebody1div">
              <h6 style={{lineHeight:'23px'}}>This web application supports and helps people with infectious diseases by reducing all costs and efforts, and easily gets the result of initial diagnosis, you only need to select the disease you expect.
We seek to organize everything related to infectious disease patients in terms of providing a group of the best doctors, appropriate isolation methods and how to deal with them, what the patient needs in terms of food and medicine, providing hospitals when the situation is needed , and so on ... which varies from patient to another and from disease to another.</h6>
              </div>
          </div>
      </div>
      </div>
    <div class="custom-shape-divider-bottom-1624469712">
    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" class="shape-fill"></path>
    </svg>
    </div>
      </div>
      <div style={{margin:'auto',width:'50%',textAlign:'center',marginTop:'90px',marginBottom:'90px'}}>
      <h1 data-aos="fade-right" className="pagetitle">about us</h1>
      <hr className="titlehr" size="20" data-aos="fade-right" />
      <h5 data-aos="fade-left" style={{lineHeight:'35px'}}>we're students in faculty of computer and artifical intelligence in helwan university .. 
          we have skills to build websites and mobile apllications with different technologies so we 
          combined our skills to build project help to reduce the number of cases of covid-19 by sending
          notifications , providing advices to avoid covid-19 , implement messenger between the users and admins 
          in purpose of help users .
      </h5>
      </div><br />
      <div className="container">
      <h1 data-aos="fade-right" className="pagetitle" style={{textAlign:'center'}}>our team</h1>
      <hr className="titlehr" size="20" data-aos="fade-right" />
          <div className="row">
          {team && team.map(x => (
                <div className="col-md-4" key={x.id} style={{textAlign:'center',marginTop:'30px'}}>
                <div className="card teamcard" data-aos="flip-right">
                <img className="card-img-top" src={x.image} height="300" /><br />
                <p style={{fontSize:'21px',fontWeight:'700'}}>{x.name}</p>
                <p style={{color:'rgb(153, 153, 153)',fontSize:'15px'}}>{x.job}</p>
                <div className="teamoverlay">
                    <div className="overlayicons">
                        <div>
                        <p className="fab fa-facebook-f"></p>
                        </div>
                        <div>
                        <p className="fab fa-github"></p>
                        </div>
                        <div>
                        <p className="fab fa-linkedin"></p>
                        </div>
                    </div>
                </div>
                </div>
              </div>
          ))}
          </div>
      </div>
      <div className="container">
      <div className="row" style={{textAlign:'center'}}>
          <div className="col-md-6" style={{marginTop:'75px' , textAlign:'left' , paddingLeft:'80px'}} data-aos="fade-right">
              <h3 style={{color:'#17a2b8',fontFamily:'cursive','fontStyle':'italic',fontWeight:'bolder'}}>your comfort is our policy</h3><br />
              <div style={{width:'80%'}}>
              <h6 style={{lineHeight:'35px'}}>The goal is to help anyone wishing to consult a doctor online, and to guide them in what they need to know before starting the treatment appropriate for them
We work to save people time instead of doing the same themselves through active research and saving their time
</h6>
              </div>
          </div>
          <div className="col-md-6" style={{marginTop:'30px',padding:'30px'}} data-aos="fade-left">
              <img src="undraw_medical_care_movn.png" width="95%" height="95%" />
          </div>
          </div>
      </div><br />
      <div className="Footer">
    <div className="container">
    <h2>co-safe</h2><br />
    <h4>WE're commited to your health</h4><br />
    <div>
            <p className="fab fa-facebook footericon"></p>
            <p className="fab fa-instagram footericon"></p>
            <p className="fab fa-twitter footericon"></p>
            <p className="fab fa-linkedin footericon"></p>
    </div><br />
    <p>copyRight @ 2021 All Right Done</p>
    </div>
    </div>
       </div>
    )
}

export default Homepage;