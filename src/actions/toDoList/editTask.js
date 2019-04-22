import * as type from '../../constants/actionTypes';
import md5 from 'md5';
const actionCreators = {
    editTaskRequest: (data) => {
        const {status, text, id} = data;
        const token = 'beejee';
        let signature = encodeURI(`status=${status}&text=${text}&token=${token}`);
        signature = md5(signature);
        return {
            type: type.EDIT_TASK,
            payload: {status, text, id, signature, token}
        };
    },
    editTaskSuccess: (data) => ({
        type: type.EDIT_TASK_SUCCESS,
        payload: data
    }),
    editTaskError: (error) => ({
        type: type.EDIT_TASK_ERROR,
        payload: error
    }),
};

export default actionCreators;