import React, {useEffect, useState} from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from '../../Components/Title';
import { Button, Grid } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import firebaseApp from '../../firebaseServices/firebase';
import ArticleTableRow from './ArticleTableRow';




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



export default function ArticlesList() {
  const [sArticles, setsArticles] = useState();
  const history = useHistory();

  useEffect(() => {
    var lgUsersRef = firebaseApp.database().ref("articles");
    
    lgUsersRef.on("value", (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      const articleList = [];
      for (let id in data){
          const aid = id;
        articleList.push({aid ,...data[id]});
      }
    
      console.log(articleList);
      setsArticles(articleList)
  });

  }, []);
  
  function goToAddPage(){
    history.push({
      pathname: '/AEarticle',
      state: { detail: '' }
    });
  }
  

  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Articles</Title>
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
        >Add Article</Button>
      </Grid>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Article Content</TableCell>
            <TableCell>UID</TableCell>
            <TableCell align="right">
              Buttons
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sArticles ? sArticles.map((row) => (
            <ArticleTableRow row={row}/>
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

