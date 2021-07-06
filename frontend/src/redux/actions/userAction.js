import {Showsuccessmessage,Showerrormessage} from '../constants/messagesConstant'
import {Getallusers,Getuser,Deleteuser} from '../constants/userConstant'
import axios from 'axios'

export const GET_ALLUSERS = () => async dispatch => {
    try {
        const response = await axios.get('http://localhost:3500/user/client')
        dispatch({type:Getallusers , payload:response.data})
    } catch (err) {
        console.log("getallusers error is ",err)
        dispatch({type:Showerrormessage , payload:err.response.data.error})
    }
}
export const GET_USER = (userId) => async dispatch => {
    try {
        const response = await axios.get(`http://localhost:3500/user/client/${userId}`)
        dispatch({type:Getuser , payload:response.data})
    } catch (err) {
        console.log("getuser error is ",err)
        dispatch({type:Showerrormessage , payload:err.response.data.error})
    }
}
export const DELETE_USER = userId => async dispatch => {
    try {
        const response = await axios.delete(`http://localhost:3500/user/client/${userId}`)
        dispatch({type:Deleteuser , payload:response.data})
    } catch (err) {
        console.log("deleteuser error is ",err)
        dispatch({type:Showerrormessage , payload:err.response.data.error})
    }
}