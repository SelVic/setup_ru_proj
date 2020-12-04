import React, {useEffect, useState, Fragment} from "react"
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import {DataTable} from "./Table";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const SpaComponent = () => {

    const classes = useStyles();

    //инициализация всех полей
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

    let storage = Object.values(localStorage)

    //счетчик для текущей даты
    const dateCount = () => {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0');
        let yyyy = today.getFullYear();

        today = mm + '/' + dd + '/' + yyyy;
        return today
    }

    /// Обновление пользователя для последующего внесения в localstorage

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


    const submitHandler = () => {
        localStorage.setItem(`${user.phone}`,JSON.stringify(user))
        console.log(user)
        resetFields()
    }

    const handleSelect = (event) => {
        updateStatus(event.target.value);
    }


    const resetFields = () => {
        updateEmail("");
        updateStatus("");
        updatePatronymic("");
        updateLastName("");
        updateFirstName("");
        updatePassword("");
        updatePhone("");
    }

    return(
        <Fragment>
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" className={classes.title} align="center">
                            Администрирование пользователей
                        </Typography>
                    </Toolbar>
                </AppBar>
            </div>
            <div className="mt-20">
                <Typography variant="body1" className={classes.title} align="center">
                    Добавить нового пользователя
                </Typography>
            </div>
            <div className="mt-30">
                <form className="input-container">
                    <div className="ml-20">
                        <TextField label="Электронная почта" type="email" value = {email} onChange={e => updateEmail(e.currentTarget.value)} />
                    </div>
                    <div className="ml-20">
                        <TextField label="Пароль" type="text" value = {password} onChange={e => updatePassword(e.currentTarget.value)} />
                    </div>
                    <div className="ml-20">
                        <TextField label="Номер телефона" type="tel" value = {phone} onChange={e => updatePhone(e.currentTarget.value)} />
                    </div>
                    <div className="ml-20">
                        <TextField label="Имя" type="text" value = {firstName} onChange={e => updateFirstName(e.currentTarget.value)} />
                    </div>
                    <div className="ml-20">
                        <TextField label="Фамилия" type="text" value = {lastName} onChange={e => updateLastName(e.currentTarget.value)} />
                    </div>
                    <div className="ml-20">
                        <TextField label="Отчество" type="text" value = {patronymic} onChange={e => updatePatronymic(e.currentTarget.value)} />
                    </div>
                    <div className="ml-20">
                        <FormControl className={classes.formControl}>
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
                        </FormControl>
                    </div>
                </form>
                <div className="button-container mt-50">
                    <a className="mt-20">
                        <Button variant="contained" onClick={() => {submitHandler()}}>Отправить</Button>
                    </a>
                    <a className="mt-20 ml-30">
                        <Button variant="contained" onClick={() => {localStorage.clear()}}>Очистить хранилище</Button>
                    </a>
                </div>
                <div>
                    {
                        storage.map((item, i) => <li key = {i} item={item}>{JSON.parse(item).firstName}</li>)
                    }
                </div>
            </div>
        </Fragment>
    )
}



export {SpaComponent}