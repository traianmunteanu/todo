import React from 'react';

export default function TaskItem(props) {
  return (
    <div className="card mb-4">
      <li className="card-body todo-item">
        <label className="custom-control material-checkbox"
          htmlFor={props.task.name}
          style={props.task.done ? {textDecoration: 'line-through'} : {textDecoration: 'initial'}}
        >
          <input 
            type="checkbox" 
            className="material-control-input"
            name={props.task.name} 
            id={props.task.name}
            checked={props.task.done}
            onChange={() => props.onChecked(props.task.name)}
            />
            <span className="material-control-indicator"></span>
            <span className="material-control-description">
              {props.task.name}
            </span>
          <button 
            type="button" className="close" aria-label="Close"
            onClick={() => props.onRemoveItem(props.task)} >
              &times;
          </button>
        </label>
      </li>
    </div>
  )
}
