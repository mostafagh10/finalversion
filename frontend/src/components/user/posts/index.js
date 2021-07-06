import React, { useState , useEffect , useContext } from "react";
import { getnewsprocess } from '../../APIs/newsapi'
import {useDispatch} from 'react-redux'
import './style2.css'
import ShowUserHeader from "../userheader";
import {  UserContext } from '../../../ContextAPI/User'
import AOS from 'aos'
import "aos/dist/aos.css"

function News() {

  const { isUser , userType , userLogout , user } = useContext(UserContext)
  console.log(user)

    const dispatch = useDispatch();

    useEffect(()=>{
      AOS.init({
          duration : 1000
      });
  })
  
    const [news , setnews] = useState(null)
  
        const loadnews = async () => {
            await getnewsprocess().then((response) => {
                setnews(response.data)
            }).catch((err) => {
                console.log(err)
            });
        }
        useEffect(() => {
            loadnews();
        },[])
    return (
        <>
        {ShowUserHeader("fas fa-newspaper","news")}
        <div className="newsbody">
        <p>.</p>
          <div className="news">
            {news && news.map(news =>{
              return(
                <div className="posts_container">
                  <div className="news_post" >
                        <div className="post_titel">{news.title}</div>
                        <div className="post_image"><img className="news_image" src={news.image}></img></div>
                        <div className="post_time">{news.date}</div>
                        <div className="post_body">{news.body}</div>
                        <div className="link_div"><a href={news.URL} target="_blank"><button className="btn btn-info bottom_button">See more</button></a>
                  </div>
                    
                  </div>    
                </div>
              )
            })}
    
          </div>
          
          <br /><br />
        </div>
        </>
      );
}
  export default News;





