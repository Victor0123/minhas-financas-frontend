import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Avatar,
  Button,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  CircularProgress,
  CssBaseline,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { signUpRequest } from '../../store/modules/auth/actions';
import { useStyles } from './style';
import Footer from '../../components/footer';

export default function SignUp() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  const contrycode = '+55';
  const [signUp, setSignUp] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  });

  const handleInputChange = event => {
    signUp[event.target.name] = event.target.value;
    setSignUp(signUp);
  };

  const handleSubmit = event => {
    event.preventDefault();
    const { name, email, password } = signUp;
    const phone = contrycode + signUp.phone;
    dispatch(signUpRequest(name, email, password, phone));
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Cadastro
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="name"
                variant="outlined"
                required
                onChange={handleInputChange}
                fullWidth
                id="name"
                label="Nome completo"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                onChange={handleInputChange}
                fullWidth
                id="email"
                label="Email"
                name="email"
                type="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                onChange={handleInputChange}
                fullWidth
                name="password"
                label="Senha"
                type="password"
                id="password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                onChange={handleInputChange}
                fullWidth
                name="phone"
                label="Telefone"
                id="phone"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {loading ? <CircularProgress color="secondary" /> : 'Cadastrar'}
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/" variant="body2">
                Já possui uma conta? Logar
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Footer />
      </Box>
    </Container>
  );
}
