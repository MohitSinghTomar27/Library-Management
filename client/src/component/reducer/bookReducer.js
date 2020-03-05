const booksInitialState=[]

const booksReducer=(state=booksInitialState,action)=>{
    switch(action.type){
        case 'SET_BOOKS':{
            return [...action.payload]
        }
        case 'REMOVE_BOOK':{
            return state.filter(customer=>customer._id!==action.payload)
        }
        case 'ADD_BOOK':{
            return [...state,action.payload]
        }
        case 'EDIT_BOOK':{
            return state.map(book=>{
                if(book._id===action.payload._id){
                    return {...action.payload}
                }else{
                    return {...book}
                }
            })
        }
        default:{
            return [...state]
        }
    }
}

export default booksReducer