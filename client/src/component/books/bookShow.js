import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import _ from 'lodash'

function bookShow(props) {
    let sty={width:'30rem'}
        return(
            
                <div className="container-fluid" align="center">   
                <br />
                {
                    !_.isEmpty(props.book)  && (
                        <div className="card" style={sty}>
                            <div className="card-body">
                                <p><b><u>Book Show page</u></b></p>
                                Name: {props.book.name}<br />
                                Author: {props.book.author}<br />
                                Year Of Published: {props.book.yop}<br />
                                Available: {props.book.isAvailable===true?'Available':'Out Of Stock'}<br />
                                <Link className="btn btn-primary" to={`/books/edit/${props.book._id}`}>Edit</Link>
                                &nbsp;<Link to="/books" className="btn btn-primary">Back</Link>
                            </div>
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
export default connect(mapStateToProps)(bookShow)