import React from "react";
import {connect} from 'react-redux'
import {startRegisterUser} from '../action/adminuser'
import './adminuser.css'
class registerUser extends React.Component{
    constructor(props){
        super(props)
          this.state={
            email:'',
            password:'',
            username:''
          }
    }
    handleChange=(e)=>{
      this.setState({[e.target.name]:e.target.value})      
    }

    handleSubmit=(e)=>{
      e.preventDefault()
      const formData={
        email:this.state.email,
        password:this.state.password,
        username:this.state.username
      }
      this.props.dispatch(startRegisterUser(formData,this.props))
    }
    render(){
      //console.log(this.state)
    
        return(
          <div className="container" align="center">
            <br />
            <div className="col-md-6">
            <form onSubmit={this.handleSubmit}>
                <h3>Register</h3>
                <div className="form-group">
                   
                   <input type="text" className="form-control" placeholder="Enter username" name="username" onChange={this.handleChange} required={true} />
                   
               </div>

                <div className="form-group">
                   
                    <input type="email" className="form-control" placeholder="Enter email" name="email" onChange={this.handleChange} required={true} />
                    
                </div>

                <div className="form-group">
                   
                    <input type="password" className="form-control" placeholder="Enter password" name="password" onChange={this.handleChange} required={true}/>
                   
                </div>

                <button type="submit" className="btn btn-primary btn-block">Submit</button>
                <p className="forgot-password text-right">
                    Already have an account <a href="/users/login">Login</a>
                </p>
            </form>
            </div>
          </div>
          
        )
    }
}

export default connect()(registerUser)





