import React, { useState, useEffect } from 'react';
import Moment from 'moment';
import { toast } from 'react-toastify';

import { TextField, Button, Box } from '@material-ui/core';

import { useParams } from 'react-router-dom';
import { useStyles } from './style';
import Menu from '../../components/Menu/menu';
import Footer from '../../components/footer';
import api from '../../services/api';

const tipos = [
  {
    value: '',
    label: '',
  },
  {
    value: 'C',
    label: 'Crédito',
  },
  {
    value: 'D',
    label: 'Débito',
  },
];

export default function Profile() {
  const classes = useStyles();

  const { idLancamento } = useParams();

  const [lancamento, setLancamento] = useState({
    data: '',
    conta: '',
    descricao: '',
    valor: '',
    tipo: '',
    updatedAt: '',
  });

  useEffect(() => {
    async function getLancamento() {
      const response = await api.get(`/lancamento/${idLancamento}`);

      setLancamento(response.data);
    }

    getLancamento();
  }, [idLancamento]);

  const handleInputChange = event => {
    lancamento[event.target.name] = event.target.value;
    setLancamento(lancamento);
  };

  const handleSubmit = event => {
    event.preventDefault();
    lancamento.updatedAt = new Date();
    api.put(`/lancamento/${idLancamento}`, lancamento);
    toast.success('Lançamento Atualizado');
  };

  return (
    <div className={classes.root}>
      <Menu />
      <form className={classes.formEdit} onSubmit={handleSubmit}>
        <span className={classes.titulo}>Atualização de lançamento</span>
        <TextField
          variant="outlined"
          margin="normal"
          onChange={handleInputChange}
          fullWidth
          id="date"
          label={Moment(lancamento.data).add(1, 'd').format('DD/MM/YYYY')}
          name="data"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          variant="outlined"
          margin="normal"
          onChange={handleInputChange}
          fullWidth
          id="conta"
          label={lancamento.conta}
          name="conta"
        />
        <TextField
          variant="outlined"
          margin="normal"
          onChange={handleInputChange}
          fullWidth
          id="descricao"
          label={lancamento.descricao}
          name="descricao"
        />
        <TextField
          variant="outlined"
          margin="normal"
          onChange={handleInputChange}
          fullWidth
          id="valor"
          label={lancamento.valor}
          name="valor"
        />
        <TextField
          variant="outlined"
          margin="normal"
          onChange={handleInputChange}
          select
          fullWidth
          id="tipo"
          label={lancamento.tipo === 'C' ? 'Crédito' : 'Débito'}
          name="tipo"
          SelectProps={{
            native: true,
          }}
        >
          {tipos.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Atualizar Lançamento
        </Button>
        <p className={classes.warning}>
          (Campos não alterados permaneceram como estão salvos)
        </p>
      </form>
      <Footer />
    </div>
  );
}
