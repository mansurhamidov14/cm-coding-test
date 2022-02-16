import { Button, Container, Grid, TextField } from '@mui/material';
import { signIn } from 'next-auth/react';
import React from 'react';

const SignIn: React.FC = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const submitForm = React.useCallback((e: any) => {
    e.preventDefault();
    signIn("credentials", { username, password });
  }, [username, password])

  return (
    <form onSubmit={submitForm}>
      <Container>
        <Grid margin={1} flexDirection="row" container justifyContent="center">
          <Grid item sm={6} lg={4} xl={3}>
            <TextField fullWidth value={username} label="Username" variant="outlined" onChange={e => setUsername(e.target.value)} />
          </Grid>
        </Grid>
        <Grid margin={1} container justifyContent="center">
          <Grid item sm={6} lg={4} xl={3}>
            <TextField
              fullWidth
              value={password}
              label="Password"
              type="password"
              variant="outlined"
              onChange={e => setPassword(e.target.value)}
            />
          </Grid>
        </Grid>
        <Grid margin={1} container justifyContent="center">
          <Grid item sm={6} lg={4} xl={3}>
            <Button variant="contained" type="submit">Sign in</Button>
          </Grid>
        </Grid>
      </Container>
    </form>
  )
};

export default SignIn;
