import React from 'react';
import PropTypes from 'prop-types';
import Task from '../Task/Task';
import './TaskList.css';

function TaskList({ tasksFromServer, onDeleted, onToggleCompleted, editTask }) {
    return (
        <ul className="todo-list">
            {tasksFromServer.map((item) => {
                const { id } = item;

                return (
                    <Task
                        key={id}
                        {...item}
                        onDeleted={() => onDeleted(id)}
                        onToggleCompleted={onToggleCompleted}
                        editTask={editTask}
                        id={id}
                    />
                );
            })}
        </ul>
    );
}

TaskList.propTypes = {
    tasksFromServer: PropTypes.array,
    onDeleted: PropTypes.func.isRequired,
    onToggleCompleted: PropTypes.func.isRequired,
};

TaskList.defaultProps = {
    tasksFromServer: [{}],
};

export default TaskList;
