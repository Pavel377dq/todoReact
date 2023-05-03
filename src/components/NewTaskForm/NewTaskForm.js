import React, {Component} from "react";
import "./NewTaskForm.css"
export default class NewTaskForm extends Component {
 
   state = {
      description :''
   }

   onSubmit = (evt)=>{
      evt.preventDefault();
       this.props.onAddTask(this.state.description);
       this.setState({
         description: ''
       })
   }

   onDescriptionChange = (evt) => {
      this.setState({
         description: evt.target.value
      })
   }

   render(){
    return (
      <form onSubmit = {this.onSubmit}>
         <input className="new-todo" onChange={this.onDescriptionChange} value={this.state.description} placeholder="What needs to be done?" autoFocus />
        
      </form>
   );
    }


}

