import { combineReducers } from 'redux';
import { getTasks } from './toDoList/getTasks';
import { addTask } from './toDoList/addTask';
import { editTask } from './toDoList/editTask';


const rootReducer = combineReducers({
    getTasks,
    addTask,
    editTask
});
  
export default rootReducer;
  