import React from 'react';
import TaskItem from './TaskItem';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

export default function TaskList(props) {
  return (
    <TransitionGroup component="ul" className="todo-list">
      {props.tasks.map((task) => (
        <CSSTransition classNames="order" key={task.name} timeout={{ enter: 250, exit: 500}}>
          <TaskItem 
            task={task}
            onChecked={props.onChecked}
            onRemoveItem={props.onRemoveItem}
            />
        </CSSTransition>
      ))}
    </TransitionGroup>
  )
}