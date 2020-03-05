import React from 'react'
import BookForm from './bookForm'
import _ from 'lodash'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import { startEditBook } from '../../component/action/bookAction'

function BookEdit(props){

    const handleSubmit=(formData)=>{
        props.dispatch(startEditBook(formData,props))
    }
        return(
            <div>
                {
                    !_.isEmpty(props.book) && (
                        <div>
                            <br />
                            <p className="lead">Edit book -{props.book.name}</p>
                            
                            {Object.keys(props.book).length!==0 && <BookForm {...props.book} handleSubmit={handleSubmit} />
                            }
                            <Link className="" to="/books">Back</Link>
                        </div>
                    )
                    
                }
                
            </div>
        )
}
const mapStateToProps=(state,props)=>{
    return{
        book:state.books.find(book=>book._id===props.match.params.id)
    }
}
export default connect(mapStateToProps)(BookEdit)