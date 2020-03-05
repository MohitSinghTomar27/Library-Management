import React from 'react'
//import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import axios from '../config/config'
//import {startRemoveBorrower} from '../action/borrowerAction'

class BorrowerTransaction extends React.Component{
    constructor(props){
        super(props)
        this.state={
            transactions:[]
        }
    }

    componentDidMount(){
        console.log(`/transactions/borrower/${this.props.user._id}`)
        axios.get(`/transactions/borrower/${this.props.user._id}`,{headers:{
            'x-auth':localStorage.getItem('authToken')
        }})
        .then((response)=>{
            console.log('transaction',response.data)
            let transactions=response.data
            this.setState({transactions})
        })
        .catch((err=>{
            console.log(err)
        }))
    }

    render(){
        console.log(this.state.transactions)
        return(
            <React.Fragment>
                <ul>
                   {
                       this.state.transactions.map((transt,index)=>{
                           return(
                           <li key={index}>{'Transaction Type:',transt.transaction_type} {'Phone Number',transt.number} {'Deu Date',transt.duedate}</li>
                           )
                       })
                   }
                   </ul>
            </React.Fragment>
        )
    }
}


const mapStateToProps=(state)=>{
    return{
        user:state.user
    }
}
export default connect(mapStateToProps)(BorrowerTransaction)