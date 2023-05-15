/* eslint-disable no-restricted-globals */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import KG from 'date-fns/locale/en-AU';
import PropTypes from 'prop-types';

import TaskTimer from '../TaskTimer/TaskTimer';
import './Task.css';

export default class Task extends Component {
   

    editTask(id) {

        const{
            description,
            editTask
        } = this.props;

        const label = document.getElementById(id + 1000);
        const oldDescription = label.querySelector('.description');
        const button = document.getElementById(id + 1001);
        button.classList.add('hidden-d');
        oldDescription.classList.add('hidden-d');
        const newDescription = document.createElement('input');
        newDescription.classList.add('new-editing');

        const newform = document.createElement('form');
        newDescription.type = 'text';
        newDescription.value = description;

        newform.append(newDescription);

        newform.onsubmit = (evt) => {
            evt.preventDefault();
            editTask(id, newDescription.value);
            oldDescription.classList.remove('hidden-d');
            button.classList.remove('hidden-d');
            newform.remove();
        };

        label.prepend(newform);
    }

    crossOut(id, evt) {
        this.props.onToggleCompleted(id);
        const li = document.getElementById(id + 1010);
        const checkBox = li.querySelector('input');
        

        if (evt.target.tagName === 'SPAN') {
            if (li.classList.contains('completed')) {
                checkBox.checked = false;
            } else {
                li.classList.add('completed');
                checkBox.checked = true;
            }
        }
    }

    render() {
        const { description, creatingTime, onDeleted, completed, seconds, minutes, id } = this.props;

        let classNames = '';
        if (completed) {
            classNames += 'completed';
        }
        const timer =
            !isNaN(seconds) && !isNaN(minutes) && minutes !== '' && seconds !== '' ? (
                <TaskTimer seconds={seconds} minutes={minutes} />
            ) : (
                <span className="warning">timer value
                set incorrectly
                </span>
            );

        return (
            <li id={id + 1010} className={classNames}>
                <div className="view">
                    <input className="toggle " type="checkbox" onClick={(evt) => this.crossOut(id, evt)} />
                    <label id={id + 1000}>
                        <span className="description" onClick={(evt) => this.crossOut(id, evt)}>
                            {description}
                        </span>
                        <span className="created">
                            {`created ${formatDistanceToNow(creatingTime, {
                                includeSeconds: true,
                                locale: KG,
                                addSuffix: true,
                            })}`}
                        </span>
                    </label>
                    {timer}
                    <button id={id + 1001} className="icon icon-edit" onClick={() => this.editTask(id)} />
                    <button className="icon icon-destroy" onClick={onDeleted} />
                </div>
            </li>
        );
    }
}

Task.propTypes = {
    id: PropTypes.number,
    description: PropTypes.string,
    completed: PropTypes.bool,
    creatingTime: PropTypes.instanceOf(Date),

    onDeleted: PropTypes.func.isRequired,
    onToggleCompleted: PropTypes.func.isRequired,
};

Task.defaultProps = {
    id: 7,
    description: 'Купить джип в Москве',
    completed: false,
    creatingTime: new Date(),
};
