import axios from '../config/config'
import swal from 'sweetalert'


//SET TRANSACTION USER WISE

export const setTransactions=(transactions)=>{
    return{
        type:'SET_TRANSACTIONS',
        payload:transactions
    }
}

// export const startSetTransactions=(id)=>{
//     return (dispatch)=>{
//         axios.get(`/transactions/borrower/${id}`, {
//             headers:{
//                 'x-auth':localStorage.getItem('authToken')
//             }
//         })
//         .then((response)=>{
//             const transaction=response.data
//             //console.log(transaction)
//             dispatch(setTransactions(borrowers))
//         })
//         .catch((err)=>{
//             console.log(err)
//         })
//     }          
// }



export const startSetAdminTransactions=()=>{
    return (dispatch)=>{
        axios.get('/transactions', {
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            const transactions=response.data
            console.log(transactions)
            dispatch(setTransactions(transactions))
        })
        .catch((err)=>{
            console.log(err)
        })
    }          
}



//REMOVE BOOK

export const removeTransaction=(id)=>{
    return {
        type:'REMOVE_TRANSACTION',
        payload:id
    }
}

export const startRemoveTransaction=(id)=>{
    return (dispatch)=>{
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this Data!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                axios.delete(`/transactions/${id}`,{
                    headers:{
                        'x-auth':localStorage.getItem('authToken')
                    }
                })
                .then(()=>{
                    dispatch(removeTransaction(id))
                    swal("Poof! Your Data has been deleted!", {
                    icon: "success",
                  });
                })
               
            } else {
              swal("Your Data is safe!");
            }
          })
    }
}



//ADD BOOK

export const addTransaction=(book)=>{
    return {
        type:'ADD_TRANSACTION',
        payload:book
    }
}

export const startAddTransactions=(formData,props)=>{
    return (dispatch)=>{
        axios.post('/transactions',formData, {
            headers:{
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            console.log(response)
            if(response.data.hasOwnProperty('errors')){
                swal(`${response.data.errors.message}`)
            }else{
                const transaction=response.data
                console.log(transaction)
                dispatch(addTransaction(transaction))
                props.history.push(`/transactions/${transaction._id}`)
                swal('Transaction Added Successfully')
            }
            
        })
        .catch((err)=>{
            console.log(err)
        })
    }
}