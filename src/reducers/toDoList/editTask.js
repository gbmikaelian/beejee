import * as actionTypes from '../../constants/actionTypes';

const initialState = {
    error: false,
    success: false,
};
export const editTask = (state = initialState, { type }) => {
    switch (type) {
    case actionTypes.EDIT_TASK: {
        return {
            ...state,
            success: false,
            error: false
        };
    }
        
    case actionTypes.EDIT_TASK_SUCCESS: {
        return {
            ...state,
            success: true,
        };
    }
        
    case actionTypes.EDIT_TASK_ERROR: {
        return { 
            ...state,
            error: true
        };
    }

    default:
        return state;
    }
};