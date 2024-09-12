import React from "react";
import { Grid, Container, Button } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { useHistory } from "react-router-dom";

export default function CreateUser() {
  const history = useHistory();

  const onSubmit = () => {
    history.push("/dashboard");
  };
  return (
    <Container>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          User Create
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              id="description"
              name="description"
              label="Descripe something about yourself"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
            />
          </Grid>

          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={onSubmit}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
