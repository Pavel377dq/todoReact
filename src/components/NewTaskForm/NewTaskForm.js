import React, { Component } from 'react';
import './NewTaskForm.css';

export default class NewTaskForm extends Component {
    state = {
        description: '',
        seconds: '',
        minutes: ''
    };

    onSubmit = (evt) => {
        console.log('ok')
        evt.preventDefault();
        this.props.onAddTask(this.state.description);
        this.setState({
            description: '',
            seconds: '',
            minutes: ''
        });
    };

    onDescriptionChange = (evt) => {
        if(evt.target.name ==='description'){
        this.setState({
            description: evt.target.value,
        });
    }
    };

    onSecondsChange = (evt) => {
        this.setState({
            seconds: evt.target.value,
        });
    };

    onMinutesChange = (evt) => {
        this.setState({
            minutes: evt.target.value,
        });
    };

    render() {
        return (
            <form className="new-todo-form" onSubmit={this.onSubmit}>
                
                <input onChange={this.onMinutesChange} value={this.state.minutes} className="new-todo-form__timer" placeholder="Min"  />
                <input  onChange={this.onSecondsChange}  value={this.state.seconds}    className="new-todo-form__timer"   placeholder="Sec"  />
                <button type="submit" variant="contained" >
              Add
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
