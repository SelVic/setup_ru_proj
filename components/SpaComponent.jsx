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
import ConfirmDialog from "./ConfirmDialog";


//Стили для material-ui
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
    adder: {
        minWidth: 150
    },
    select: {
        minWidth: 150,
    }
}));

const SpaComponent = () => {

    //инициализация всех полей
    const [confirmOpen, setConfirmOpen] = useState(false)
    const classes = useStyles();
    const [storage, updateStorage] = useState(Object.values(localStorage))
    const [email, updateEmail] = useState("");
    const [password, updatePassword] = useState("");
    const [phone, updatePhone] = useState ("");
    const [firstName, updateFirstName] = useState("");
    const [lastName, updateLastName] = useState("");
    const [patronymic, updatePatronymic] = useState("");
    const [status, updateStatus] = useState("");
    const [text, updateText] = useState("");
    const [filtered, updateFiltered] = useState(Object.values(localStorage));
    const [statusFilter, updateStatusFilter] = useState("All")
    let searchItem = text.trim().toLowerCase()
    const [user, updateUser] = useState({
        email: "",
        password: "",
        phone: 0,
        firstName: "",
        lastName: "",
        patronymic: "",
        status: "",
        date: "",
        dateUpd: "",
        uniqueId: ""
    })

    //Счетчик для подсчета даты создания
    const dateCount = () => {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0');
        let yyyy = today.getFullYear();

        today = mm + '/' + dd + '/' + yyyy;
        return today
    }

    //Создание уникального ключа для юзера в localstorage
    const createUniqueId = () => {
        const randomNum = Math.floor((Math.random()*100000000)+1)
        const stringifyNum = String(randomNum)
        return stringifyNum
    }

    //Обновление полей добавляемого пользователя
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
            dateUpd: dateCount(),
            uniqueId: createUniqueId()
        }));
    },[email, password, phone, firstName, lastName, patronymic, status])



    //Функция для валидации эмейла
    const validateEmail = (email) => {
        const regularEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regularEmail.test(String(email).toLowerCase());
    }

    //Функция для валидации номера телефона
    const validatePhone = (phone) => {
        const regularPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        return regularPhone.test(phone)
    }

    //Обновление отрисованного списка
    const handleFetch = () => {
        updateFiltered(Object.values(localStorage))
    }

    //Отправка и валидация введеных данных
    const submitHandler = () => {
        if((email || password || phone || firstName || lastName || patronymic || status)== "")
            {alert("Заполните все поля!")
                updateFiltered(Object.values(localStorage))}
        else if (validatePhone(phone) === false)
            {alert("Неверное введен номер телефона")
                updateFiltered(Object.values(localStorage))}
        else if( validateEmail(email) === false)
            {alert("Неверно введен e-mail")
                updateFiltered(Object.values(localStorage))}
        else if (filtered.some(user => (JSON.parse(user).email == email) || (JSON.parse(user).phone == phone)))
            {alert("Пользователь с таким номером телефона или email уже есть в базе")
                updateFiltered(Object.values(localStorage))}
        else
        {
            localStorage.setItem(`${user.uniqueId}`, JSON.stringify(user))
            resetFields()
            updateFiltered(Object.values(localStorage))
        }
    }

    //Обновление статуса
    const handleSelect = (event) => {
        updateStatus(event.target.value);
    }

    //Обновление фильтра по статусу
    const handleStatusFilter = (event) => {
        updateStatusFilter(event.target.value);
    }

    //Поиск по телефону / эмейлу
    useEffect(() => {
        if (statusFilter == "All")
        {
            let result = storage.filter(user => (JSON.parse(user).phone.includes(searchItem)) || (JSON.parse(user).email.toLowerCase().includes(searchItem)))
            updateFiltered(result);
        }
        else
        {
            let result = storage.filter(user => ((JSON.parse(user).phone.includes(searchItem)) || (JSON.parse(user).email.toLowerCase().includes(searchItem))) && JSON.parse(user).status == statusFilter)
            updateFiltered(result)
        }
    }, [text, statusFilter])

    //Сброс всех полей после нажатия кнопки отправить
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
                        <TextField label="Фамилия" type="text" value = {lastName} onChange={e => updateLastName(e.currentTarget.value)} />
                    </div>
                    <div className="ml-20">
                        <TextField label="Имя" type="text" value = {firstName} onChange={e => updateFirstName(e.currentTarget.value)} />
                    </div>
                    <div className="ml-20">
                        <TextField label="Отчество" type="text" value = {patronymic} onChange={e => updatePatronymic(e.currentTarget.value)} />
                    </div>
                    <div className="ml-20">
                        <FormControl className={classes.formControl}>
                            <InputLabel>Статус</InputLabel>
                            <Select value={status} onChange={handleSelect}>
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
                        <Button variant="contained" onClick={() => {setConfirmOpen(true)}}>Очистить хранилище</Button>
                        <ConfirmDialog
                            title="Очистить хранилище?"
                            open={confirmOpen}
                            setOpen={setConfirmOpen}
                            onConfirm={() => {localStorage.clear(), updateFiltered(Object.entries(localStorage))}}
                        >
                            Вы уверены, что хотите очистить хранилище?
                        </ConfirmDialog>
                    </a>
                </div>
            </div>
            <div className="mt-50">
                <div align="center">
                    <TextField variant="outlined" className={classes.adder} label="Поиск" type="text" value = {text} onChange={e => updateText(e.currentTarget.value)} />
                    <FormControl className={classes.formControl}>
                            <InputLabel className={classes.select}>Фильтр по статусу</InputLabel>
                            <Select className={classes.select} value={statusFilter} onChange={handleStatusFilter}>
                                <MenuItem value="All">All</MenuItem>
                                <MenuItem value="Admin">Admin</MenuItem>
                                <MenuItem value="Client">Client</MenuItem>
                                <MenuItem value="Partner">Partner</MenuItem>
                            </Select>
                    </FormControl>
                </div>
                <DataTable filtered={filtered} handleFetch={handleFetch}/>
            </div>
        </Fragment>
    )
}



export {SpaComponent}