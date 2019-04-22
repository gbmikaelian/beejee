import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


import EnhancedTableHead from '../components/EnhancedTableHead';
import SubmitDialog from '../components/SubmitDialog';

import getTasksActionCreators from '../actions/toDoList/getTasks';
import addTasksActionCreators from '../actions/toDoList/AddTask';
import editTasksActionCreators from '../actions/toDoList/editTask';

import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


const styles = () => ({
    root: {
        flexGrow: 1
    },
    table: {
        minWidth: 600
    },
    frameBlock: {
        width: 200
    },
    tablesBlock: {
        display: 'flex',
        border: '1px solid'
    }
});

class Home extends Component {
    state = {
        notifyOpen: false,
        orderBy: 'username',
        order: 'asc',
        rowsPerPage: 3,
        page: 1
    };

    loggedIn = localStorage.getItem('loggedIn');

    sort = {sort_field: 'id', sort_direction: 'desc'};
    componentDidUpdate (prevProps) {
        if (prevProps.addToDoList.success !== this.props.addToDoList.success) {
            this.props.getToDoList(this.sort);
            this.props.addToDoList.success = false;
        }
        
        if (prevProps.editTaskReducer.success !== this.props.editTaskReducer.success) {
            this.props.getToDoList();
            this.props.editTaskReducer.success = false;
        }
    }

    componentDidMount() {
        this.props.getToDoList();
        if(this.loggedIn) this.rows.push({id: 'operations', label: 'Operations'});
    }

    setInputValue = (e, name) => {
        this.setState({[name]: e.target.value});
    }

    handleRequestSort = (orderBy, order) => () => {
        if (order === 'asc')  {
            order = 'desc';
        } else {
            order = 'asc';
        }
        this.setState({orderBy, order, page: 0});
        this.props.getToDoList({sort_field: orderBy, sort_direction: order});
    }

    handleChangePage = (event, page) => {
        this.props.getToDoList({page : page + 1});
        this.setState({ page });
    };

    updateRow = (row, check) => () => {
        if (check) {
            if (row.status === 10) {
                row.status = 0;
            } else {
                row.status = 10;
            }
        }
        this.props.editTask(row);
    }

    updateRowText = row => e => {
        row.text = e.target.value;
        this.setState({});
    }

    rows = [
        {id: 'username', label: 'Username'},
        {id: 'email', label: 'Email'},
        {id: 'text', Label: 'Text'},
        {id: 'status', label: 'Status'}
    ];
    render() {
        const {classes, taskList, total_task_count, addTask} = this.props;
        const {orderBy, order, page, rowsPerPage} = this.state;
        
        return (
            <Grid container className={classes.root}>
                <Grid item xs={11}></Grid>                
                <Grid item xs={1}>{this.loggedIn ? 'Logged' : <Link to="/login">Login</Link>}</Grid>
                <Grid item xs={12}>

                    <Grid
                        container
                        className={classes.demo}
                        justify="center">
                        <div className={classes.tablesBlock}>
                            <Grid item style={{borderRight: '1px solid'}}>
                                <SubmitDialog 
                                    handleCreate={addTask}/>
                                <Paper className={classes.root}>
                                    <Table className={classes.table} >
                                        <TableHead>
                                            <TableRow>
                                                {
                                                    this.rows.map((row, key) => (
                                                        <EnhancedTableHead
                                                            key={key}
                                                            column={row.id}
                                                            name={row.label}
                                                            handleRequestSort={this.handleRequestSort}
                                                            order={order}
                                                            orderBy={orderBy}/>
                                                    ))
                                                }
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                taskList.map(row => (
                                                    <TableRow className={classes.row} key={row.id}>
                                                        <TableCell 
                                                            component="th"
                                                            scope="row">
                                                            {row.username}
                                                        </TableCell>
                                                        <TableCell component="th" scope="row">
                                                            {row.email}
                                                        </TableCell>
                                                        <TableCell component="th" scope="row">
                                                            <div className={classes.frameBlock}>
                                                            </div>
                                                            {this.loggedIn ? <TextField
                                                                // onChange={this.setInputValue('text')}
                                                                value={row.text}
                                                                onChange={this.updateRowText(row)}
                                                                required
                                                                margin="dense"
                                                                id="text"
                                                                rows="4"
                                                                multiline
                                                                label="Text"
                                                                type="text"
                                                                fullWidth/>: row.text}
                                                        </TableCell>
                                                        <TableCell component="th" scope="row">
                                                            <Checkbox
                                                                disabled={!this.loggedIn}
                                                                checked={!!row.status}
                                                                onChange={this.updateRow(row, 'check')}
                                                            />
                                                        
                                                        </TableCell>
                                                        {this.loggedIn ? <TableCell>
                                                            <Button onClick={this.updateRow(row)} color="primary">Save</Button>
                                                        </TableCell>: <Fragment/> }

                                                    </TableRow>
                                                ))
                                            }
                                        </TableBody>
                                    </Table>
                                    <TablePagination
                                        rowsPerPageOptions={[]}
                                        component="div"
                                        count={total_task_count}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        backIconButtonProps={{
                                            'aria-label': 'Previous Page',
                                        }}
                                        nextIconButtonProps={{
                                            'aria-label': 'Next Page',
                                        }}
                                        onChangePage={this.handleChangePage}
                                    />
                                </Paper>
                            </Grid>
                        </div>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = state => {
    const {taskList} = state.getTasks;

    return {
        addToDoList: state.addTask,
        taskListReducer: state.getTasks,
        taskList,
        editTaskReducer: state.editTask,
        total_task_count: state.getTasks.total_task_count
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getToDoList({...arg}) {
            dispatch(getTasksActionCreators.getTasksRequest({...arg}));
        },
        addTask (data) {
            dispatch(addTasksActionCreators.addTaskRequest(data));
        },
        editTask (data) {
            dispatch(editTasksActionCreators.editTaskRequest(data));
        }
    };
};

Home.propTypes = {
    getToDoList: PropTypes.func,
    addToDoList: PropTypes.object,
    taskListReducer: PropTypes.object,
    addTask: PropTypes.func,
    classes: PropTypes.object,
    taskList: PropTypes.array,
    total_task_count: PropTypes.number,
    editTask: PropTypes.func,
    editTaskReducer: PropTypes.object
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Home));