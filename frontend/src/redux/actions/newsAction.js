import {Showsuccessmessage,Showerrormessage} from '../constants/messagesConstant'
import {Getallnews,Getnews,Deletenews} from '../constants/newsConstant'
import axios from 'axios'

export const GET_ALLNEWS = () => async dispatch => {
    try {
        const response = await axios.get('http://localhost:3500/news')
        dispatch({type:Getallnews , payload:response.data})
    } catch (err) {
        console.log("getallnews error is ",err)
        dispatch({type:Showerrormessage , payload:err.response.data.error})
    }
}
export const GET_NEWS = (newsId) => async dispatch => {
    try {
        const response = await axios.get(`http://localhost:3500/news/${newsId}`)
        dispatch({type:Getnews , payload:response.data})
    } catch (err) {
        console.log("getnews error is ",err)
        dispatch({type:Showerrormessage , payload:err.response.data.error})
    }
}
export const DELETE_NEWS = newsId => async dispatch => {
    try {
        const response = await axios.delete(`http://localhost:3500/news/${newsId}`)
        dispatch({type:Deletenews , payload:response.data})
    } catch (err) {
        console.log("deletenews error is ",err)
        dispatch({type:Showerrormessage , payload:err.response.data.error})
    }
}