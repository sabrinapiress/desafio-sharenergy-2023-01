import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { createTheme, withStyles, ThemeProvider } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button, InputAdornment, TableHead, TextField } from '@material-ui/core';
import { indigo, red } from '@material-ui/core/colors';
import { useStyles } from './styled';
import TablePaginationActions from "./TablePaginationActions"
import { useGlobal } from '../../global/GlobalContext';
import Modal from '@material-ui/core/Modal';
import CrudForm from '../CrudForm/CrudForm';
import SearchIcon from '@material-ui/icons/Search';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';

export default function CustomPaginationActionsTable() {
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [search, setSearch] = useState("");
    const [rows, setRows] = useState([]);
    const [open, setOpen] = useState(false);
    const [showFilterList, setShowFilterList] = useState(false);
    const [matches, setMatches] = useState(
        window.matchMedia("(min-width: 768px)").matches
    )
    const { states, setters } = useGlobal();

    useEffect(() => {
        getUser()
    }, [rows])


    useEffect(() => {
        window
            .matchMedia("(min-width: 768px)")
            .addEventListener('change', e => setMatches(e.matches));
    }, []);
    
    const token = localStorage.getItem('token')

    const getUser = async () => {
        try {
            const res = await fetch("http://localhost:1337/crud/all", {
                method: 'PATCH',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': token
                }

            })
            const data = await res.json();
            setRows(data.response)
        } catch (err) {
            console.log(err)
        }
    }

    TablePaginationActions.propTypes = {
        count: PropTypes.number.isRequired,
        onPageChange: PropTypes.func.isRequired,
        page: PropTypes.number.isRequired,
        rowsPerPage: PropTypes.number.isRequired,
    };

    const theme = createTheme({
        palette: {
            primary: indigo,
            secondary: red,
        },
    });

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows?.length - page * rowsPerPage);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleOpen = (row, show) => {
        setOpen(true);
        switch (show) {
            case 'view':
                setters.setShowEditForm(false)
                break;
            case 'edit':
                setters.setShowEditForm(true)
                break;
            default:
                console.log(`Sorry, we are out of ${show}.`);
        }
        setters.setName(row.name)
        setters.setEmail(row.email)
        setters.setCellphone(row.cellphone)
        setters.setAddress(row.address)
        setters.setCpf(row.cpf)
        setters.setId(row._id)

    };

    const handleClose = () => {
        setOpen(false);
        setters.setName('')
        setters.setEmail('')
        setters.setCellphone('')
        setters.setAddress('')
        setters.setCpf('')
    };

    function rand() {
        return Math.round(Math.random() * 20) - 10;
    }

    function getModalStyle() {
        const top = 50 + rand();
        const left = 50 + rand();
        return {
            top: `${top}%`,
            left: `${left}%`,
            transform: `translate(-${top}%, -${left}%)`,
        };
    }

    const [modalStyle] = useState(getModalStyle);

    const deleteUser = async (row) => {
        try {
            const id = String(row._id)
            const res = await fetch(`http://localhost:1337/crud/delete?id=${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': token
                }
            })
            await res.json();
            alert(`Usuário deletado!`)
        } catch (err) {
            console.log(err)
        }
    }

    const bodyViewUser = (
        <div style={modalStyle} className={classes.papermodal}>
            <h2 id="simple-modal-title">Informações do usuário</h2>
            <p id="name">
                <span className={classes.infos}>Nome:</span> {states.name}
            </p>
            <p id="email">
                <span className={classes.infos}>Email:</span> {states.email}
            </p>
            <p id="cpf">
                <span className={classes.infos}>CPF:</span> {states.cpf}
            </p>
            <p id="address">
                <span className={classes.infos}>Endereço:</span> {states.address}
            </p>
            <p id="cellphone">
                <span className={classes.infos}>Telefone:</span> {states.cellphone}
            </p>
        </div>
    )

    const bodyEditUser = (
        <div style={modalStyle} className={classes.papermodal}>
            <CrudForm title={'EDITAR'} handleClose={handleClose} />
        </div>
    )

    const filterCode = useMemo(() => {
        return rows
            .filter((value) => {
                const name = value.name.toLocaleLowerCase().includes(search)
                const email = value.email.toLocaleLowerCase().includes(search)
                if (name || email) {
                    return value
                }
            })
    }, [search])

    return (
        <div>
            <TextField
                id="outlined-basic"
                variant="outlined"
                style={{ marginTop: 20 }}
                label="Buscar"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                fullWidth
                onClick={() => setShowFilterList(true)}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon color='disabled' />
                        </InputAdornment>
                    ),
                }}
            />
            <TableContainer className={classes.paper} component={Paper}>
                {matches && (
                    <Table className={classes.table} aria-label="custom pagination table">
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.tablecell}>Clientes</TableCell>
                                <TableCell className={classes.tablecell} align="center">Infos</TableCell>
                                <TableCell className={classes.tablecell} align="center">Visualizar</TableCell>
                                <TableCell className={classes.tablecell} align="center">Editar</TableCell>
                                <TableCell className={classes.tablecell} align="center">Deletar</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {showFilterList === true ?
                                <ThemeProvider theme={theme}>
                                    {(rowsPerPage > 0
                                        ? filterCode?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        : filterCode
                                    ).map((row) =>
                                        <TableRow key={row.name}>
                                            <TableCell component="th" scope="row">
                                                <p style={{ fontWeight: 'lighter' }}>{row.name}</p>
                                            </TableCell>
                                            <TableCell style={{ width: 160 }} align="center">
                                                <p style={{ fontSize: 11, color: 'grey' }}>{row.email} {row.cellphone}</p>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Button variant="contained" color="primary" onClick={() => handleOpen(row, 'view')}>Vizualizar
                                                </Button>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Button variant="contained" className={classes.btnedit} onClick={() => handleOpen(row, "edit")}>Editar</Button>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Button variant="contained" color="secondary" onClick={() => deleteUser(row)}>
                                                    Deletar
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                    {emptyRows > 0 && (
                                        <TableRow style={{ height: 53 * emptyRows }}>
                                            <TableCell colSpan={6} />
                                        </TableRow>
                                    )}
                                </ThemeProvider>
                                :
                                <ThemeProvider theme={theme}>
                                    {(rowsPerPage > 0
                                        ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        : rows
                                    ).map((row) =>
                                        <TableRow key={row.name}>
                                            <TableCell component="th" scope="row">
                                                <p style={{ fontWeight: 'lighter' }}>{row.name}</p>
                                            </TableCell>
                                            <TableCell style={{ width: 160 }} align="center">
                                                <p style={{ fontSize: 11, color: 'grey' }}>{row.email} {row.cellphone}</p>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Button variant="contained" color="primary" onClick={() => handleOpen(row, 'view')}>Vizualizar
                                                </Button>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Button variant="contained" className={classes.btnedit} onClick={() => handleOpen(row, "edit")}>Editar</Button>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Button variant="contained" color="secondary" onClick={() => deleteUser(row)}>
                                                    Deletar
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                    {emptyRows > 0 && (
                                        <TableRow style={{ height: 53 * emptyRows }}>
                                            <TableCell colSpan={6} />
                                        </TableRow>
                                    )}
                                </ThemeProvider>
                            }
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25, { label: 'Todos', value: -1 }]}
                                    colSpan={3}
                                    count={rows.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    SelectProps={{
                                        inputProps: { 'aria-label': 'Resultados por página' },
                                        native: true,
                                    }}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                    ActionsComponent={TablePaginationActions}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>)}
                {!matches && (
                    <Table className={classes.smalltable} aria-label="custom pagination table">
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.tablecell}>Clientes</TableCell>
                                <TableCell className={classes.tablecell} align="center">Visualizar</TableCell>
                                <TableCell className={classes.tablecell} align="center">Editar</TableCell>
                                <TableCell className={classes.tablecell} align="center">Deletar</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {showFilterList === true ?
                                <ThemeProvider theme={theme}>
                                    {(rowsPerPage > 0
                                        ? filterCode.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        : filterCode
                                    ).map((row) =>
                                        <TableRow key={row.name}>
                                            <TableCell component="th" scope="row">
                                                <p style={{ fontWeight: 'lighter' }}>{row.name}</p>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Button variant="contained" color="primary" onClick={() => handleOpen(row, 'view')}> <VisibilityIcon /></Button>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Button variant="contained" className={classes.btnedit} onClick={() => handleOpen(row, "edit")}><EditIcon /></Button>
                                            </TableCell>
                                            <TableCell align="center"> 
                                                <Button variant="contained" color="secondary" onClick={() => deleteUser(row)}><DeleteForeverIcon /></Button>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                    {emptyRows > 0 && (
                                        <TableRow style={{ height: 53 * emptyRows }}>
                                            <TableCell colSpan={6} />
                                        </TableRow>
                                    )}
                                </ThemeProvider>
                                :
                                <ThemeProvider theme={theme}>
                                    {(rowsPerPage > 0
                                        ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        : rows
                                    ).map((row) =>
                                        <TableRow key={row.name}>
                                            <TableCell component="th" scope="row">
                                                <p style={{ fontWeight: 'lighter' }}>{row.name}</p>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Button variant="contained" color="primary" onClick={() => handleOpen(row, 'view')}><VisibilityIcon /></Button>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Button variant="contained" className={classes.btnedit} onClick={() => handleOpen(row, "edit")}><EditIcon /></Button>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Button variant="contained" color="secondary" onClick={() => deleteUser(row)}><DeleteForeverIcon /></Button>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                    {emptyRows > 0 && (
                                        <TableRow style={{ height: 53 * emptyRows }}>
                                            <TableCell colSpan={6} />
                                        </TableRow>
                                    )}
                                </ThemeProvider>
                            }
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25, { label: 'Todos', value: -1 }]}
                                    colSpan={3}
                                    count={rows.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    SelectProps={{
                                        inputProps: { 'aria-label': 'Resultados por página' },
                                        native: true,
                                    }}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                    ActionsComponent={TablePaginationActions}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>)}
            </TableContainer>
            {states.showEditForm ?
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    {bodyEditUser}
                </Modal>
                :
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    {bodyViewUser}
                </Modal>}
        </div>
    );
}

