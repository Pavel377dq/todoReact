import React from 'react';
import PropTypes from 'prop-types';

import Task from '../Task/Task';
import './TaskList.css';

const TaskList = ({ tasksFromServer, onDeleted, onToggleCompleted }) => {
    return (
        <ul className="todo-list">
            {tasksFromServer.map((item) => {
                const { id } = item;

                return (
                    <Task
                        key={id}
                        {...item}
                        onDeleted={() => onDeleted(id)}
                        onToggleCompleted={() => onToggleCompleted(id)}
                    />
                );
            })}
        </ul>
    );
};

TaskList.propTypes = {
    tasksFromServer: PropTypes.array,
    onDeleted: PropTypes.func.isRequired,
    onToggleCompleted: PropTypes.func.isRequired,
};

TaskList.defaultProps = {
    tasksFromServer: [{}],
};

export default TaskList;
