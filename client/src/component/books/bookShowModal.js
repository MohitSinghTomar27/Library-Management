import React from 'react'
import {Button,Modal} from 'react-bootstrap'
import {connect} from 'react-redux'
import BookForm from '../books/bookForm'

class BookShow extends React.Component{
    constructor(props,context){
        super(props,context)
        this.state={
            show:false
        }
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }
    handleClose() {
        this.setState({ show: false });
      }
    
      handleShow() {
        this.setState({ show: true });
      }

    render(){
        console.log(this.show)
        return(
            <React.Fragment>
                <Button className="btn btn-info" onClick={this.handleShow}>
                  Add
                </Button>
                <Modal show={this.state.show} onHide={this.handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Book Details</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                      
                    <BookForm handleSubmit={this.props.handleFormSubmit}/>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button onClick={this.handleClose}>Close</Button>
                  </Modal.Footer>
                </Modal>
            </React.Fragment>
        )
    }
    
}

const mapStateToProps=(state,props)=>{
    return{
        book:state.books
    }
}
export default connect(mapStateToProps)(BookShow)