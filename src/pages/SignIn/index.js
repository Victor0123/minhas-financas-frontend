import React, { useState } from 'react';
import {
  Avatar,
  Button,
  TextField,
  Box,
  Typography,
  Container,
  Link,
  Grid,
  CssBaseline,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { useStyles } from './style';
import Footer from '~/components/footer';

export default function SignIn() {
  const classes = useStyles();

  const [signin, setSignin] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = event => {
    signin[event.target.name] = event.target.value;
    setSignin(signin);
  };

  const handleSubmit = event => {
    event.preventDefault();
    console.log(signin);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            onChange={handleInputChange}
            fullWidth
            id="email"
            label="Digite seu email"
            name="email"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            onChange={handleInputChange}
            fullWidth
            name="password"
            label="Digite sua senha"
            type="password"
            id="password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Entrar
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="/" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/register" variant="body2">
                Ainda não tem uma conta?
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Footer />
      </Box>
    </Container>
  );
}