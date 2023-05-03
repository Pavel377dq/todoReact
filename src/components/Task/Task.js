import React,{Component} from "react";
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import KG from 'date-fns/locale/en-AU';
export default class Task extends Component {
 
  

    render(){  

        const { description,id, creatingTime, onDeleted ,onToggleCompleted,completed} = this.props;
   
    let classNames = ''
    if(completed){
        classNames+='completed'
    }
    
    return (

        <li key = {id} className={classNames}>

            <div  className="view">
             <input className="toggle " type="checkbox" onClick = {onToggleCompleted} />
        <label>
         <span  className='description' onClick = {onToggleCompleted}>{description}</span>
         <span  className="created">
         {`created ${formatDistanceToNow(creatingTime, {
                includeSeconds: true,
                locale: KG,
                addSuffix: true,
              })}`}</span>
   </label>


   <button  className="icon icon-edit"></button>
              <button key = {id} className="icon icon-destroy" onClick={onDeleted}></button>
         </div>
         </li>
   );
    }


}

