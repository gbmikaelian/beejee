import axios from 'axios';

export default axios.create({
    headers: new Headers({
        'Content-Type': 'application/json'
    }),
    baseURL: 'https://uxcandy.com/~shapoval/test-task-backend'
});
