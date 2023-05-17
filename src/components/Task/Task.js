/* eslint-disable arrow-body-style */
/* eslint-disable spaced-comment */
/* eslint-disable import/no-named-as-default */
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
    constructor(props) {
        super(props);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.toggleSt = this.toggleSt.bind(this);
        this.editTask = this.editTask.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.state = {
            id: props.id,
            isEditing: false,
            isDeleted: false,
        };
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyDown);
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
        document.removeEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown(evt) {
        const { isEditing } = this.state;
        if (isEditing) {

            if (evt.key === 'Escape') {
                const newform = document.getElementById(this.state.id + 500);
                const oldDescription = document.getElementById(this.state.id + 200);
                const button = document.getElementById(this.state.id + 300);

                oldDescription.classList.remove('hidden-d');
                button.classList.remove('hidden-d');
                newform.remove();
                this.toggleSt();
            }
        }
    }

    handleClickOutside(evt) {
        const { isEditing } = this.state;
        if (isEditing) {

            const input = document.getElementById(this.state.id + 400);

            if (evt.target !== input && this.state.isEditing) {
                const newform = document.getElementById(this.state.id + 500);
                const oldDescription = document.getElementById(this.state.id + 200);
                const button = document.getElementById(this.state.id + 300);

                oldDescription.classList.remove('hidden-d');
                button.classList.remove('hidden-d');
                newform.remove();
                this.toggleSt();
            }
        }
    }

    toggleSt() {
        this.setState((prevState) => {
            return {
                isEditing: !prevState.isEditing,
            };
        });
    }

    editTask(id) {
        const { description, editTask } = this.props;

        const label = document.getElementById(id + 100);
        const oldDescription = document.getElementById(id + 200);
        const button = document.getElementById(id + 300);
        button.classList.add('hidden-d');

        oldDescription.classList.add('hidden-d');

        const newDescription = document.createElement('input');
        newDescription.id = id + 400;

        newDescription.classList.add('new-editing');

        const newform = document.createElement('form');
        newform.id = id + 500;
        newDescription.type = 'text';
        newDescription.value = description;

        newform.append(newDescription);
        label.prepend(newform);
        const descriptionToFocus = label.querySelector('.new-editing');
        descriptionToFocus.focus();

        // Здесь ловушка джокера тк state обновляется асинхронно то в условии беру
        //обратный state, но при нажатии на enter мне надо вернуть isEditing в false
        this.toggleSt();

        if (!this.state.isEditing) {
            newform.onsubmit = (evt) => {
                evt.preventDefault();
                editTask(id, newDescription.value);
                oldDescription.classList.remove('hidden-d');
                button.classList.remove('hidden-d');
                newform.remove();
                this.toggleSt();
                // this.toggleClass();
            };
        }
    }

    crossOut(id, evt) {
        this.props.onToggleCompleted(id);
        const li = document.getElementById(id);
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

    DeleteTask() {
        this.props.onDeleted(this.props.id);
        this.setState(({ isDeleted }) => {
            return {
                isDeleted: !isDeleted,
            };
        });
    }

    render() {
        const { description, creatingTime, completed, id, item, setIntervalId, tick } = this.props;
        const { minutes, seconds } = this.props.timer;
        let classNames = '';
        if (completed) {
            classNames += 'completed';
        }
        const timer = (
            <TaskTimer
                seconds={seconds !== '' ? seconds : 0}
                minutes={minutes !== '' ? minutes : 0}
                id={id}
                item={item}
                setIntervalId={setIntervalId}
                isDeleted={this.state.isDeleted}
                tick={tick}
            />
        );

        return (
            <li id={id} className={classNames}>
                <div className="view">
                    <input className="toggle " type="checkbox" onClick={(evt) => this.crossOut(id, evt)} />
                    <label id={id + 100} className="label">
                        <span id={id + 200} className="description" onClick={(evt) => this.crossOut(id, evt)}>
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
                    <button id={id + 300} className="icon icon-edit" onClick={() => this.editTask(id)} />
                    <button className="icon icon-destroy" onClick={() => this.DeleteTask()} />
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
    id: 999999,
    description: 'Купить джип в Москве или в другом культурном городе',
    completed: false,
    creatingTime: new Date(),
};
