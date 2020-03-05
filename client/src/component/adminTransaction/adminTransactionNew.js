import React from 'react'
//import axios from 'axios'
import {Link} from 'react-router-dom'
import AdminTransactionForm from './adminTransactionForm'
import {connect} from 'react-redux'
import {startAddTransactions} from '../../component/action/transactionAction'
class TransactionNew extends React.Component{
   
    handleSubmit=(formData)=>{
       this.props.dispatch(startAddTransactions(formData,this.props)) 
    }
    render()
    {
        return(
            <div className="container-fluid">
                <br />
                <h2>Add Transaction</h2>
                <AdminTransactionForm handleSubmit={this.handleSubmit}/><br />
                <Link className="" to="/transactions">Back</Link>
            </div>
        )
    }
}
export default connect()(TransactionNew)