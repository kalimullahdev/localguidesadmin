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
  },
}));

function updateArticle(sAid ,sTitle, sDesription, sArticleContent, sLGid) {
  firebaseApp.database().ref('articles/' + sAid).update({
    title: sTitle,
    description: sDesription,
    articleContent:sArticleContent,
    uid:sLGid,
  });
}


function createNewArticle(sTitle, sDesription, sArticleContent, sLGid){
    
    firebaseApp.database().ref('articles/').push({
        title: sTitle,
        description: sDesription,
        articleContent: sArticleContent,
        uid:sLGid,
      });

}



export default function AEarticles(props) {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const [sAid, setsAid] = useState('');
  const [sTitle, setsTitle] = useState('');
  const [sDesription, setsDesription] = useState('');
  const [sArticleContent, setsArticleContent] = useState('');
  const [sLGid, setsLGid] = useState('');
  const [sAdd, setsAdd] = useState(false);


    function handleSubmit(event) {
      event.preventDefault();
        
    //   console.log(sTitle+" "+sDesription+" "+ sAdd);
      sAdd ? createNewArticle(sTitle, sDesription, sArticleContent, sLGid) :
      updateArticle(sAid, sTitle, sDesription, sArticleContent, sLGid);

      history.push('/articles');
      
  }

    useEffect(() => {
        
        const data = location.state.detail;
        console.log(data);
        if(data){
            setsAdd(false);
            setsTitle(data.title);
            setsDesription(data.description);
            setsArticleContent(data.articleContent);
            setsLGid(data.uid);
            setsAid(data.aid);
        }else{
          setsAdd(true);
        }
    }, [location.state.detail]);


  return (
    <Container component="main" maxWidth="xs" className={classes.root} >
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h4" variant="h4">
        {
          sAdd ? "Add " : "Edit "
        } 
        Article
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="title"
                label="Title"
                name="title"
                value={sTitle}
                onInput={ e=>setsTitle(e.target.value)}
                autoComplete="title"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="description"
                label="Description"
                name="description"
                value={sDesription}
                onInput={ e=>setsDesription(e.target.value)}
                autoComplete="description"
              />
            </Grid>
            <Grid item xs={12}>
            <TextField
                id="articleContent"
                label="Article Content"
                multiline
                required
                fullWidth
                name="articleContent"
                rows={10}
                value={sArticleContent}
                onInput={ e=> setsArticleContent(e.target.value) }
                variant="outlined"
                autoComplete="articleContent"
                />
              
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="LGid"
                label="Local Guide"
                name="LGid"
                value={sLGid}
                onInput={ e=>setsLGid(e.target.value)}
                autoComplete="LGid"
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