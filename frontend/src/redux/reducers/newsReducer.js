import {Getallnews,Getnews,Deletenews} from '../constants/newsConstant'

const INITIAL_STATE = {
    news : []
}

const NewsReducer = (state=INITIAL_STATE , action) => {
    switch (action.type){
        case Getallnews:
            return{
                ...state,
                news: action.payload,
            };
        case Getnews:
            return{
                singlenews : action.payload,
            };
        case Deletenews:
            return{
                news : state.news.filter(a => a._id !== action.payload._id)
            }
        default:
            return state
    }
}

export default NewsReducer;

