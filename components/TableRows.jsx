import React, {useState, useEffect, Fragment} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import BuildIcon from '@material-ui/icons/Build';
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import IconButton from '@material-ui/core/IconButton';
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import ConfirmDialog from "./ConfirmDialog";

//Стили для material-ui
const useStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});



const Row = (props) => {

    //Инициализация стейтов для редактирования пользователя
    const [storage, updateStorage] = useState(Object.values(localStorage))
    const { row } = props;
    const [openItem, setOpenItem] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false)
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

    //Подсчет даты последнего изменения
    const dateCount = () => {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0');
        let yyyy = today.getFullYear();

        today = mm + '/' + dd + '/' + yyyy;
        return today
    }

    //Обновление данных для изменения пользователя
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

    //Обновление значения статуса пользователя
    const handleSelect = (event) =>{
        updateStatus(event.target.value);
    }

    //Открытие подстроки таблицы для редактирования
    const openHandler = () =>{
        setOpenItem(!openItem)
    }

    //Проверка на совпадение с существующими номерами телефонов / эмейлов
    const checkSimilar = () => {
        const result = (storage.some(item => ((JSON.parse(item).email.includes(email)) || JSON.parse(item).phone.includes(phone)) && !JSON.parse((item).includes(uniqueId))))
        if (!result) {
            return false
        }
        else{
            return true
        }
    }


    //Функция для валидации эмейла
    const validateEmailChange = (email) => {
        const regularEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regularEmail.test(String(email).toLowerCase());
    }

    //Функция для валидации номера телефона
    const validatePhoneChange = (phone) => {
        const regularPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        return regularPhone.test(phone)
    }

    //Обновление данных в localStorage и валидация
    const submitChangeHandler = (userId) =>{
        if((email || password || phone || firstName || lastName || patronymic || status)== "")
        {alert("Заполните все поля!")}
        else if (validatePhoneChange(phone) === false)
        {alert("Неверное введен номер телефона")}
        else if( validateEmailChange(email) === false)
        {alert("Неверно введен e-mail")}
        else if (checkSimilar())
        {alert("Пользователь с таким номером телефона или email уже есть в базе")}
        else
        {
            localStorage.setItem(`${userId}`, JSON.stringify(user))
            props.handleFetch()
            setOpenItem(!openItem)
            updateStorage(Object.values(localStorage))
        }
    }

    return (
        <Fragment>
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton size="small" onClick={() => openHandler()}>
                        <BuildIcon/>
                    </IconButton>
                    <IconButton size="small" onClick={() =>{setConfirmOpen(true)}}>
                        <DeleteIcon/>
                    </IconButton>
                    <ConfirmDialog
                        title="Удалить пользователя?"
                        open={confirmOpen}
                        setOpen={setConfirmOpen}
                        onConfirm={() => {localStorage.removeItem(JSON.parse(row).uniqueId), props.handleFetch()}}
                    >
                        Вы уверены, что хотите удалить этого пользователя?
                    </ConfirmDialog>
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
                    <Collapse in={openItem} timeout="auto" unmountOnExit onEnter={() => {
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

export default Row