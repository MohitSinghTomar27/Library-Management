import React from 'react'
import {connect} from 'react-redux'
import Select from 'react-select'
import axios from '../config/config'
import {Link} from 'react-router-dom'
import { FormHelperText } from '@material-ui/core'



class AdminTransactionForm extends React.Component{
    constructor(props){
        super(props)
        this.state={
            user_id:'',
            books:[],
            booksNew:[],
            emps:[],
            borrowers:[],
            number:'',
            borrower:'',
            transaction_type:'',
            required:true,
            isSearchable:true,
            selected: null,
            hasError: false
        }
    }

    componentDidMount(){
        axios.get('/users/account',{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            console.log(response)
            const user_id=response.data._id
            this.setState({user_id})
        })
        .catch((error)=>{
            console.log(error)
        })

        //****************/
        axios.get('/books',{
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            const books = response.data
            let emps = []
            books.map(book=>{
                return (
                    emps.push({
                        id: book._id,
                        value: book._id,
                        label: book.name,
                        isAvailable:book.isAvailable
                    })
                )
            })
            
            this.setState({emps})
        }) 


        //***********Books ******************/

        axios.get('/books',{headers:{
            'x-auth':localStorage.getItem('authToken')
        }})
        .then((response)=>{
            let books=response.data
            //console.log(response)
            this.setState({books})
            this.setState((prevState)=>{
                return{
                    booksNew:this.state.emps.filter(book=>book.isAvailable===true)
                }  
            })
        })

        //*****************borrowers***********************
        axios.get('/borrowers',{headers:{
            'x-auth':localStorage.getItem('authToken')
        }})
        .then((response)=>{
            let borrowers=response.data
            //console.log(response)
            this.setState({borrowers})
           

        })
        .catch(err=>{
            console.log(err)
        })
    }



//*********Selecting Multiple Item */
    handleMultiChange = (option) => {
        console.log('option', option)
        if(option !== null){
            this.setState(() => {
                return {
                books: option.map(option=>Object.assign(option.id))
             }
         })
        //  console.log('books', this.state.books)
        //  console.log('option', option)
        }
    }
//*************Selcting Single Item**********/

    handleBorrowerChange=(e)=>{
       let borrower=e.target.value
       this.setState({borrower})
       axios.get(`/borrowers/${borrower}`,{headers:{
           'x-auth':localStorage.getItem('authToken')
       }})
       .then((response)=>{
          //console.log(response)
          if(response.data.hasOwnProperty('contactno')){
            let number=response.data.contactno
            this.setState({number})
          }else{
              this.setState({number:''})
          } 
       })
       .catch(err=>{
           console.log(err)
       })
       //console.log('borrower',borrower)
        //console.log(e.target.value)
    }
 //******************************************/  
 
    handleChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
        //console.log(e.target.value)
    }


    handleSubmit=(e)=>{
        e.preventDefault()
        const formData={
            books:this.state.books,
            borrower:this.state.borrower,
            number:this.state.number,
            transaction_type:this.state.transaction_type,
            user:this.state.user_id
        }
        console.log('formData',formData)
        this.props.handleSubmit(formData)
    }

    //  Select = props => (
    //     <FixRequiredSelect
    //       {...props}
    //       SelectComponent={BaseSelect}
    //       options={props.options || options}
    //     />
    //   );
    render(){
        const { classes } = this.props;
    const { selected, hasError } = this.state;
        
        // console.log('books',this.state.books)
        // console.log('emps',this.state.emps)
        console.log(this.state.transaction_type)
        let sty={width:'30rem'}
        return(
            <div className="container-fluid" >
                <br /><br />
                <div className="card" style={sty} >
                    <div className="card-body">
                        <form onSubmit={this.handleSubmit}>
                        <label>
                        Books:
                        </label>
                            <Select
                                 name="books"
                                 placeholder="Select"
                                //value={this.state.books}
                                 options={this.state.booksNew}
                                 onChange={this.handleMultiChange}
                                 required
                                 isSearchable
                                 isMulti
                                 //input={<input id="name" />}
                            />
                            {selected && <FormHelperText>This is required!</FormHelperText>}
                    <br/>
                    <label>Borrower:
                        <select  className="form-control" required={true} value={this.state.borrower} onChange={this.handleBorrowerChange}   name="borrower">
                            <option value=" ">Select Borrower</option>
                            {
                                this.state.borrowers.map((borrower,index)=>{
                                    return(
                                    <option key={index}  value={borrower._id}>{borrower.name}</option>
                                    )
                                })
                            }
                        </select> 
                    </label>
                            <br />
                    <label>Contact No:
                        <input type="text" contentEditable={false} required={true} className="form-control"  value={this.state.number} onChange={this.handleChange}/>
                    </label>
                    

                    <label>
                        <input type="hidden" className="form-control" defaultValue={this.state.user_id} 
                        name="user_id" onChange={this.handleChange} required={true} placeholder="User Id"/>
                    </label><br/>
                   <label>Transaction type:<select className="form-control" required={true} value={this.state.transaction_type} placeholder="Transaction Type" onChange={this.handleChange} name="transaction_type">
                            <option value="">Select</option>
                            <option value="borrow"> Borrow</option>  
                            <option value="return">Return</option>
                        </select>
                   </label><br />
                   <input type="submit" className="btn btn-primary"/>
                   &nbsp;<Link to="/transactions" className="btn btn-primary">Back</Link>
                        </form>
                    </div>
            </div>
            </div>
            
        )
    }
}

export default connect()(AdminTransactionForm)
