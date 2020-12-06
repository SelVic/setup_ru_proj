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
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
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



const Row = (props) => {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();
    const [email, updateEmail] = useState("");
    const [password, updatePassword] = useState("");
    const [phone, updatePhone] = useState ("");
    const [firstName, updateFirstName] = useState("");
    const [lastName, updateLastName] = useState("");
    const [patronymic, updatePatronymic] = useState("");
    const [status, updateStatus] = useState("");
    const [uniqueId, updateUniqueId] = useState("")
    const [date, updateDate] = useState("")
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
            uniqueId: uniqueId,
            date: date,
            dateUpd: dateCount()
        }));
    },[email, password, phone, firstName, lastName, patronymic, status])

    const handleSelect = (event) =>{
        updateStatus(event.target.value);
    }

    const openHandler = () =>{
        setOpen(!open)
    }


    const submitChangeHandler = (userId) =>{
            localStorage.setItem(`${userId}`, JSON.stringify(user))
            props.handleFetch()
        console.log(user)
    }

    return (
        <Fragment>
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton size="small" onClick={() => openHandler()}>
                        <BuildIcon/>
                    </IconButton>
                    <IconButton size="small" onClick={() =>{localStorage.removeItem(JSON.parse(row).uniqueId), props.handleFetch()}}>
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
                    <Collapse in={open} timeout="auto" unmountOnExit onEnter={() => {
                            updateEmail(JSON.parse(row).email)
                            updatePassword(JSON.parse(row).password)
                            updatePhone(JSON.parse(row).phone)
                            updateFirstName(JSON.parse(row).firstName)
                            updateLastName(JSON.parse(row).lastName)
                            updatePatronymic(JSON.parse(row).patronymic)
                            updateStatus(JSON.parse(row).status)
                            updateUniqueId(JSON.parse(row).uniqueId)
                            updateDate(JSON.parse(row).date)
                        }
                    }>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                Редактировать
                            </Typography>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            <TextField label="E-mail"  type="email" defaultValue = {JSON.parse(row).email} onChange={e => updateEmail(e.currentTarget.value)} />
                                        </TableCell>
                                        <TableCell>
                                            <TextField label="Пароль" type="text" defaultValue = {JSON.parse(row).password} onChange={e => updatePassword(e.currentTarget.value)} />
                                        </TableCell>
                                        <TableCell>
                                            <TextField label="Телефон" type="tel" defaultValue = {JSON.parse(row).phone} onChange={e => updatePhone(e.currentTarget.value)} />
                                        </TableCell>
                                        <TableCell>
                                            <TextField label="Фамилия" type="text" defaultValue = {JSON.parse(row).lastName} onChange={e => updateLastName(e.currentTarget.value)} />
                                        </TableCell>
                                        <TableCell>
                                            <TextField label="Имя" type="text" defaultValue = {JSON.parse(row).firstName} onChange={e => updateFirstName(e.currentTarget.value)} />
                                        </TableCell>
                                        <TableCell>
                                            <TextField label="Отчество"  type="text" defaultValue = {JSON.parse(row).patronymic} onChange={e => updatePatronymic(e.currentTarget.value)} />
                                        </TableCell>
                                        <TableCell>
                                            <FormControl className={classes.formControl}>
                                            <InputLabel>Статус</InputLabel>
                                                <Select defaultValue = {JSON.parse(row).status} onChange={handleSelect}>
                                                    <MenuItem value="Admin">Admin</MenuItem>
                                                    <MenuItem value="Client">Client</MenuItem>
                                                    <MenuItem value="Partner">Partner</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </TableCell>
                                        <TableCell>
                                            <Button variant="contained" onClick={()=> submitChangeHandler(JSON.parse(row).uniqueId)}>
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