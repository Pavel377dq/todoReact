import { Component } from 'react';
import './TaskTimer.css';

export default class TaskTimer extends Component {
    constructor(props) {
        super(props);

        const { minutes, seconds } = this.props;

        this.timerDate = new Date();
        this.count = 0;
        this.subtrahend = new Date(
            this.timerDate.getFullYear(),
            this.timerDate.getMonth(),
            this.timerDate.getDate(),
            this.timerDate.getHours(),
            0,
            0
        );
        this.deadline = new Date(
            this.timerDate.getFullYear(),
            this.timerDate.getMonth(),
            this.timerDate.getDate(),
            this.timerDate.getHours(),
            minutes,
            seconds
        );
        this.state = { minutes: minutes, seconds: seconds, toggle: 'start' };
    }

    componentDidMount() {}

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        if (this.state.minutes === 0 && this.state.seconds === 0) {
            clearInterval(this.timerID);
            return;
        }

        this.count++;
        this.setState({
            minutes: Math.floor((this.deadline - this.subtrahend - this.count * 1000) / (1000 * 60)),
            seconds: Math.floor((this.deadline - this.subtrahend - this.count * 1000) / 1000) % 60,
        });
    }

    toggle(evt) {
        evt.preventDefault();
        const button = document.querySelector('.toggle-timer');

        if (this.state.toggle === 'start') {
            this.setState({
                toggle: 'stop',
            });
            button.innerText = 'stop';
            this.timerID = setInterval(() => this.tick(), 1000);
        } else if (this.state.toggle === 'stop') {
            this.setState({
                toggle: 'start',
            });
            button.innerText = 'Go';

            clearInterval(this.timerID);
        }
    }

    render() {
        return (
            <div className="timer">
                <span>
                    minutes {this.state.minutes} seconds {this.state.seconds}
                </span>
                <button className="toggle-timer" onClick={(e) => this.toggle(e)}>
                    Go
                </button>
            </div>
        );
    }
}
