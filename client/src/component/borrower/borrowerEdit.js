import React from 'react'
import BorrowerForm from './borrowerForm'
import _ from 'lodash'
import {connect} from 'react-redux'
import { startEditBorrower } from '../../component/action/borrowerAction'

function BorrowerEdit(props){

    const handleSubmit=(formData)=>{
        props.dispatch(startEditBorrower(formData,props))
    }
        return(
            <div>
                {
                    !_.isEmpty(props.borrower) && (
                        <div>
                            <br />
                            <p className="lead">Edit borrower -{props.borrower.name}</p>
                            
                            {Object.keys(props.borrower).length!==0 && <BorrowerForm {...props.borrower} handleSubmit={handleSubmit} />
                            }
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
export default connect(mapStateToProps)(BorrowerEdit)