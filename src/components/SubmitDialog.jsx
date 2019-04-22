import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


const Form = class form {
    constructor () {
        this.username = '';
        this.email = '';
        this.text = '';
    }
};

class FormDialog extends Component {
    state = {
        open: false,
        ...new Form()
    };

    handleClickOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    setInputValue = (name) => (e) => {
        this.setState({[name]: e.target.value});
    }

    onHandleCreate = (event) => {
        const {username, email, text} = this.state;
        this.props.handleCreate({username, email, text});
        this.setState({open: false, ...new Form()});
        event.preventDefault();
    }

    render() {
        const {username, email, text} = this.state;
        return (
            <div>
                <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
                    Create task
                </Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    aria-labelledby="form-dialog-title">
                    <form onSubmit={this.onHandleCreate}>
                        <DialogTitle id="form-dialog-title">Task fields</DialogTitle>
                        <DialogContent>
                            <TextField
                                onChange={this.setInputValue('username')}
                                value={username}
                                autoFocus
                                required
                                margin="dense"
                                id="username"
                                label="Username"
                                type="text"
                                fullWidth/>
                        </DialogContent>
                        <DialogContent>
                            <TextField
                                onChange={this.setInputValue('email')}
                                value={email}
                                margin="dense"
                                required
                                id="email"
                                label="Email Address"
                                type="email"
                                fullWidth/>
                        </DialogContent>
                        <DialogContent>
                            <TextField
                                onChange={this.setInputValue('text')}
                                value={text}
                                required
                                margin="dense"
                                id="text"
                                rows="4"
                                multiline
                                label="Text"
                                type="text"
                                fullWidth/>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button type="submit" color="primary">
                                Create
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </div>
        );
    }
}

FormDialog.propTypes = {
    handleCreate: PropTypes.func
};

export default FormDialog;