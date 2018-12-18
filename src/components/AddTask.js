import React from 'react';
import TextField from '@material-ui/core/TextField';

export default function AddTask(props) {
  return (
    <div className="input-group mt-5 mb-3">
      <TextField
        id="outlined-full-width"
        label="Add a task"
        style={{ margin: 8 }}
        placeholder="Press enter after typing in the task"
        fullWidth
        margin="normal"
        variant="outlined"
        InputLabelProps={{
          shrink: true,
        }}
        value={props.input} 
        onChange={props.onAddChange}
        onKeyPress={props.onKeyPress}
    />
    </div>
  )
}
