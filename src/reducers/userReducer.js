const initialState = {
    token:'',
    status:'',
    email: '',
    clientes:[]
};

export default (state = initialState, action) => {

    switch(action.type) {
        case 'SET_TOKEN':
            return{...state, token:action.payload.token};
            break;
        case 'SET_EMAIL':
            return{...state, email:action.payload.email};
            break;
        case 'SET_STATUS':
            return{...state, status:action.payload.status};
            break;
        case 'SET_CLIENTES':
            return{...state, clientes:action.payload.clientes};
            break;        
    }

    return state;
}
