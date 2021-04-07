import React, {useEffect, useState} from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import firebaseApp from '../firebaseServices/firebase';
import MyTableRow from './MyTableRow/MyTableRow';
import { Button, Grid } from '@material-ui/core';
import { useHistory } from "react-router-dom";




function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  marginAll: {
    margin: theme.spacing(1),
  },
  buttonWidth:{
    width: theme.spacing(42),
    margin: theme.spacing(2),
  },
}));



export default function LocalGuides() {
  const [userDataRow, setuserDataRow] = useState();
  const history = useHistory();

  useEffect(() => {
    var lgUsersRef = firebaseApp.database().ref("users");

    lgUsersRef.on("value", (snapshot) => {

      const data = snapshot.val();
      console.log(data);
      const userList = [];
      for (let id in data){
        userList.push(data[id]);
      }
    
      console.log(userList);
      setuserDataRow(userList)
  });

  }, []);
  
  function goToAddPage(){
    history.push({
      pathname: '/AElocalGuides',
      state: { detail: '' }
    });
  }
  

  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Local Guides Users</Title>
      <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      >
        <Button
          variant="contained" 
          color="primary"
          className={classes.buttonWidth}
          onClick={goToAddPage }
        >Add Local Guide</Button>
      </Grid>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>User Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Followers</TableCell>
            <TableCell>About</TableCell>
            <TableCell>Profile Pic</TableCell>
            <TableCell>Phone Number</TableCell>
            <TableCell>Location</TableCell>
            <TableCell align="right">
              Buttons
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userDataRow ? userDataRow.map((row) => (
            <MyTableRow row={row}/>
          )): "No data fetched from Database"}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more orders
        </Link>
      </div>
    </React.Fragment>
  );
}