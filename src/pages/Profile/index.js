import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { TextField, Button, Box } from '@material-ui/core';

import { updateProfileRequest } from '../../store/modules/user/actions';
import { useStyles } from './style';
import Menu from '../../components/Menu/menu';
import Footer from '../../components/footer';

export default function Profile() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const [profile, setProfile] = useState({
    name: useSelector(state => state.user.profile.name),
    email: useSelector(state => state.user.profile.email),
  });

  const handleInputChange = event => {
    profile[event.target.name] = event.target.value;
    setProfile(profile);
  };

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(updateProfileRequest(profile));
  };

  return (
    <div className={classes.root}>
      <Menu />
      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          onChange={handleInputChange}
          fullWidth
          id="name"
          label="Nome completo"
          name="name"
          defaultValue={profile.name}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          onChange={handleInputChange}
          fullWidth
          id="email"
          label="Seu email"
          name="email"
          defaultValue={profile.email}
        />

        <hr />

        <TextField
          variant="outlined"
          margin="normal"
          onChange={handleInputChange}
          fullWidth
          id="oldPassword"
          label="Sua senha atual"
          name="oldPassword"
          type="password"
          defaultValue=""
        />
        <TextField
          variant="outlined"
          margin="normal"
          onChange={handleInputChange}
          fullWidth
          id="password"
          label="Sua nova senha"
          name="password"
          type="password"
          defaultValue=""
        />
        <TextField
          variant="outlined"
          margin="normal"
          onChange={handleInputChange}
          fullWidth
          id="confirmPassword"
          label="Confirmação de senha"
          name="confirmPassword"
          type="password"
          defaultValue=""
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Atualizar perfil
        </Button>
      </form>
      <Box pt={4}>
        <Footer />
      </Box>
    </div>
  );
}
