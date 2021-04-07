import React, { useState, useEffect }  from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import firebaseApp, { storage } from '../../firebaseServices/firebase';
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { CardMedia } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
  },
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
  },input: {
    display: 'none',
  },
  media:{
    height: 140,
    margin:theme.spacing(2),
  }
}));

function updateUserData(sUserId, sUserName, sLocation, sAbout, sFollowers, sPhoneNumber,profilePic) {
  firebaseApp.database().ref('users/' + sUserId).update({
    username: sUserName,
    // email: email,
    phoneNumber: sPhoneNumber,
    followers:sFollowers,
    about:sAbout,
    location:sLocation,
    profilePic:profilePic,
    uid:sUserId,
  });
}


function createUserData( sUserName, sLocation, sAbout, sFollowers, sPhoneNumber,  sEmail, sPassword, profilePic) {

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
          profilePic:profilePic,
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

  //Image upload
  const allInputs = {imgUrl: ''}
  const [imageAsFile, setImageAsFile] = useState('')
  const [imageAsUrl, setImageAsUrl] = useState(allInputs)
  console.log(imageAsFile)
  const handleImageAsFile = (e) => {
       const image = e.target.files[0]
       setImageAsFile(imageFile => (image))
   }
 


  const [sPhoneNumber, setsPhoneNumber] = useState('');
  const [sFollowers, setsFollowers] = useState('');
  const [sAbout, setsAbout] = useState('');
  const [sLocation, setsLocation] = useState('');
  const [sUserName, setsUserName] = useState('');
  const [sUserId, setsUserId] = useState('');
  const [sAdd, setsAdd] = useState(false);
  const [sEmail, setsEmail] = useState('');
  const [sPassword, setsPassword] = useState('');
  // const [sProfilePic, setsProfilePic] = useState(imageAsUrl.imgUrl);
  



    function handleSubmit(event) {
      event.preventDefault();

      // Upload Image To Firebase Firestore
      console.log('start of upload')
      // async magic goes here...
      if(imageAsFile === '') {
        console.error(`not an image, the image file is a ${typeof(imageAsFile)}`)
      }
      const uploadTask =  storage.ref(`/images/${imageAsFile.name}`).put(imageAsFile)
      //initiates the firebase side uploading 
      uploadTask.on('state_changed', 
      (snapShot) => {
        //takes a snap shot of the process as it is happening
        console.log(snapShot)
      }, (err) => {
        //catches the errors
        console.log(err)
      }, () => {
        // gets the functions from storage refences the image storage in firebase by the children
        // gets the download url then sets the image from firebase as the value for the imgUrl key:
        storage.ref('images').child(imageAsFile.name).getDownloadURL()
        .then(fireBaseUrl => {
          const profilePic  = fireBaseUrl;

          setImageAsUrl(prevObject => ({...prevObject, imgUrl: fireBaseUrl}))
          sAdd ? createUserData( sUserName, sLocation, sAbout, sFollowers, sPhoneNumber, sEmail, sPassword,profilePic) :
          updateUserData(sUserId, sUserName, sLocation, sAbout, sFollowers, sPhoneNumber,profilePic);
        })
      })

      

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
          imageAsUrl.imgUrl ? setImageAsUrl(prevObject => ({...prevObject, imgUrl: imageAsUrl.imgUrl})) : setImageAsUrl(prevObject => ({...prevObject, imgUrl: data.profilePic})) ;
          // setsProfilePic(imageAsUrl.imgUrl)  data.profilePic
        }else{
          setsAdd(true);
        }
    }, [location.state.detail,imageAsUrl.imgUrl ]);


  return (
    <Container component="main" maxWidth="xs" className={classes.root} >
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
              <input
              accept="image/*"
              className={classes.input}
              id="contained-button-file"
              multiple
              type="file"
              onChange={handleImageAsFile}
              required
              />
              <label htmlFor="contained-button-file">
                <Button variant="contained" color="primary" component="span">
                  Upload
                </Button>
              </label>
            </Grid>


            <Grid item xs={12}>
              <CardMedia 
              image={imageAsUrl.imgUrl}
              className={classes.media}  
              title="Contemplative Reptile" />
            </Grid>

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