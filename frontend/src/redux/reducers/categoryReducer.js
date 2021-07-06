import {Getadvices , Deleteadvice , Getadvice} from '../constants/categoryConstant'

const INITIAL_STATE = {
    advices : []
}

const AdviceReducer = (state=INITIAL_STATE , action) => {
    switch (action.type){
        case Getadvices:
            return{
                ...state,
                advices: action.payload,
            };
        case Getadvice:
            return{
                advice: action.payload,
            };
        case Deleteadvice:
            return{
                advices : state.advices.filter(a => a._id !== action.payload._id)
            }
        default:
            return state
    }
}

export default AdviceReducer;

