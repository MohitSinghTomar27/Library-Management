import React from "react";
import {connect} from 'react-redux'
import {startLoginUser} from '../action/adminuser'
import './adminuser.css'
class userlogin extends React.Component{
    constructor(props){
        super(props)
          this.state={
            email:'',
            password:''
          }
    }
    handleChange=(e)=>{
      this.setState({[e.target.name]:e.target.value})      
    }

    handleSubmit=(e)=>{
      e.preventDefault()
      const formData={
        email:this.state.email,
        password:this.state.password
      }
      this.props.dispatch(startLoginUser(formData,this.props))
    }
    render(){
      //console.log(this.state)
    
        return(
          <div className="container" align="center">
            <br />
            <div className="col-md-6">
            <form onSubmit={this.handleSubmit}>
                <h3>Sign In</h3>

                <div className="form-group">
                   
                    <input type="email" className="form-control" placeholder="Enter email" name="email" onChange={this.handleChange} required={true} />
                    
                </div>

                <div className="form-group">
                   
                    <input type="password" className="form-control" placeholder="Enter password" name="password" onChange={this.handleChange} required={true}/>
                   
                </div>

                <button type="submit" className="btn btn-primary btn-block">Submit</button>
                <p className="forgot-password text-left">
                    Dont have an account <a href="/users/register">Register with us</a>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    Forgot <a href="/users/forgotPassword">password?</a>
                </p>
            </form>
            </div>
          </div>
          
        )
    }
}

export default connect()(userlogin)





