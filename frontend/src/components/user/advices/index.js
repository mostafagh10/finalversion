import React, { useState , useEffect } from "react";
import { getadvicesprocess } from '../../APIs/adviceapi'
import {useDispatch} from 'react-redux'
import ShowUserHeader from "../userheader";
import './style2.css'
import AOS from 'aos'
import "aos/dist/aos.css"

function Advices() {
    const dispatch = useDispatch();

  const [advices , setadvices] = useState(null)

  useEffect(()=>{
    AOS.init({
        duration : 1000
    });
})

      const loadadvices = async () => {
          await getadvicesprocess().then((response) => {
              setadvices(response.data)
          }).catch((err) => {
              console.log(err)
          });
      }
      useEffect(() => {
          loadadvices();
      },[])
    return (
      <>
      {ShowUserHeader("fas fa-comment-medical","advices")}
      <div className="newsbody">
       <p>.</p>
          <div className="news">
            {advices && advices.map(advices =>{
              return(
                <div class="posts_container">
                  <div class="news_post">
                        <div class="post_titel">{advices.title}</div>
                        <div class="post_image"><img class="news_image" src={advices.image}></img></div>
                        <div class="post_body">{advices.body}</div>
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
  export default Advices;





