import React, { useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { Chip, List, ListItem, ListItemText } from '@material-ui/core';
import Menu from '../../components/menu';
import Footer from '../../components/footer';
import api from '../../services/api';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  title: {
    flexGrow: 1,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  list: {
    width: '100%',
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function Dashboard() {
  const classes = useStyles();

  const [lancamentos, setLancamentos] = useState([]);
  const [totalizadores, setTotalizadores] = useState([]);

  useEffect(() => {
    async function loadLancamentos() {
      const response = await api.get('lancamentos/2020-06');
      setLancamentos(response.data.Lancamentos);
      setTotalizadores(response.data.Totalizadores);
    }
    loadLancamentos();
  }, []);

  return (
    <div className={classes.root}>
      <Menu />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={2}>
            <Grid>
              <Paper className={classes.paper}>
                <h3>Totalizadores</h3>
                <List className={classes.list}>
                  {totalizadores.map(totalizador => (
                    <ListItem key={totalizador.id}>
                      <ListItemText
                        primary={totalizador.conta}
                        secondary={parseFloat(totalizador.valor).toLocaleString(
                          'pt-br',
                          {
                            style: 'currency',
                            currency: 'BRL',
                          },
                        )}
                      />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Data</TableCell>
                      <TableCell align="center">Conta</TableCell>
                      <TableCell align="center">Descrição</TableCell>
                      <TableCell align="right">Valor</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {lancamentos.map(lancamento => (
                      <TableRow key={lancamento.id}>
                        <TableCell component="th" scope="row">
                          {new Date(lancamento.data).toLocaleDateString(
                            'pt-br',
                          )}
                        </TableCell>
                        <TableCell align="center">{lancamento.conta}</TableCell>
                        <TableCell align="center">
                          {lancamento.descricao}
                        </TableCell>
                        <TableCell align="right">
                          {lancamento.tipo === 'C' ? (
                            <Chip
                              label={parseFloat(
                                lancamento.valor,
                              ).toLocaleString('pt-br', {
                                style: 'currency',
                                currency: 'BRL',
                              })}
                              color="primary"
                            />
                          ) : (
                            <Chip
                              label={parseFloat(
                                lancamento.valor,
                              ).toLocaleString('pt-br', {
                                style: 'currency',
                                currency: 'BRL',
                              })}
                              color="secondary"
                            />
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
          <Box pt={4}>
            <Footer />
          </Box>
        </Container>
      </main>
    </div>
  );
}
