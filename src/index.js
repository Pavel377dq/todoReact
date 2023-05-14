import ReactDOM from 'react-dom';

import App from './components/todoApp/todoApp';
import TaskTimer from './components/TaskTimer/TaskTimer';
import './index.css';


ReactDOM.render(<TaskTimer />, document.getElementById('root2'));
ReactDOM.render(<App />, document.getElementById('root'));


