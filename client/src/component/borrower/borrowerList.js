import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {startRemoveBorrower} from '../action/borrowerAction'



function borrowerList(props){
    const handelRemove=(id)=>{
       props.dispatch(startRemoveBorrower(id))
    }
    
    return(
        <React.Fragment>
            <br />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6">
                    <span className=""><p className="lead">Listing Borrowers--{props.borrowers.length}</p></span>
                    {
                        props.borrowers.length===0?(
                            <div className="d-flex justify-content-center">
                                <p className="lead">No Data Available</p>
                            </div>
                        ):(
                            <table className="table table-hover">
                            <thead className="">
                            <tr>
                                <th>NAME</th>
                                <th>Email</th>
                                <th>Contact No</th>
                                <th colSpan="2">ACTION</th>
                            </tr>
                            </thead>
                            <tbody>
                                {
                                    props.borrowers.map((borrower)=>{
                                        return(
                                            <tr key={borrower._id}>
                                                <td>{borrower.name}</td>
                                                <td>{borrower.email}</td>
                                                <td>{borrower.contactno}</td>
                                                <td><Link className="btn btn-info" to={`/borrowers/${borrower._id}`}>Show</Link></td>
                                                <td><button className="btn btn-danger" onClick={()=>{
                                                    handelRemove(borrower._id)
                                                }}>Remove</button></td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                            </table>
                        )
                    }
                     <Link className="" to="/borrowers/new">Add Borrowers</Link>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
const mapStateToProps=(state)=>{
    return{
        borrowers:state.borrowers
    }
}
export default connect(mapStateToProps)(borrowerList)