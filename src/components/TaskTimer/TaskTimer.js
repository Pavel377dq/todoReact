import { Component } from 'react';
import './TaskTimer.css'


export default class TaskTimer extends Component {
    constructor(props) {
        super(props);
        //this.count = this.count.bind(this)
        this.timerDate = new Date()
        this.count =0;
        this.subtrahend = new Date(this.timerDate.getFullYear(),this.timerDate.getMonth(),this.timerDate.getDate(),this.timerDate.getHours(),0,0)
        this.deadline= new Date(this.timerDate.getFullYear(),this.timerDate.getMonth(),this.timerDate.getDate(),this.timerDate.getHours(),9,7);
        this.state = { minutes:null,
        seconds:null,
        toggle: 'start'
      };

        
    }


    componentDidMount() {
        
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }


    tick() {
      if(this.state.minutes === 0 && this.state.seconds ===0){
        clearInterval(this.timerID);
        return
      }

      this.count++
        this.setState({
            minutes: Math.floor((this.deadline - this.subtrahend - this.count*1000)/(1000*60)),
            seconds: Math.floor((this.deadline  - this.subtrahend -  this.count*1000)/1000)%60
        
        });
      
    }

    toggle(evt){
      console.log('yes');
      evt.preventDefault();
      const button = document.querySelector('.toggle-timer');

      if(this.state.toggle ==='start'){
        this.setState({
          toggle: 'stop'
        })
        button.innerText = 'Стоп'
        this.timerID = setInterval(() => this.tick(), 1000)

      }
      else if(this.state.toggle === 'stop'){
        this.setState({
          toggle: 'start'
        })
        button.innerText = 'Старт'

        clearInterval(this.timerID);
      }
    }

    render() {
        return (
            <div className='timer'>
                <h1>Привет, мир!</h1>
                <h2>Минут {this.state.minutes} секунд {this.state.seconds}.</h2>
                <button className='toggle-timer' onClick={(e) =>this.toggle(e)}>Запустить</button>
            </div>
        );
    }
}
