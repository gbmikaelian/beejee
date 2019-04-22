import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import Tooltip from '@material-ui/core/Tooltip';
import TableSortLabel from '@material-ui/core/TableSortLabel';

class EnhancedTableHead extends Component {
    constructor (...arg) {
        super(...arg);
        this.state = {
            
        };
    }

    createSortHandler = column => () => {
        this.setState({orderBy: column});
    }

    render() {
        const { name, column, orderBy, order, handleRequestSort} = this.props;
        return column === 'text' || column === 'operations' ? <TableCell>{column}</TableCell>:<TableCell>
            <Tooltip
                title="Sort"
                enterDelay={300}>
                <TableSortLabel
                    active={orderBy === column}
                    direction={order}
                    onClick={handleRequestSort(column, order)}>
                    {name}
                </TableSortLabel>
            </Tooltip>
        </TableCell>;
    }
}

EnhancedTableHead.propTypes = {
    name: PropTypes.string,
    column: PropTypes.string,
    orderBy: PropTypes.string,
    order: PropTypes.string,
    handleRequestSort: PropTypes.func
};

export default EnhancedTableHead;