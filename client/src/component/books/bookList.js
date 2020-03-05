import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {startRemoveBook} from '../action/bookAction'
import BookNew from '../books/bookNew'
//import ModalBookShow from './bookShowModal'



class  bookList extends React.Component{
    constructor(props){
        super(props)
        this.state={
            searchTerm:'',
            currentlyDisplayed: this.props.books
        }
    }

    handleSearch = (e) => {
        let newlyDisplayed = this.props.books.filter(book=>book.name.includes(e.target.value))
        this.setState({
            searchTerm: e.target.value,
            currentlyDisplayed: newlyDisplayed
        })
    }

    
    render(){
        const handelRemove=(id)=>{
            this.props.dispatch(startRemoveBook(id))
         }
         let sty={overflow:'scroll',height:'400px'}
         console.log(this.state.currentlyDisplayed)
        return(
            <React.Fragment>
                <br />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-6" style={sty}>
                        <span className=""><p className="lead">Listing Books--{this.props.books.length}</p></span>
                        {/* <div class="md-form mt-0">
                            <input class="form-control" type="text" name="searchTerm" placeholder="Search By book Name" aria-label="Search" onChange={this.handleSearch} />
                        </div> */}
                        {
                            this.props.books.length===0?(
                                <div className="d-flex justify-content-center">
                                    <p className="lead">No Data Available</p>
                                </div>
                            ):(
                                <table className="table table-hover">
                                <thead className="">
                                <tr>
                                    <th>NAME</th>
                                    <th>Author</th>
                                    <th>Year Of Published</th>
                                    <th>Available?</th>
                                    <th colSpan="2">ACTION</th>
                                </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.props.books.map((book)=>{
                                            return(
                                                <tr key={book._id}>
                                                    <td>{book.name}</td>
                                                    <td>{book.author}</td>
                                                    <td>{book.yop}</td>
                                                    <td>{book.isAvailable===true?'Available':'Out Of Stock'}</td>
                                                    <td><Link className="btn btn-info" to={`/books/${book._id}`}>Show</Link></td>
                                                    <td><button className="btn btn-danger" onClick={()=>{
                                                        handelRemove(book._id)
                                                    }}>Remove</button></td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                                
                                {/* <ModalBookShow /> */}
                                </table>
                                
                                
                            )
                               
                        }
                         <Link className="" to="/books/new">Add Books</Link>
                        </div>
                        
                        <div className="col-md-6">
                            <BookNew  />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
        
    }
    
    
}
const mapStateToProps=(state)=>{
    return{
        books:state.books
    }
}
export default connect(mapStateToProps)(bookList)