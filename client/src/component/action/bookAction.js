import axios from '../config/config'
import swal from 'sweetalert'

export const setBooks=(books)=>{
    return{
        type:'SET_BOOKS',
        payload:books
    }
}

export const startSetBooks=()=>{
    return (dispatch)=>{
        axios.get('/books', {
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            const books=response.data
            //console.log(books)
            dispatch(setBooks(books))
        })
        .catch((err)=>{
            console.log(err)
        })
    }          
}

//REMOVE BOOK

export const removeBook=(id)=>{
    return {
        type:'REMOVE_BOOK',
        payload:id
    }
}

export const startRemoveBook=(id)=>{
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
                axios.delete(`/books/${id}`,{
                    headers:{
                        'x-auth':localStorage.getItem('authToken')
                    }
                })
                .then(()=>{
                    dispatch(removeBook(id))
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



//EDIT BOOK


export const editBook=(book)=>{
    return {
        type:'EDIT_BOOK',
        payload:book
    }
}

export const startEditBook=(formData,props)=>{
    return (dispatch)=>{
        axios.put(`/books/${props.match.params.id}`,formData, {
            headers:{
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            console.log(response)
            const book=response.data
            dispatch(editBook(book))
            swal('book Updated Successfully')
            props.history.push(`/books/${book._id}`)
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    
}



//ADD BOOK

export const addBook=(book)=>{
    return {
        type:'ADD_BOOK',
        payload:book
    }
}

export const startAddBook=(formData,props)=>{
    return (dispatch)=>{
        axios.post('/books',formData, {
            headers:{
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            console.log(response)
            if(response.data.hasOwnProperty('errors')){
                swal(`${response.data.errors.message}`)
            }else{
                const book=response.data
                console.log(book)
                dispatch(addBook(book))
                props.history.push(`/books/${book._id}`)
                swal('Book Added Successfully')
            }
            
        })
        .catch((err)=>{
            console.log(err)
        })
    }
}