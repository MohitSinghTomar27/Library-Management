import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {startRemoveTransaction} from '../action/transactionAction'

function TransactionList(props){
    const handelRemove=(id)=>{
        props.dispatch(startRemoveTransaction(id))
     }
    return(
        <div className="container-fluid">
             <br />
            <div className="row">
                <div className="col-md-12">
                   
                <span className=""><p className="lead">Listing Transactions--{props.transactions.length}</p></span>
                    {
                        props.transactions.length===0?(
                            <div className="d-flex justify-content-center">
                                <p className="lead">No Data Available</p>
                            </div>
                        ):(
                            <table className="table table-hover">
                            <thead className="">
                            <tr>
                                <th>BOOKS</th>
                                <th>ISSUED_AT</th>
                                <th>DUE_DATE</th>
                                <th>BORROWER</th>
                                <th>PHONE NUMBER</th>
                                <th>TRANSACTION_TYPE</th>
                                <th colSpan="2">ACTION</th>
                            </tr>
                            </thead>
                            <tbody>
                                {
                                    props.transactions.map((transaction,index)=>{
                                        return(
                                            <tr key={transaction._id}>
                                                <td>{transaction.books.map((book,i)=>{
                                                    return(
                                                       i+1+'. '+book.name+', \n'
                                                    )
                                                })}</td>
                                                <td>{transaction.createdAt}</td>
                                                <td>{transaction.duedate}</td>
                                                <td>{transaction.borrower.name}</td>
                                                <td>{transaction.number}</td>
                                                <td>{transaction.transaction_type}</td>
                                                <td><Link className="btn btn-info" to={`/transactions/${transaction._id}`}>Show</Link></td>
                                                <td><button className="btn btn-danger" onClick={()=>{
                                                    handelRemove(transaction._id)
                                                }}>Remove</button></td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                            </table>
                            
                            
                        )
                        
                        
                    }
                    <Link className="" to="/transactions/new">Add Trasactions</Link>
                </div>
            </div>
        </div>
    )
}
const mapStateToProps=(state)=>{
    return{
        transactions:state.transactions
       
    }
}

export default connect(mapStateToProps)(TransactionList);
