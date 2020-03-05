import React from 'react'
//import axios from 'axios'
import {Link} from 'react-router-dom'
import BookForm from './bookForm'
import {connect} from 'react-redux'
import {startAddBook} from '../../component/action/bookAction'
class BookNew extends React.Component{
   
    handleSubmit=(formData)=>{
       this.props.dispatch(startAddBook(formData,this.props)) 
    }
    render()
    {
        return(
            <div className="container-fluid">
                <br />
                <h2>Add Book</h2>
                <BookForm handleSubmit={this.handleSubmit}/><br />
                <Link className="" to="/books">Back</Link>
            </div>
        )
    }
}
export default connect()(BookNew)