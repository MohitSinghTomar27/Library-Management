import React from 'react'
//import axios from 'axios'
import {Link} from 'react-router-dom'
import BorrowerForm from './borrowerForm'
import {connect} from 'react-redux'
import {startAddBorrower} from '../../component/action/borrowerAction'
class BorrowerNew extends React.Component{
   
    handleSubmit=(formData)=>{
       this.props.dispatch(startAddBorrower(formData,this.props)) 
    }
    render()
    {
        return(
            <div className="container-fluid">
                <br />
                <h2>Add Borrower</h2>
                <BorrowerForm handleSubmit={this.handleSubmit}/>
                <Link className="" to="/borrowers">Back</Link>
            </div>
        )
    }
}
export default connect()(BorrowerNew)