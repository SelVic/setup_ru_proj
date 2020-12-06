import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {PropTypes} from "prop-types";
import Row from "./TableRows"


//Стили для material-ui
const useStyles = makeStyles({
    table: {
        maxWidth: 1500,
        boxShadow: "5px 5px 5px 4px rgba(0,0,0,0.3)",
        margin: "auto",
        ['@media (max-width:715px)']: {
            root: {
                width: "100%"
            },
        },
    },
});


//Отрисовка таблицы
const DataTable = (props) => {
    const classes = useStyles();

    return (
        <TableContainer className={classes.table} component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell>ФИО</TableCell>
                        <TableCell align="right">E-mail</TableCell>
                        <TableCell align="right">Пароль</TableCell>
                        <TableCell align="right">Номер телефона</TableCell>
                        <TableCell align="right">Статус</TableCell>
                        <TableCell align="right">Дата создания</TableCell>
                        <TableCell align="right">Дата последнего изменения</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.filtered.map((row) => (
                        <Row key={JSON.parse(row).uniqueId} row={row} handleFetch = {props.handleFetch} filtered={props.filtered}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

DataTable.propTypes = {
    storage: PropTypes.array
}


export {DataTable}