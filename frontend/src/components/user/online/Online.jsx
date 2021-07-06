import axios from "axios";
import { useEffect, useState } from "react";
import "./online.css";

export default function Online({onlineusers , currentId , setcurrentchat}){
    const [friends , setfriends] = useState([])
    const [onlinefriends , setonlinefriends] = useState([])

    useEffect(()=>{
      const getfriends = async () => {
      const res = await axios.get("http://localhost:3500/user/admin");
      console.log(res)
      setfriends(res.data)
      };
      getfriends();
    },[])

    /*       search     */
    const filterContent = (friends , searchterm) => {
      const result = friends.filter((friend) => friend.firstName.includes(searchterm))
      setfriends(result)
    }
    const handletextsearch = async e => {
      const searchterm = e.currentTarget.value
      await axios.get("http://localhost:3500/user/admin").then((response) => {
        filterContent(response.data , searchterm)
    }).catch((err) => {
        console.log(err)
    });
    }

    console.log(friends)
    const handleclick = async (user) => {
      try {
        const res = await axios.get(`http://localhost:3500/conversations/find/${currentId}/${user._id}`)
        setcurrentchat(res.data)
      } catch (err) {
        console.log(err)
      }
    }


    
    return(
        <>
        <input placeholder="search for admins" className="chatMenuInput" onChange={handletextsearch} />
          {friends.map(o => (
            <div className="conversationonline" onClick={() => handleclick(o)}>
            <img className="conversationimg" src="../../../adminicon.jpg" />
            <span className="coversationname">{o.firstName}</span>
            </div>
          ))}
        </>
    )
}
