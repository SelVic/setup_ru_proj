import React, {useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {PropTypes} from "prop-types";
import DeleteIcon from '@material-ui/icons/Delete';
import BuildIcon from '@material-ui/icons/Build';
import Button from "@material-ui/core/Button";
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import TextField from "@material-ui/core";


const useStyles = makeStyles({
    table: {
        maxWidth: 1500,
        margin: "auto",
        ['@media (max-width:715px)']: {
            root: {
                width: "100%"
            },
        },
    },
});



const DataTable = (props) => {
    const [openDialog, setOpenDialog] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const classes = useStyles();
    const [test, updateTest] = useState(false)


    const changeItemHandler = () => {
    }




    const deleteItemHandler = (userPhone) => {


        const handleClickOpen = () => {
            setOpenDialog(true);
            console.log("open")
        };
        handleClickOpen()

        const handleCloseYes = () => {
            console.log(userPhone)
        };

        const handleCloseNo = () =>{
            setOpenDialog(false);
        }

        const handleClose = () =>{
            setOpenDialog(false);
        }

        return (
            <div>
                <Dialog
                    fullScreen={fullScreen}
                    open={openDialog}
                    onClose={handleClose}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">{"Вы уверены, что хотите удалить пользователя из базы?"}</DialogTitle>
                    <DialogActions align="center">
                        <Button autoFocus onClick={handleCloseNo} color="primary">
                            Нет
                        </Button>
                        <Button onClick={handleCloseYes} color="primary" autoFocus>
                            Да
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }

    return (
        <TableContainer className={classes.table} component={Paper}>
            <Table size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell>ФИО</TableCell>
                        <TableCell align="right">E-mail</TableCell>
                        <TableCell align="right">Пароль</TableCell>
                        <TableCell align="right">Номер телефона</TableCell>
                        <TableCell align="right">Статус</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.storage.map(row => (
                        <TableRow key={JSON.parse(row).phone}>
                            <TableCell>
                                <IconButton size="small">
                                    <BuildIcon/>
                                </IconButton>
                                <IconButton size="small" onClick={() =>{deleteItemHandler(JSON.parse(row).phone), props.handleFetch()}}>
                                    <DeleteIcon/>
                                </IconButton>
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {`${JSON.parse(row).firstName} ${JSON.parse(row).lastName} ${JSON.parse(row).patronymic}`}
                            </TableCell>
                            <TableCell align="right">{JSON.parse(row).email}</TableCell>
                            <TableCell align="right">{JSON.parse(row).password}</TableCell>
                            <TableCell align="right">{JSON.parse(row).phone}</TableCell>
                            <TableCell align="right">{JSON.parse(row).status}</TableCell>
                        </TableRow>
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