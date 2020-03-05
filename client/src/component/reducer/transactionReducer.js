const transactionInitialState=[]

const transactionReducer=(state=transactionInitialState,action)=>{
    switch(action.type){
        case 'SET_TRANSACTIONS':{
            return [...action.payload]
        }
        case 'REMOVE_TRANSACTION':{
            return state.filter(borrower=>borrower._id!==action.payload)
        }
        case 'ADD_TRANSACTION':{
            return [...state,action.payload]
        }
        case 'EDIT_TRANSACTION':{
            return state.map(transaction=>{
                if(transaction._id===action.payload._id){
                    return {...action.payload}
                }else{
                    return {...transaction}
                }
            })
        }
        default:{
            return [...state]
        }
    }
}

export default transactionReducer