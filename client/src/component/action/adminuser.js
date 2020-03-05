import axios from '../config/config'
import swal from 'sweetalert'
import {setBooks} from './bookAction'
import {setBorrowers} from './borrowerAction'
import { setTransactions } from './transactionAction'
export const setUser=(user={})=>{
    return {
        type: 'SET_USER',
        payload:user
    }
}

export const removeUser = () => {
    return {
        type: 'REMOVE_USER'
    }
}

export const startRegisterUser=(formData,props)=>{
    return (dispatch)=>{
        axios.post('/users/register',formData)
        .then((response)=>{
            if(response.data.hasOwnProperty('error')){
                swal(response.data.message)
            }
            else{
                swal("Congratulations",'You are successfully Registered',"success")
                dispatch(setUser())
                props.history.push('/users/login')
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }
}

export const startLoginUser=(formData,props)=>{
    return(dispatch)=>{
        axios.post('/users/login',formData)
        .then((response)=>{
            if(response.data.error){
                swal('Invalid UserName/Password',"You are not authorized!!!","error")
            }
            else{
                const token=response.data
                localStorage.setItem('authToken',token)
                Promise.all([axios.get('/users/account',{
                    headers:{'x-auth':token}
                }),axios.get('/books',{headers:{
                    'x-auth':token
                }}),axios.get('/borrowers',{headers:{
                    'x-auth':token
                }}),axios.get('/transactions',{headers:{
                    'x-auth':token
                }})])
                .then(values=>{
                    const [userResponse,bookResponse,borrowerResponse,transactionResponse]=values
                    dispatch(setUser(userResponse.data))
                    dispatch(setBooks(bookResponse.data))
                    dispatch(setBorrowers(borrowerResponse.data))
                    dispatch(setTransactions(transactionResponse.data))
                    props.history.push('/')
                    swal('Logged In Successfully',"You are good to go","success")

                })
                
                
                
            }
        })
    }

}

export const startGetUser=()=>{
    return (dispatch)=>{
        axios.get('/users/account',{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            const user=response.data
            dispatch(setUser(user))
        })
    }
}



export const startRemoveUser = (props) => {
    return(dispatch=>{
        axios.delete('users/logout',{
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then(response=>{
                if(response.data.errors){
                    alert(response.data.message)
                } else {
                    localStorage.clear()
                    dispatch(setUser())
                    //props.history.push('/users/login')
                    window.location.assign('/users/login')
                }
            })
    })
}
