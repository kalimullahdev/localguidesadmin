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
  

export default function ArticleTableRow({row}) {
    const classes = useStyles();
    const history = useHistory();

    function deleteLocalGuide(){
      
        const articleRef = firebaseApp.database().ref("articles/").child(row.aid);

        articleRef.remove();
    }

    
    
    function editLocalGuide(){
     const aid = row.aid;
      firebaseApp.database().ref("articles/").child(row.aid).get().then(function(snapshot) {
        if (snapshot.exists()) {
          const articles = snapshot.val();
          console.log("articles");
          console.log(articles);
          history.push({
            pathname: '/AEarticle',
            search: '?query=abc',
            state: { detail: {aid, ...articles} }
          });
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
        <TableCell>{row.title}</TableCell>
        <TableCell>{row.description}</TableCell>
        <TableCell>{row.articleContent}</TableCell>
        <TableCell>{row.uid}</TableCell>
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
