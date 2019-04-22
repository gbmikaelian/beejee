import * as type from '../../constants/actionTypes';

const actionCreators = {
    getTasksRequest: ({...arg}) => ({
        type: type.GET_TASKS,
        payload: arg
    }),
    getTasksSuccess: (data) => {
        return {
            type: type.GET_TASKS_SUCCESS,
            payload: data
        };
    },
    getTasksError: (error) => ({
        type: type.GET_TASKS_ERROR,
        payload: error
    }),
};

export default actionCreators;
