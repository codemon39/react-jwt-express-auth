import { SET_ERROR } from '../constants/actionTypes';

const errorReducer = (state = { error: null }, action: any) => {

    switch (action.type) {
        case SET_ERROR:
            return {...state, error: action?.data?.error }
            break;
        default:
            return state;
    }
}

export default errorReducer;
