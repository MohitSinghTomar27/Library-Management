import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import userReducer from '../reducer/userReducer'
import bookReducer from '../reducer/bookReducer'
import borrowerReducer from '../reducer/borrowerReducer'
import transactionReducer from '../reducer/transactionReducer'
const configureStore=()=>{
    const store=createStore(combineReducers({
        user:userReducer,
        books:bookReducer,
        borrowers:borrowerReducer,
        transactions:transactionReducer
    }),applyMiddleware(thunk))
    return store
}

export default configureStore