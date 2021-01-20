import React, { useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Container,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  ButtonGroup,
  Chip,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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
    marginBottom: 20,
  },
  list: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  button: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function Dashboard() {
  const classes = useStyles();

  const [lancamentos, setLancamentos] = useState([]);
  const [totalizadores, setTotalizadores] = useState([]);
  const [year, setYear] = useState(new Date());
  const [selectMonth, setSelectMonth] = useState('01');

  useEffect(() => {
    async function loadLancamentos() {
      const response = await api.get(
        `lancamentos/${year.getFullYear()}-${selectMonth}`,
      );
      setLancamentos(response.data.Lancamentos);
      setTotalizadores(response.data.Totalizadores);
    }
    loadLancamentos();
  }, [selectMonth, year]);

  return (
    <div className={classes.root}>
      <Menu />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid>
              <Paper className={classes.paper}>
                <h3>Totalizadores</h3>
                <List className={classes.list}>
                  {totalizadores.map(totalizador => (
                    <ListItem key={totalizador.id}>
                      <ListItemText
                        primary={totalizador.conta}
                        secondary={
                          totalizador.valor > 0 ? (
                            <Chip
                              label={parseFloat(
                                totalizador.valor,
                              ).toLocaleString('pt-br', {
                                style: 'currency',
                                currency: 'BRL',
                              })}
                              color="primary"
                            />
                          ) : (
                            <Chip
                              label={parseFloat(
                                totalizador.valor,
                              ).toLocaleString('pt-br', {
                                style: 'currency',
                                currency: 'BRL',
                              })}
                              color="secondary"
                            />
                          )
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <DatePicker
                selected={year}
                onChange={date => setYear(date)}
                showYearPicker
                dateFormat="yyyy"
              />
              <div className={classes.button}>
                <ButtonGroup
                  variant="contained"
                  color="primary"
                  aria-label="contained primary button group"
                >
                  <Button onClick={() => setSelectMonth('01')}>Jan</Button>
                  <Button onClick={() => setSelectMonth('02')}>Fev</Button>
                  <Button onClick={() => setSelectMonth('03')}>Mar</Button>
                  <Button onClick={() => setSelectMonth('04')}>Abr</Button>
                  <Button onClick={() => setSelectMonth('05')}>Mai</Button>
                  <Button onClick={() => setSelectMonth('06')}>Jun</Button>
                  <Button onClick={() => setSelectMonth('07')}>Jul</Button>
                  <Button onClick={() => setSelectMonth('08')}>Ago</Button>
                  <Button onClick={() => setSelectMonth('09')}>Set</Button>
                  <Button onClick={() => setSelectMonth('10')}>Out</Button>
                  <Button onClick={() => setSelectMonth('11')}>Nov</Button>
                  <Button onClick={() => setSelectMonth('12')}>Dez</Button>
                </ButtonGroup>
              </div>
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
