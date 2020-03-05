import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import _ from 'lodash'

function transactionShow(props) {
    let sty={width:'30rem'}
        return(
            
                <div className="container-fluid" align="center">   
                <br />
                {
                    !_.isEmpty(props.transaction)  && (
                        <div className="card" style={sty}>
                            <div className="card-body">
                                <h3><b><u>Transaction Show page</u></b></h3>
                                {/* {typeof(props.transaction.books)} */}
                                Books: {props.transaction.books.map((book,i)=>{
                                    return(
                                        i+1+'. '+book.name+' , \n'
                                    )
                                })}<br />
                                Issued_At: {props.transaction.createdAt}<br />
                                Due Date: {props.transaction.duedate}<br />
                                Borrowed By: {props.transaction.borrower.name}<br />
                                Phone Number: {props.transaction.number}<br />
                                Transaction Type: {props.transaction.transaction_type}<br />
                                <Link className="btn btn-primary" to={`/transactions/edit/${props.transaction._id}`}>Edit</Link>
                                &nbsp;<Link to="/transactions" className="btn btn-primary">Back</Link>
                            </div>
                        </div>
                    )
                }
                
             </div>   
            
            
        )
}
const mapStateToProps=(state,props)=>{
    let val=state.transactions.find(transaction=>transaction._id===props.match.params.id)
    console.log(val)
    return{
        transaction:state.transactions.find(transaction=>transaction._id===props.match.params.id)
    }
}
export default connect(mapStateToProps)(transactionShow)