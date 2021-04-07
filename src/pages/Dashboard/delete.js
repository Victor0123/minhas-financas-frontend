import React, { useState, useEffect } from 'react';
import Moment from 'moment';
import { toast } from 'react-toastify';

import { TextField, Button, Box } from '@material-ui/core';

import { useParams } from 'react-router-dom';
import { useStyles } from './style';
import Menu from '../../components/Menu/menu';
import Footer from '../../components/footer';
import api from '../../services/api';

export default function Profile() {
  const classes = useStyles();

  const { idLancamento } = useParams();

  const [lancamento, setLancamento] = useState({
    data: '',
    conta: '',
    descricao: '',
    valor: '',
    tipo: '',
  });

  useEffect(() => {
    async function getLancamento() {
      const response = await api.get(`/lancamento/${idLancamento}`);

      setLancamento(response.data);
    }

    getLancamento();
  }, [idLancamento]);

  const handleSubmit = event => {
    event.preventDefault();
    api.delete(`/lancamento/${idLancamento}`, lancamento);
    toast.success('Lançamento deletado');
  };

  return (
    <div className={classes.root}>
      <Menu />
      <form className={classes.formEdit} onSubmit={handleSubmit}>
        <span className={classes.titulo}>
          Tem certeza que deseja deletar este lançamento ?
        </span>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="date"
          label="Data"
          name="data"
          value={Moment(lancamento.data).add(1, 'd').format('DD/MM/YYYY')}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="conta"
          label="Conta"
          name="conta"
          value={lancamento.conta}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="descricao"
          label="Descrição"
          name="descricao"
          value={lancamento.descricao}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="valor"
          label="Valor Ex:99.99"
          name="valor"
          value={lancamento.valor}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="tipo"
          label="Tipo"
          name="tipo"
          value={lancamento.tipo}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Excluir Lançamento
        </Button>
      </form>
      <Footer />
    </div>
  );
}
