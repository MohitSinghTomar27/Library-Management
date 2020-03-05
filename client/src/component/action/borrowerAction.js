import axios from '../config/config'
import swal from 'sweetalert'


//SET BORROWER

export const setBorrowers=(borrowers)=>{
    return{
        type:'SET_BORROWERS',
        payload:borrowers
    }
}

export const startSetBorrowers=()=>{
    return (dispatch)=>{
        axios.get('/borrowers', {
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            const borrowers=response.data
            //console.log(borrowers)
            dispatch(setBorrowers(borrowers))
        })
        .catch((err)=>{
            console.log(err)
        })
    }          
}



//REMOVE BORROWERS

export const removeBorrower=(id)=>{
    return {
        type:'REMOVE_BORROWER',
        payload:id
    }
}

export const startRemoveBorrower=(id)=>{
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
                axios.delete(`/borrowers/${id}`,{
                    headers:{
                        'x-auth':localStorage.getItem('authToken')
                    }
                })
                .then(()=>{
                    dispatch(removeBorrower(id))
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


//ADD BORROWER

export const addBorrower=(borrower)=>{
    return {
        type:'ADD_BORROWER',
        payload:borrower
    }
}

export const startAddBorrower=(formData,props)=>{
    return (dispatch)=>{
        axios.post('/borrowers',formData, {
            headers:{
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            console.log(response)
            if(response.data.hasOwnProperty('errors')){
                swal(`${response.data.errors.message}`)
            }else{
                const borrower=response.data
                console.log(borrower)
                dispatch(addBorrower(borrower))
                props.history.push(`/borrowers/${borrower._id}`)
                swal('Borrower Added Successfully')
            }
            
        })
        .catch((err)=>{
            console.log(err)
        })
    }
}


//EDIT BORROWER

export const editBorrower=(borrower)=>{
    return {
        type:'EDIT_BORROWER',
        payload:borrower
    }
}

export const startEditBorrower=(formData,props)=>{
    return (dispatch)=>{
        axios.put(`/borrowers/${props.match.params.id}`,formData, {
            headers:{
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            console.log(response)
            const borrower=response.data
            dispatch(editBorrower(borrower))
            swal('Borrower Updated Successfully')
            props.history.push(`/borrowers/${borrower._id}`)
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    
}


