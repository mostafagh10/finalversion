import {Showsuccessmessage,Showerrormessage} from '../constants/messagesConstant'
import {Getadvices,Deleteadvice , Getadvice} from '../constants/categoryConstant'
import axios from 'axios'

export const GET_ADVICES = () => async dispatch => {
    try {
        const response = await axios.get('http://localhost:3500/advice')
        dispatch({type:Getadvices , payload:response.data})
    } catch (err) {
        console.log("getcategories error is ",err)
        dispatch({type:Showerrormessage , payload:err.response.data.error})
    }
}

export const GET_ADVICE = (adviceId) => async dispatch => {
    try {
        const response = await axios.get(`http://localhost:3500/advice/${adviceId}`)
        dispatch({type:Getadvice , payload:response.data})
    } catch (err) {
        console.log("getadvice error is ",err)
        dispatch({type:Showerrormessage , payload:err.response.data.error})
    }
}

export const DELETE_ADVICE = adviceId => async dispatch => {
    try {
        const response = await axios.delete(`http://localhost:3500/advice/${adviceId}`)
        dispatch({type:Deleteadvice , payload:response.data})
    } catch (err) {
        console.log("deletecategory error is ",err)
        dispatch({type:Showerrormessage , payload:err.response.data.error})
    }
}