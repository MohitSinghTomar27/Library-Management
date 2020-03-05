import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import configureStore from '../src/component/store/configureStore'
import {Provider} from 'react-redux'
import {startGetUser} from '../src/component/action/adminuser'
import {startSetBooks} from '../src/component/action/bookAction'
import {startSetBorrowers} from '../src/component/action/borrowerAction'
import {startSetAdminTransactions} from '../src/component/action/transactionAction'

const store=configureStore()
console.log(store.getState())
store.subscribe(()=>{
    console.log(store.getState())
})

if(localStorage.getItem('authToken')){
    store.dispatch(startGetUser())
    store.dispatch(startSetBooks())
    store.dispatch(startSetBorrowers())
    store.dispatch(startSetAdminTransactions())
}
const jsx=(
    <div>
    <Provider store={store}>
        <App />
    </Provider>
    </div>
)

ReactDOM.render(jsx, document.getElementById('root'));