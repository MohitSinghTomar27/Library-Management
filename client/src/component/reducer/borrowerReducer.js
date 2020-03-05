const borrowersInitialState=[]

const borrowerReducer=(state=borrowersInitialState,action)=>{
    switch(action.type){
        case 'SET_BORROWERS':{
            return [...action.payload]
        }
        case 'REMOVE_BORROWER':{
            return state.filter(borrower=>borrower._id!==action.payload)
        }
        case 'ADD_BORROWER':{
            return [...state,action.payload]
        }
        case 'EDIT_BORROWER':{
            return state.map(borrower=>{
                if(borrower._id===action.payload._id){
                    return {...action.payload}
                }else{
                    return {...borrower}
                }
            })
        }
        default:{
            return [...state]
        }
    }
}

export default borrowerReducer