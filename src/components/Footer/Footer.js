import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TasksFilter from '../TasksFilter/TasksFilter';
import './Footer.css';

export default class Footer extends Component {
    render() {
        const { onFilter, deleteCompleted, count } = this.props;
        return (
            <footer className="footer">
                <span className="todo-count">{count} item unfinished</span>
                <TasksFilter onFilter={onFilter} />
                <button className="clear-completed" onClick={() => deleteCompleted()}>
                    Clear completed
                </button>
            </footer>
        );
    }
}

Footer.defaultProps = {
    count: 0,
};

Footer.propTypes = {
    count: PropTypes.number,
    deleteCompleted: PropTypes.func.isRequired,
    onFilter: PropTypes.func.isRequired,
};
