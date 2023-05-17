/* eslint-disable spaced-comment */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-console */
/* eslint-disable quotes */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-plusplus */
import { Component } from 'react';

import TaskList from '../TaskList/TaskList';
import Footer from '../Footer/Footer';
import NewTaskForm from '../NewTaskForm/NewTaskForm';

import './todoApp.css';

export default class App extends Component {
    maxId = 0;

    constructor(props) {
        super(props);
        this.state = {
            arr: [],
            buttonName: 'All',
        };
    }

    deleteTask = (id) => {
        console.log('dcscsdcds');
        this.setState(({ arr }) => {
            const idx = arr.findIndex((el) => el.id === id);
            const newArray = [...arr.slice(0, idx), ...arr.slice(idx + 1)];

            return {
                arr: newArray,
            };
        });
    };

    addTask = (text) => {
        const newItem = this.addTaskArray(text);

        this.setState(({ arr }) => {
            const newArray = [...arr, newItem];

            return {
                arr: newArray,
            };
        });
    };

    onToggleCompleted = (id) => {
        this.setState(({ arr }) => {
            const idx = arr.findIndex((el) => el.id === id);

            const oldTask = arr[idx];
            const updateTask = { ...oldTask, completed: !oldTask.completed };

            const newArray = [...arr.slice(0, idx), updateTask, ...arr.slice(idx + 1)];

            return {
                arr: newArray,
            };
        });
    };

    onFilter = (buttonNamee) => {
        if (buttonNamee === 'Active') {
            this.setState({
                buttonName: 'Active',
            });
        } else if (buttonNamee === 'Completed') {
            this.setState({
                buttonName: 'Completed',
            });
        } else if (buttonNamee === 'All') {
            this.setState({ buttonName: 'All' });
        }
    };

    deleteCompleted = () => {
        this.setState(({ arr }) => {
            const newArr = arr.filter((el) => !el.completed);
            return {
                arr: newArr,
                completedArr: [],
            };
        });
    };

    setIntervalId = (idTask, intervalId) => {
        this.setState(({ arr }) => ({
            arr: arr.map((task) => {
                if (task.id === idTask) {
                    return {
                        ...task,
                        timer: {
                            ...task.timer,
                            intervalId,
                        },
                    };
                }
                return { ...task };
            }),
        }));
    };

    tick = (id) => {
        this.setState(({ arr }) => ({
            arr: arr.map((task) => {
                if (task.id === id) {
                    const { minutes, seconds, intervalId } = task.timer;

                    if (minutes === 0 && seconds === 0) {
                        clearInterval(intervalId);
                        return { ...task, timer: { ...task.timer, intervalId: null } };
                    }

                    return {
                        ...task,
                        timer: {
                            ...task.timer,
                            minutes: seconds ? minutes : minutes - 1,
                            seconds: seconds ? seconds - 1 : 59,
                        },
                    };
                }

                return { ...task };
            }),
        }));
    };

    editTask(id, text) {
        console.log('okeditTask');
        this.setState(({ arr }) => {
            const idx = arr.findIndex((el) => el.id === id);
            const el = arr[idx];
            el.description = text;
            const newArray = [...arr.slice(0, idx), el, ...arr.slice(idx + 1)];

            return {
                arr: newArray,
            };
        });
    }

    addTaskArray(dataTask) {
        const date = new Date();
        const obj = {
            description: dataTask.description,
            creatingTime: date,
            id: this.maxId,
            completed: false,
            minutes: dataTask.minutes,
            seconds: dataTask.seconds,
            timer: {
                minutes: dataTask.minutes,
                seconds: dataTask.seconds,
                intervalId: null,
            },
        };
        this.maxId++;

        return obj;
    }

    render() {
        const { arr } = this.state;
        const needToDone = arr.filter((el) => !el.completed).length;

        return (
            <section className="todoapp">
                <header className="header">
                    <h1>todos</h1>
                    <NewTaskForm onAddTask={this.addTask} />
                </header>
                <section className="main">
                    <TaskList
                        tasksFromServer={arr}
                        onDeleted={this.deleteTask}
                        onToggleCompleted={this.onToggleCompleted.bind(this)}
                        editTask={this.editTask.bind(this)}
                        buttonName={this.state.buttonName}
                        setIntervalId={this.setIntervalId.bind(this)}
                        tick={this.tick.bind(this)}
                    />
                    <Footer onFilter={this.onFilter} deleteCompleted={this.deleteCompleted} count={needToDone} />
                </section>
            </section>
        );
    }
}
