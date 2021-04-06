import React, { useState, useEffect }  from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import firebaseApp from '../../firebaseServices/firebase';
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function updateUserData(sUserId, sUserName, sLocation, sAbout, sFollowers, sPhoneNumber) {
  firebaseApp.database().ref('users/' + sUserId).update({
    username: sUserName,
    // email: email,
    phoneNumber: sPhoneNumber,
    followers:sFollowers,
    about:sAbout,
    location:sLocation,
    // profilePic:"",
    uid:sUserId,
  });
}


function createUserData(sUserId, sUserName, sLocation, sAbout, sFollowers, sPhoneNumber,  sEmail, sPassword) {

    firebaseApp.auth().createUserWithEmailAndPassword(sEmail, sPassword)
      .then((userCredential) => {
        // Signed in 
        var userID = userCredential.user.uid;
        firebaseApp.database().ref('users/' + userID).set({
          username: sUserName,
          email: sEmail,
          password: sPassword,
          phoneNumber: sPhoneNumber,
          followers:sFollowers,
          about:sAbout,
          location:sLocation,
          profilePic:"",
          uid:userID,
        });        
        // ...
      })
      .catch((error) => {
        // var errorCode = error.code;
        // var errorMessage = error.message;
        // ..
      });
}



export default function EditLocalGuide(props) {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const [sPhoneNumber, setsPhoneNumber] = useState('');
  const [sFollowers, setsFollowers] = useState('');
  const [sAbout, setsAbout] = useState('');
  const [sLocation, setsLocation] = useState('');
  const [sUserName, setsUserName] = useState('');
  const [sUserId, setsUserId] = useState('');
  const [sAdd, setsAdd] = useState(false);
  const [sEmail, setsEmail] = useState('');
  const [sPassword, setsPassword] = useState('');
  



    function handleSubmit(event) {
      event.preventDefault();

      sAdd ? createUserData(sUserId, sUserName, sLocation, sAbout, sFollowers, sPhoneNumber, sEmail, sPassword) :
      updateUserData(sUserId, sUserName, sLocation, sAbout, sFollowers, sPhoneNumber);

      history.push('/');
      
  }

    useEffect(() => {
        
        const data = location.state.detail;
        if(data){
          setsAdd(false);
          setsUserId(data.uid);
          setsPhoneNumber(data.phoneNumber);
          setsFollowers(data.followers);
          setsAbout(data.about);
          setsLocation(data.location);
          setsUserName(data.username);
        }else{
          setsAdd(true);
        }
    }, [location.state.detail]);


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h4" variant="h4">
        {
          sAdd ? "Add " : "Edit "
        } 
        LocalGuides User
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>

          {
            sAdd ? <>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                value={sEmail}
                onInput={ e=>setsEmail(e.target.value)}
                autoComplete="email"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="password"
                label="Password"
                name="password"
                value={sPassword}
                onInput={ e=>setsPassword(e.target.value)}
                autoComplete="password"
              />
            </Grid>
            </>
            : ''
          }

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="User Name"
                name="username"
                value={sUserName}
                onInput={ e=>setsUserName(e.target.value)}
                autoComplete="username"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="phoneNumber"
                label="Phone Number"
                name="phoneNumber"
                value={sPhoneNumber}
                onInput={ e=>setsPhoneNumber(e.target.value)}
                autoComplete="phoneNumber"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="followers"
                label="Followers"
                name="followers"
                value={sFollowers}
                onInput={ e=>setsFollowers(e.target.value)}
                autoComplete="followers"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="location"
                label="Located City"
                name="location"
                value={sLocation}
                onInput={ e=>setsLocation(e.target.value)}
                autoComplete="location"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="about"
                label="About"
                name="about"
                value={sAbout}
                onInput={ e=>setsAbout(e.target.value)}
                autoComplete="about"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {
              sAdd ? "Add" : "Save"
            }
          </Button>
         
        </form>
      </div>
    </Container>
  );
}