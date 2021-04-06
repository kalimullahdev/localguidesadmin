import React from 'react'
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import firebaseApp from '../../firebaseServices/firebase';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    seeMore: {
      marginTop: theme.spacing(3),
    },
    marginAll: {
      margin: theme.spacing(1),
    }
  }));
  

export default function MyTableRow({row}) {
    const classes = useStyles();
    const history = useHistory();

    function deleteLocalGuide(){
      
        const localGuideRef = firebaseApp.database().ref("users/").child(row.uid);
        // var deleteUserRef = firebaseApp.auth();

        // deleteUserRef.delete().then(function() {
        //   console.log("User deleted.")
        // }).catch(function(error) {
        //   console.log("An error happened.")
        // });
        localGuideRef.remove();
    }

    
    
    function editLocalGuide(){

      firebaseApp.database().ref("users/").child(row.uid).get().then(function(snapshot) {
        if (snapshot.exists()) {
          const lgUserData = snapshot.val();
          history.push({
            pathname: '/AElocalGuides',
            search: '?query=abc',
            state: { detail: lgUserData }
          })
        }
        else {
          console.log("No data available");
        }
      }).catch(function(error) {
        console.error(error);
      });


      // const localGuideRef = firebaseApp.database().ref("users/").child(row.uid);


    }

    return (
        <TableRow key={row.id}>
        <TableCell>{row.username}</TableCell>
        <TableCell>{row.email}</TableCell>
        <TableCell>{row.followers}</TableCell>
        <TableCell>{row.about}</TableCell>
        <TableCell>{row.profilePic}</TableCell>
        <TableCell>{row.phoneNumber}</TableCell>
        <TableCell>{row.location}</TableCell>
        <TableCell align="right">
          <Button
          size="small"
          variant="outlined"
          color="primary"
          className={classes.marginAll}
          onClick={editLocalGuide}
          >Edit
          </Button>
          <Button
          size="small"
          variant="outlined"
          color="secondary"
          className={classes.marginAll}
          onClick={deleteLocalGuide}
          >Delete</Button>
        </TableCell>
    </TableRow>
    )
}
