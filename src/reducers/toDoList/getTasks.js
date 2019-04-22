import * as actionTypes from '../../constants/actionTypes';

const initialState = {
    error: false,
    success: null,
    errorMessage: '',
    taskList: [],
    total_task_count: 0
};

export const getTasks = (state = initialState, { type, payload }) => {
    switch (type) {
    case actionTypes.GET_TASKS: {
            
        return {
            success: false,
            ...state
        };
    }

    case actionTypes.GET_TASKS_SUCCESS: {
        const { message } = payload;
        return {
            ...state,
            success: true,
            taskList: message.tasks,
            total_task_count: parseInt(message.total_task_count)
        };
    }
        
    case actionTypes.GET_TASKS_ERROR: {
        let response = {
            ...state,
            error: true,
            success: false,
            errorMessage: payload.message,
        };
        return response;
    }

    default:
        return state;
    }
};