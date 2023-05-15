/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import './NewTaskForm.css';

export default class NewTaskForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            description: '',
            seconds: '',
            minutes: '',
        };
    }
   

    onSubmit = (evt) => {
        evt.preventDefault();
        const { ...props } = this.state;
        const newLocal = this;
        newLocal.props.onAddTask(props);
        this.setState({
            description: '',
            seconds: '',
            minutes: '',
        });
    };

    onDescriptionChange = (evt) => {
        if (evt.target.name === 'description') {
            this.setState({
                description: evt.target.value,
            });
        }

        if (evt.target.name === 'minutes') {
            this.setState({
                minutes: evt.target.value,
            });
        }

        if (evt.target.name === 'seconds') {
            this.setState({
                seconds: evt.target.value,
            });
        }
    };

    render() {
        return (
            <form className="new-todo-form" onSubmit={this.onSubmit}>
                
                <input
                    className="new-todo"
                    onChange={this.onDescriptionChange}
                    value={this.state.description}
                    placeholder="What needs to be done?"
                    name="description"                    
                    autoFocus
                />
                <input
                    onChange={this.onDescriptionChange}
                    name="minutes"
                    value={this.state.minutes}
                    className="new-todo-form__timer"
                    placeholder="Min"
                    type="number"
                    min={0}
                    max={59}
                />
                <input
                    onChange={this.onDescriptionChange}
                    value={this.state.seconds}
                    className="new-todo-form__timer"
                    name="seconds"
                    placeholder="Sec"
                    type="number"
                    min={0}
                    max={59}
                />
                <button className="add" type="submit" variant="contained">
                    add task
                </button>
            </form>
        );
    }
}

NewTaskForm.defaultProps = {
    placeholder: 'What needs to be done?',
    title: 'Todos',
};
