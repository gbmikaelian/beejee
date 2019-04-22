import http from '../../http';
import { call, put, takeLatest } from 'redux-saga/effects';
import actionCreators from '../../actions/toDoList/AddTask';
import * as actionTypes from '../../constants/actionTypes';

function* addTask ({payload}) {
    try {
        const form = new FormData();
        for (const key in payload) {
            if (payload.hasOwnProperty(key)) {
                const value = payload[key];
                form.append(key, value);
            }
        }
        let query = {
            params: {
                developer: 'Garik'
            }
        };
        const response = yield call(http.post, '/create', form, query);
        
        yield put(actionCreators.addTaskSuccess(response));
    
    } catch (error) {
        yield put(actionCreators.addTaskError(error));
    }
}

export function* fetchAddTask () {
    yield takeLatest(actionTypes.ADD_TASK, addTask);
}