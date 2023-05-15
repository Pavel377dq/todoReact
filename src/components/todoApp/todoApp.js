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

    constructor(props){
        super(props);
        this.state = {
            arr: [],
            completedArr: [],
            activeArr: [],
            buttonName: 'All',
        };
    }
   

    deleteTask = (id) => {
        console.log("dcscsdcds");
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
            this.setState(({ arr }) => {
                const newArr = arr.filter((el) => !el.completed);
                return {
                    activeArr: newArr,
                    buttonName: 'Active',
                };
            });
        } else if (buttonNamee === 'Completed') {
            this.setState(({ arr }) => {
                const newArr = arr.filter((el) => el.completed);

                return {
                    completedArr: newArr,
                    buttonName: 'Completed',
                };
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

    editTask(id, text) {
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
        return {
            description: dataTask.description,
            creatingTime: date,
            id: this.maxId++,
            completed: false,
            minutes: dataTask.minutes,
            seconds: dataTask.seconds,
        };
    }

    saveTime(id,minutes,seconds){
        if(this.state.arr.length !==0 &&  this.state.arr.findIndex((el) => el.id === id)){
        this.setState(({ arr }) => {
            const idx = arr.findIndex((el) => el.id === id);
            const el = arr[idx];

            el.minutes = minutes;
            el.seconds = seconds;
            const newArray = [...arr.slice(0, idx), el, ...arr.slice(idx + 1)];

            return {
                arr: newArray,
            };
        });
    }
    }

    render() {
        const { arr, activeArr, completedArr} = this.state;
        const needToDone = arr.filter((el) => !el.completed).length;

        let todoArr;
        const { buttonName } = this.state;
        if (buttonName === 'All') {
            todoArr = arr;
        } else if (buttonName === 'Active') {
            todoArr = activeArr;
        } else if (buttonName === 'Completed') {
            todoArr = completedArr;
        }

        return (
            <section className="todoapp">
                <header className="header">
                    <h1>todos</h1>
                    <NewTaskForm onAddTask={this.addTask} />
                </header>
                <section className="main">
                    <TaskList
                        tasksFromServer={todoArr}
                        onDeleted={this.deleteTask}
                        onToggleCompleted={this.onToggleCompleted.bind(this)}
                        editTask={this.editTask.bind(this)}
                        saveTime={this.saveTime.bind(this)}
                    />
                    <Footer onFilter={this.onFilter} deleteCompleted={this.deleteCompleted} count={needToDone} />
                </section>
            </section>
        );
    }
}
