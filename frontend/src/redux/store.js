import { combineReducers , applyMiddleware , createStore} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import messageReducer from '../redux/reducers/messagesReducer'
import AdviceReducer from '../redux/reducers/categoryReducer'
import NewsReducer from '../redux/reducers/newsReducer'
import AdminReducer from '../redux/reducers/adminReducer'
import UserReducer from '../redux/reducers/userReducer'

const reducer = combineReducers({
    messages : messageReducer,
    advices : AdviceReducer,
    news : NewsReducer,
    admins:AdminReducer,
    users:UserReducer
})

const initialstate = {}

const middleware = [thunk]

const store = createStore(
    reducer,
    initialstate,
    composeWithDevTools(applyMiddleware(...middleware))   
)

export default store;
