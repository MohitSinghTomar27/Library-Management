import React from 'react'
// import {Link} from 'react-router-dom'
//import './customerForm.css'
import swal from 'sweetalert'
import axios from 'axios'
import moment from 'moment'
class BookForm extends React.Component{
    constructor(props){
        super(props)
        this.state={
            name:props.name?props.name:'',
            author:props.author?props.author:'',
            yop:props.yop?props.yop:'',
            user_id:props.user_id?props.user_id:'',
            values:[],
            isbn:''
        }
    }

    componentDidMount(){
        axios.get('http://localhost:3025/users/account',{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            //console.log(response)
            const user_id=response.data._id
            this.setState({user_id})
        })
        .catch((error)=>{
            console.log(error)
        })

        
    }


    handleBook=()=>{
        axios.get(`https://api.altmetric.com/v1/isbn/${this.state.isbn}`)
        .then((response)=>{
            if(response){
                let date=moment(response.data.published_on).format('L')
                let year=date.split('/')
                let yop=year[2]
                let values=response.data.title
                console.log(response.data)
                let author=response.data.authors[0]
                this.setState({name:values,author,yop})
            }
        })
        .catch((err)=>{
            swal(`No Books Find with this ISBN :${this.state.isbn}`)
            this.setState({name:'',author:'',yop:'',isbn:''})
        })
    }

    handleSubmit=(e)=>{
        e.preventDefault()
        const formData={
            name:this.state.name,
            author:this.state.author,
            yop:this.state.yop,
            user:this.state.user_id
        }
        this.props.handleSubmit(formData)
    }

    handleChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    render(){
        console.log(this.state.values)
        return(
            <div className="container-fluid" >
                <div className="card">
                    <div className="card-body">
                <br />
                <div className="row">
                <div className="col-md-6">
                <form onSubmit={this.handleSubmit} className="form-group">
                    <label><input type="text" className="form-control" value={this.state.name} 
                    onChange={this.handleChange}
                    name="name" placeholder="Name"
                    required={true}/>
                    </label><br />
                    <label><input type="text" className="form-control" value={this.state.author} onChange={this.handleChange}
                    name="author" placeholder="Author" required={true}/></label><br />
                    <label><input type="text" className="form-control" value={this.state.yop} onChange={this.handleChange}
                    name="yop" placeholder="Year Of Published" required={true}/></label><br />
                     <label>
                        <input type="hidden" className="form-control" defaultValue={this.state.user_id} 
                        name="user_id" onChange={this.handleChange} required={true} placeholder="User Id"/>
                    </label><br/>
                    <input type="submit" className="btn btn-primary"/>
                    {/* &nbsp;<Link to="/books" className="btn btn-primary">Back</Link> */}
                </form>
                </div>
                <div className="col-md-6">
                    <label><p className="lead">Search By ISBN</p>
                    <input type="text" placeholder="Search By ISBN" className="form-control" name="isbn" value={this.state.isbn} onChange={this.handleChange} /></label>&nbsp;
                    <br /><button className="btn btn-primary" onClick={this.handleBook}>Search</button>
                </div>
                </div>
                </div>
                </div>
            </div>
        )
    }
}
export default BookForm