import React from "react";
import Task from "../Task/Task";
import "./TaskList.css"
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
//import { el } from "date-fns/locale";
const TaskList = ( {tasksFromServer,onDeleted,onToggleCompleted}) => {


   
   const tasks = tasksFromServer.map((item) => {

     const {id} = item;
      
      return (
        
              <Task {...item}
               onDeleted={()=>onDeleted(id)}
            onToggleCompleted={()=>onToggleCompleted(id)}/>
              
      
      );
   });

   return (
      <ul className="todo-list">
         {tasks}
      </ul>
   );
}

export default TaskList;