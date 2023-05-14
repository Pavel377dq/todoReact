import { Component } from 'react';

import TaskList from '../TaskList/TaskList';
import Footer from '../Footer/Footer';
import NewTaskForm from '../NewTaskForm/NewTaskForm';

import './todoApp.css';

export default class App extends Component {
    maxId = 0;

    state = {
        arr: [
          
        ],
        completedArr: [],
        activeArr: [],
        buttonName: 'All',
    };

    deleteTask = (id) => {
        this.setState(({ arr }) => {
            const idx = arr.findIndex((el) => el.id === id);
            const newArray = [...arr.slice(0, idx), ...arr.slice(idx + 1)];

            return {
                arr: newArray,
            };
        });
    };


   
    editTask(id,text){
        this.setState(({ arr }) => {
            const idx = arr.findIndex((el) => el.id === id);
            const el = arr[idx];
            el.description = text;
            const newArray = [...arr.slice(0, idx),el, ...arr.slice(idx + 1)];

            return {
                arr: newArray,
            };
        });
    
        console.log(this.state.arr)
    }
    addTaskArray(dataTask) {
        const date = new Date();
        return {
            description: dataTask.description,
            creatingTime: date,
            id: this.maxId++,
            completed: false,
            minutes: dataTask.minutes,
            seconds: dataTask.seconds
        };
    }

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

    render() {
        const needToDone = this.state.arr.filter((el) => !el.completed).length;

        let todoArr;
        const { buttonName } = this.state;
        if (buttonName === 'All') {
            todoArr = this.state.arr;
        } else if (buttonName === 'Active') {
            todoArr = this.state.activeArr;
        } else if (buttonName === 'Completed') {
            todoArr = this.state.completedArr;
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
                    />
                    <Footer onFilter={this.onFilter} deleteCompleted={this.deleteCompleted} count={needToDone} />
                </section>
            </section>
        );
    }
}
