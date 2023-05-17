/* eslint-disable spaced-comment */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-plusplus */
import { Component } from 'react';
import './TaskTimer.css';

export default class TaskTimer extends Component {
    constructor(props) {
        super(props);
        this.state = { toggle: 'start' };
    }

    componentDidUpdate(prevProps) {
        const { item } = this.props;
        const { minutes, seconds } = item.timer;
        const { item: prevTask } = prevProps;
        const { minutes: prevMin, seconds: prevSec } = prevTask.timer;

        if (minutes !== prevMin || seconds !== prevSec) {
            if (minutes <= 0 && seconds <= 0) this.timerPause();
        }
    }

    timerPlay = () => {
        const { tick, item, setIntervalId } = this.props;
        const { minutes, seconds, intervalId } = item.timer;

        if (!intervalId && !(minutes <= 0 && seconds <= 0)) {
            const id = setInterval(() => tick(item.id), 1000);
            setIntervalId(item.id, id);
        }
    };

    timerPause = () => {
        const { item, setIntervalId } = this.props;
        clearInterval(item.timer.intervalId);
        setIntervalId(item.id, null);
    };

    toggle() {
        const button = document.getElementById(this.props.id + 100000);
        const { toggle } = this.state;

        if (toggle === 'start') {
            this.setState({
                toggle: 'stop',
            });
            button.innerText = 'stop';
            this.timerPlay();
        } else if (toggle === 'stop') {
            this.setState({
                toggle: 'start',
            });
            button.innerText = 'start';
            this.timerPause();
        }
    }

    render() {
        const { minutes, seconds } = this.props;
        
        return (
            <div className="timer">
                <span>
                    minutes {minutes} seconds {seconds}
                </span>
                <button
                    id={this.props.id + 100000}
                    className="toggle-timer"
                    type="button"
                    onClick={this.toggle.bind(this)}
                >
                    Start
                </button>
            </div>
        );
    }
}

TaskTimer.defaultProps = {
    id: 999999,
    minutes: 0,
    seconds: 5,
};
