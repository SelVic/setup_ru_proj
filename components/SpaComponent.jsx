import React, {useEffect, useState, Fragment} from "react"
import {DataTable} from "./Table";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
}));

const SpaComponent = () => {

    const classes = useStyles();

    //инициализация всех полей
    const [email, updateEmail] = useState("");
    const [password, updatePassword] = useState("");
    const [phone, updatePhone] = useState (0);
    const [firstName, updateFirstName] = useState("");
    const [lastName, updateLastName] = useState("");
    const [patronymic, updatePatronymic] = useState("");
    const [status, updateStatus] = useState("");
    const [user, updateUser] = useState({
        email: "",
        password: "",
        phone: 0,
        name: {
            firstName: "",
            lastName: "",
            patronymic: ""
        },
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


    useEffect(() => {
        console.log(storage)
        console.log(localStorage)
    })

    const submitHandler = (text) => {
        localStorage.setItem(`${text}`, JSON.stringify(user))
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
            <div className="mt-30">
                <form className="input-container">
                    <div className="ml-20">
                        <TextField label="Наименование" type="text" value = {email} onChange={e => updateEmail(e.currentTarget.value)} />
                    </div>
                    <div className="ml-20">
                        <TextField label="Наименование" type="text" value = {email} onChange={e => updateEmail(e.currentTarget.value)} />
                    </div>
                    <div className="ml-20">
                        <TextField label="Наименование" type="text" value = {email} onChange={e => updateEmail(e.currentTarget.value)} />
                    </div>
                    <div className="ml-20">
                        <TextField label="Наименование" type="text" value = {email} onChange={e => updateEmail(e.currentTarget.value)} />
                    </div>
                    <div className="ml-20">
                        <TextField label="Наименование" type="text" value = {email} onChange={e => updateEmail(e.currentTarget.value)} />
                    </div>
                    <div className="ml-20">
                        <TextField label="Наименование" type="text" value = {email} onChange={e => updateEmail(e.currentTarget.value)} />
                    </div>
                    <div className="ml-20">
                        <TextField label="Наименование" type="text" value = {email} onChange={e => updateEmail(e.currentTarget.value)} />
                    </div>
                </form>
                <div className = "mt-40">
                    <a className="ml-80">
                        <Button variant="contained" onClick={() => {submitHandler(text)}}>Отправить</Button>
                    </a>
                    <a className="ml-70">
                        <Button variant="contained" onClick={() => {localStorage.clear()}}>Очистить хранилище</Button>
                    </a>
                </div>
                <div>
                    {
                        storage.map((item, i) => <li key = {i} item={item}>{JSON.parse(item).name}</li>)
                    }
                </div>
            </div>
        </Fragment>
    )
}



export {SpaComponent}