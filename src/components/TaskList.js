import React from 'react';
import TaskItem from './TaskItem';

export default function TaskList(props) {
  return (
    <ul id="todo-list">
      {props.tasks.map((task) => (
        <TaskItem 
          task={task}
          onChecked={props.onChecked}
          onRemoveItem={props.onRemoveItem}
          />
      ))}
    </ul>
  )
}