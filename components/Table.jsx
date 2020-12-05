import React, {useState, useEffect, Fragment} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
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
import Typography from "@material-ui/core/Typography";
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";


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

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
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


// const DataTable = (props) => {
//
//     const classes = useStyles();
//     const [open, setOpen] = useState(false);
//
//     const changeItemHandler = () => {
//
//     }
//
//
//
//
//
//
//     return (
//         <TableContainer className={classes.table} component={Paper}>
//             <Table size="small" aria-label="a dense table">
//                 <TableHead>
//                     <TableRow>
//                         <TableCell></TableCell>
//                         <TableCell>ФИО</TableCell>
//                         <TableCell align="right">E-mail</TableCell>
//                         <TableCell align="right">Пароль</TableCell>
//                         <TableCell align="right">Номер телефона</TableCell>
//                         <TableCell align="right">Статус</TableCell>
//                     </TableRow>
//                 </TableHead>
//                 <TableBody>
//                     {props.storage.map((row) => (
//                         <TableRow key={JSON.parse(row).email}>
//                             <TableCell>
//                                 <IconButton size="small" onClick={() => openHandler()}>
//                                     <BuildIcon/>
//                                 </IconButton>
//                                 <IconButton size="small" onClick={() =>{localStorage.removeItem(JSON.parse(row).phone), props.handleFetch()}}>
//                                     <DeleteIcon/>
//                                 </IconButton>
//                             </TableCell>
//                             <TableCell component="th" scope="row">
//                                 {`${JSON.parse(row).firstName} ${JSON.parse(row).lastName} ${JSON.parse(row).patronymic}`}
//                             </TableCell>
//                             <TableCell align="right">{JSON.parse(row).email}</TableCell>
//                             <TableCell align="right">{JSON.parse(row).password}</TableCell>
//                             <TableCell align="right">{JSON.parse(row).phone}</TableCell>
//                             <TableCell align="right">{JSON.parse(row).status}</TableCell>
//                         </TableRow>
//                     ))}
//                 </TableBody>
//             </Table>
//         </TableContainer>
//     );
// }



const Row = (props) => {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();
    const [email, updateEmail] = useState("");
    const [password, updatePassword] = useState("");
    const [phone, updatePhone] = useState ("");
    const [firstName, updateFirstName] = useState("");
    const [lastName, updateLastName] = useState("");
    const [patronymic, updatePatronymic] = useState("");
    const [status, updateStatus] = useState("");
    const [user, updateUser] = useState({
        email: "",
        password: "",
        phone: 0,
        firstName: "",
        lastName: "",
        patronymic: "",
        status: "",
        date: "",
        dateUpd: ""
    })

    const dateCount = () => {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0');
        let yyyy = today.getFullYear();


        today = mm + '/' + dd + '/' + yyyy;
        return today
    }

    useEffect(() => {
        updateUser(prevState => ({
            ...prevState,
            email: email,
            password: password,
            phone: phone,
            firstName: firstName,
            lastName: lastName,
            patronymic: patronymic,
            status: status,
            date: dateCount(),
            dateUpd: dateCount()
        }));
    },[email, password, phone, firstName, lastName, patronymic, status])

    const handleSelect = (event) =>{
        updateStatus(event.target.value);
    }

    const openHandler = () =>{
        setOpen(!open)
    }

    return (
        <Fragment>
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton size="small" onClick={() => openHandler()}>
                        <BuildIcon/>
                    </IconButton>
                    <IconButton size="small" onClick={() =>{localStorage.removeItem(JSON.parse(row).phone), props.handleFetch()}}>
                        <DeleteIcon/>
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {`${JSON.parse(row).lastName} ${JSON.parse(row).firstName} ${JSON.parse(row).patronymic}`}
                </TableCell>
                <TableCell align="right">{JSON.parse(row).email}</TableCell>
                <TableCell align="right">{JSON.parse(row).password}</TableCell>
                <TableCell align="right">{JSON.parse(row).phone}</TableCell>
                <TableCell align="right">{JSON.parse(row).status}</TableCell>
                <TableCell align="right">{JSON.parse(row).date}</TableCell>
                <TableCell align="right">{JSON.parse(row).dateUpd}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                Редактировать
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell><TextField label="E-mail" defaultValue={JSON.parse(row).email} type="email" value = {email} onChange={e => updateEmail(e.currentTarget.value)} /></TableCell>
                                        <TableCell><TextField label="Пароль" defaultValue={JSON.parse(row).password} type="text" value = {password} onChange={e => updatePassword(e.currentTarget.value)} /></TableCell>
                                        <TableCell><TextField label="Телефон" defaultValue={JSON.parse(row).phone} type="tel" value = {phone} onChange={e => updatePhone(e.currentTarget.value)} /></TableCell>
                                        <TableCell><TextField label="Фамилия" defaultValue={JSON.parse(row).lastName} type="text" value = {lastName} onChange={e => updateLastName(e.currentTarget.value)} /></TableCell>
                                        <TableCell><TextField label="Имя" defaultValue={JSON.parse(row).firstName} type="text" value = {firstName} onChange={e => updateFirstName(e.currentTarget.value)} /></TableCell>
                                        <TableCell><TextField label="Отчество" defaultValue={JSON.parse(row).patronymic} type="text" value = {patronymic} onChange={e => updatePatronymic(e.currentTarget.value)} /></TableCell>
                                        <TableCell><FormControl className={classes.formControl}>
                                            <InputLabel id="demo-simple-select-label">Статус</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={status}
                                                onChange={handleSelect}
                                            >
                                                <MenuItem value="Admin">Admin</MenuItem>
                                                <MenuItem value="Client">Client</MenuItem>
                                                <MenuItem value="Partner">Partner</MenuItem>
                                            </Select>
                                        </FormControl></TableCell>
                                        <TableCell>
                                            <Button variant="contained">
                                                Изменить
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </Fragment>
    );
}

const DataTable = (props) => {
    const classes = useRowStyles();

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
                    {props.storage.map((row) => (
                        <Row key={JSON.parse(row).email} row={row} handleFetch = {props.handleFetch}/>
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