import React from 'react';
// import logo from './stock.jpg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import _ from 'lodash'
import {connect} from 'react-redux'
import {BrowserRouter,Route,Link,Switch} from 'react-router-dom'
import userlogin from '../src/component/adminuser/adminuser'
import registerUser from '../src/component/adminuser/registerUser'
import forgotPassword from '../src/component/adminuser/adminForgotPassword'
import swal from 'sweetalert'
//import  './parallex.css'
import {startRemoveUser} from './component/action/adminuser'
import bookList from '../src/component/books/bookList'
import bookShow from '../src/component/books/bookShow'
import BookEdit from '../src/component/books/bookEdit'
import BookNew from '../src/component/books/bookNew'
import BorrowerList from '../src/component/borrower/borrowerList'
import BorrowerShow from '../src/component/borrower/borrowerShow'
import BorrowerNew from '../src/component/borrower/borrowerNew'
import BorrowerEdit from '../src/component/borrower/borrowerEdit'
// import BorrowerTransaction from '../src/component/borrower/borrowerTransaction'
import AdminTransactionList from '../src/component/adminTransaction/adminTransactionList'
import AdminTransactionShow from '../src/component/adminTransaction/adminTransactionShow'
import AdminTransactionNew from '../src/component/adminTransaction/adminTransactionNew'
//import axios from 'axios'


class App extends React.Component {
  constructor(props){
    super(props)
    this.state={
      isOpen: false
    }
  }
  
  toggleOpen = (e) => {
    this.setState({ isOpen: !this.state.isOpen });
   }
  render(){
    const menuClass = `dropdown-menu${this.state.isOpen ? " show" : ""}`
  
    return(
      <div className="" >
        
      <BrowserRouter>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <nav className="mr-auto">
          {
            _.isEmpty(this.props.user)?(
              <div>
                <Link className="navbar-brand" to="/">Home</Link>
                <Link className="navbar-brand" to="/users/register"> Register </Link>
                <Link className="navbar-brand" to="/users/login"> Login</Link>
              </div>
            ):(
              
              <div>
                {this.props.user.user_type==="admin"?<div><Link className="navbar-brand" to="/">Home</Link>
                <Link className="navbar-brand" to="/books">  Books </Link>
                <Link className="navbar-brand" to="/borrowers"> Borrowers</Link>
                <Link className="navbar-brand" to="/transactions"> Transaction</Link></div>:<div>
                <Link className="navbar-brand" to="/">Home | </Link>
                <Link className="navbar-brand" to="/abc"> Transaction Done by {this.props.user.username}</Link></div>
                }
                </div>
            )
          }
          
        </nav> 
        {
          !_.isEmpty(this.props.user)?
          <div className="btn-group" onClick={this.toggleOpen} name="isOpen" width="40%">
                <button className="btn btn-success dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  >
                  {!_.isEmpty(this.props.user)?`Welcome ${this.props.user.username}`:''}
                </button>
                <div className={menuClass} aria-labelledby="dropdownMenuButton">
                <Link className="dropdown-item" to="/logout" onClick={()=>{
            swal({
              title: "Are you sure you want to log out?",
              icon: "warning",
              buttons: true,
              dangerMode: true,
            })
            .then((willDelete) => {
              if (willDelete) {
                swal("Successfully Logged out", {
                  icon: "success",
                });
                this.props.dispatch(startRemoveUser(this.props))
              } 
            })}}> Logout</Link>
                </div>
              </div>:''
        }
        
      </nav>
     
      <Switch>
      <Route path="/users/login" component={userlogin} exact={true}/>
      <Route path="/users/register" component={registerUser}/>
      <Route path="/users/forgotPassword" component={forgotPassword}/>
      <Route path="/books" component={bookList} exact={true}/>
      <Route path="/books/new" component={BookNew}/>
      <Route path="/books/:id" component={bookShow} exact={true}/>
      <Route path="/books/edit/:id" component={BookEdit} />
      <Route path="/borrowers" component={BorrowerList} exact={true}/>
      <Route path="/borrowers/new" component={BorrowerNew}/>
      <Route path="/borrowers/:id" component={BorrowerShow} exact={true}/>
      <Route path="/borrowers/edit/:id" component={BorrowerEdit} />
      <Route path="/transactions" component={AdminTransactionList} exact={true} />
      <Route path="/transactions/new" component={AdminTransactionNew} />
      <Route path="/transactions/:id" component={AdminTransactionShow} exact={true}/>
      {/* <Route path="/abc" component={BorrowerTransaction} exact={true} /> */}
      
      {/* <Route path="/logout" component={logout}/> */}
      </Switch>
      </BrowserRouter>
      {/* <img src={logo} width="1350" height="590"/> */}
    </div>
    )
  }
}


const mapStateToProps=(state)=>{
  return{
    user:state.user
  }
}
export default connect(mapStateToProps)(App);
