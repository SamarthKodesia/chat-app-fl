import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Chatroom from './Chatroom';
import Routes from './Routes';
import history from './history';
import './App.css';


const useStyles = makeStyles((theme) => ({
   container:{
    background:'black',
    borderRadius:'20px'
   } ,
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    font: 'white'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    font: 'white'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    font: 'white'
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    font: 'white'
  },
  signIn:{
      color:"white",
      font:"white"
  }
  ,
  formText:{
      color:'white',
      font:'white',
      backgroundColor:'white',
      borderRadius:'20px'
  },
}));



export default function SignIn() {
const classes = useStyles();
const [username,setUserName] = useState('');
const [password,setPassWord] = useState('');

    const handleSubmit = ()=>{
        if(password === 'password'){
            alert('Authentication Successfull');
            history.push({
                pathname: '/Chatroom',
                userName: username,
              });
        }
        else{
            alert('Wrong password');
        }

      
    }
  return (
      <div className = "chatroomLogin">
<Container component="main" maxWidth="xs">
    <h3>Chatroom App</h3>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" className={classes.signIn}>
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="user"
            label="UserName"
            name="UserName"
            autoComplete="UserName"
            autoFocus
            className={classes.formText}
            onChange = {(e)=>setUserName(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            className={classes.formText}
            onChange = {(e)=>setPassWord(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
            >
            Sign In
          </Button>
        </form>
      </div>
      <Box mt={8}>
      </Box>
    </Container>
      </div>
    
  );
}