import http from '../../http';
import { call, put, takeLatest } from 'redux-saga/effects';
import actionCreators from '../../actions/toDoList/editTask';
import * as actionTypes from '../../constants/actionTypes';

function* editTask ({payload}) {
    try {
        const form = new FormData();
        for (const key in payload) {
            if (payload.hasOwnProperty(key) && key !== 'id') {
                const value = payload[key];
                form.append(key, value);
            }
        }
        let query = {
            params: {
                developer: 'Garik'
            }
        };
        const response = yield call(http.post, `edit/${payload.id}/`, form, query);

        yield put(actionCreators.editTaskSuccess(response));
    
    } catch (error) {
        yield put(actionCreators.editTaskError(error));
    }
}

export function* fetchEditTask () {
    yield takeLatest(actionTypes.EDIT_TASK, editTask);
}