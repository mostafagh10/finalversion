import {Getallusers,Getuser,Deleteuser} from '../constants/userConstant'

const INITIAL_STATE = {
    users : []
}

const UserReducer = (state=INITIAL_STATE , action) => {
    switch (action.type){
        case Getallusers:
            return{
                ...state,
                users: action.payload,
            };
        case Getuser:
            return{
                user : action.payload,
            };
        case Deleteuser:
            return{
                users : state.users.filter(a => a._id !== action.payload._id)
            }
        default:
            return state
    }
}

export default UserReducer;

