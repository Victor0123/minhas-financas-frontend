import React, { useEffect, useState } from 'react';
import Moment from 'moment';

import {
  Box,
  Container,
  Grid,
  Table,
  TableBody,
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
  Modal,
  Fab,
  AppBar,
  Toolbar,
  TextField,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DatePicker from 'react-datepicker';
import {
  useStyles,
  StyledTableCell,
  StyledTableRow,
  getModalStyle,
} from './style';
import 'react-datepicker/dist/react-datepicker.css';

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

export default function Dashboard() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  const [lancamentos, setLancamentos] = useState([]);
  const [totalizadores, setTotalizadores] = useState([]);
  const [year, setYear] = useState(new Date());
  const [selectMonth, setSelectMonth] = useState('01');
  const [open, setOpen] = useState(false);
  const [campos, setCampos] = useState({
    data: '',
    valor: '',
    descricao: '',
    conta: '',
    tipo: '',
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = event => {
    campos[event.target.name] = event.target.value;
    setCampos(campos);
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    api.post('/lancamento', campos);
    const frm = document.getElementsByName('novo-lancamento')[0];
    frm.reset();
  };

  useEffect(() => {
    async function loadLancamentos() {
      const response = await api.get(
        `lancamentos/${year.getFullYear()}-${selectMonth}`,
      );
      setLancamentos(response.data.Lancamentos);
      setTotalizadores(response.data.Totalizadores);
    }
    loadLancamentos();
  }, [selectMonth, year, open]);

  const modalBody = (
    <div style={modalStyle} className={classes.modal}>
      <h2 id="simple-modal-title">Novo lançamento</h2>
      <form
        name="novo-lancamento"
        onSubmit={handleFormSubmit}
        className={classes.form}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="data"
          name="data"
          label="Data"
          type="date"
          onChange={handleInputChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <br />
        <TextField
          id="valor"
          name="valor"
          label="Valor"
          placeholder="Ex: 99.99"
          onChange={handleInputChange}
          variant="outlined"
        />
        <br />
        <TextField
          id="descricao"
          name="descricao"
          label="Descrição"
          placeholder="Ex: Pagamento Netflix"
          onChange={handleInputChange}
          variant="outlined"
        />
        <br />
        <TextField
          id="conta"
          name="conta"
          label="Conta"
          placeholder="Ex: Itau"
          onChange={handleInputChange}
          variant="outlined"
        />
        <br />
        <TextField
          id="tipo"
          name="tipo"
          select
          label="Tipo"
          onChange={handleInputChange}
          SelectProps={{
            native: true,
          }}
          helperText="Selecione o tipo do lançamento"
          variant="outlined"
        >
          {tipos.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
        <br />
        <Button type="submit" color="primary" variant="contained">
          Enviar
        </Button>
      </form>
    </div>
  );

  return (
    <div className={classes.root}>
      <Menu />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12} className={classes.tableBar}>
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
              <div>
                <Fab
                  color="primary"
                  aria-label="add"
                  className={classes.buttonAdd}
                >
                  <AddIcon onClick={handleOpen} />
                </Fab>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                >
                  {modalBody}
                </Modal>
              </div>
            </Grid>
            <Grid item xs={12}>
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Data</StyledTableCell>
                      <StyledTableCell align="center">Conta</StyledTableCell>
                      <StyledTableCell align="center">
                        Descrição
                      </StyledTableCell>
                      <StyledTableCell align="right">Valor</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {lancamentos.map(lancamento => (
                      <StyledTableRow key={lancamento.id}>
                        <StyledTableCell component="th" scope="row">
                          {Moment(lancamento.data).format('DD/MM/YYYY')}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {lancamento.conta}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {lancamento.descricao}
                        </StyledTableCell>
                        <StyledTableCell align="right">
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
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid>
              <AppBar className={classes.appBar}>
                <Toolbar>
                  <List className={classes.list}>
                    {totalizadores.map(totalizador => (
                      <ListItem key={totalizador.conta}>
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
                </Toolbar>
              </AppBar>
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
