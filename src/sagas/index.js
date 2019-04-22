import {all} from 'redux-saga/effects';
import { fetchTasks } from './toDoList/getTasks';
import { fetchAddTask } from './toDoList/addTask';
import { fetchEditTask } from './toDoList/editTask';

export default function* () {
    yield all([
        fetchTasks(),
        fetchAddTask(),
        fetchEditTask()
    ]);
}