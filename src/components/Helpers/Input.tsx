import React from "react";
import { TextField, Grid, InputAdornment, IconButton } from "@material-ui/core"; 

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
function Input({ name, label, type, required, handleChange }: any) {
    return (
        <Grid item xs={12}>
            <TextField
            variant="outlined"
            margin="normal"
            required={required}
            onChange={handleChange}
            fullWidth
            type={type}
            label={label}
            name={name}
            autoComplete={name}
            autoFocus
          />
        </Grid>
    );
}


export default Input;