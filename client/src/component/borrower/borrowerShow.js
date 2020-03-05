import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import _ from 'lodash'

function borrowerShow(props) {
    let sty={width:'30rem'}
        return(
            
                <div className="container-fluid" align="center">   
                <br />
                {
                    !_.isEmpty(props.borrower)  && (
                        <div className="card" style={sty}>
                            <div className="card-body">
                                <p><b><u>Borrower Show page</u></b></p>
                                Name: {props.borrower.name}<br />
                                Email: {props.borrower.email}<br />
                                Contact Number: {props.borrower.contactno}<br />
                                <Link className="btn btn-primary" to={`/borrowers/edit/${props.borrower._id}`}>Edit</Link>
                                &nbsp;<Link to="/borrowers" className="btn btn-primary">Back</Link>
                            </div>
                        </div>
                    )
                }
                
             </div>   
            
            
        )
}
const mapStateToProps=(state,props)=>{
    return{
        borrower:state.borrowers.find(borrower=>borrower._id===props.match.params.id)
    }
}
export default connect(mapStateToProps)(borrowerShow)