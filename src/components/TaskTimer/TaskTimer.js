/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

import './TaskTimer.css';

export default class TaskTimer extends React.Component {
    constructor(props) {
        super(props);

        this.buttonRef = React.createRef();
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
        if (this.buttonRef.current.checked) {
            this.timerPlay();
        } else if (!this.buttonRef.current.checked) {
            this.timerPause();
        }
    }

    render() {
        const { minutes, seconds, id } = this.props;

        return (
            <div className="timer">
                <span>
                    min {minutes} sec {seconds}
                </span>
                
                <label className="custom-checkbox">
                    <input
                        ref={this.buttonRef}
                        id={id + 100000}
                        className="toggle-timer"
                        type="checkbox"
                        onChange={this.toggle.bind(this)}
                    />
                    <span className="custom-checkbox-switch" data-label-on="On" data-label-off="Off" />
                </label>
            </div>
        );
    }
}

TaskTimer.defaultProps = {
    id: 999999,
    minutes: 0,
    seconds: 5,
};
