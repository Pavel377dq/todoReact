/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

import Task from '../Task/Task';
import './TaskList.css';

function TaskList({ tasksFromServer, onDeleted, onToggleCompleted, editTask, setIntervalId, tick, buttonName }) {
    const filteredTasks = tasksFromServer.filter((task) => {
        if (buttonName === 'All') return true;
        if (buttonName === 'Active') {
            return !task.completed;
        }
        if (buttonName === 'Completed') {
            return task.completed;
        }
        return true;
    });
    return (
        <ul className="todo-list">
            {filteredTasks.map((item) => {
                const { id } = item;

                return (
                    <Task
                        key={id}
                        item={item}
                        {...item}
                        onDeleted={onDeleted}
                        onToggleCompleted={onToggleCompleted}
                        editTask={editTask}
                        id={id}
                        setIntervalId={setIntervalId}
                        tick={tick}
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
