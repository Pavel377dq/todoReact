import React, { Component } from 'react';
import './NewTaskForm.css';

export default class NewTaskForm extends Component {
    state = {
        description: '',
        seconds: '',
        minutes: '',
    };

    onSubmit = (evt) => {
        evt.preventDefault();
        const { ...props } = this.state;
        this.props.onAddTask(props);
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
                    onChange={this.onDescriptionChange}
                    name="minutes"
                    value={this.state.minutes}
                    className="new-todo-form__timer"
                    placeholder="Min"
                />
                <input
                    onChange={this.onDescriptionChange}
                    value={this.state.seconds}
                    className="new-todo-form__timer"
                    name="seconds"
                    placeholder="Sec"
                />
                <button type="submit" variant="contained">
                    Add Task
                </button>
                <input
                    className="new-todo"
                    onChange={this.onDescriptionChange}
                    value={this.state.description}
                    placeholder="What needs to be done?"
                    name="description"
                    autoFocus
                />
            </form>
        );
    }
}

NewTaskForm.defaultProps = {
    placeholder: 'What needs to be done?',
    title: 'Todos',
};
