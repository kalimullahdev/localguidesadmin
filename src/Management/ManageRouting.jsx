import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {
    Switch,
    Route,
  } from "react-router-dom";
import EditLocalGuide from '../Components/EditLocalGuide/EditLocalGuide';
import ArticlesList from '../Pages/Aritcles/ArticlesList';
import AEarticles from '../Pages/Aritcles/AEarticles';
import LocalGuides from '../Components/LocalGuides';
  

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      height: '100vh',
      overflow: 'auto',
    },
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
    paper: {
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
    },
  
  }));
  
export default function ManageRouting() {
    const classes = useStyles();
    return (
    <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
 
            {/* Recent LocalGuides */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                {/* <LocalGuides/> */}
                <Switch>
                    <Route exact path="/">
                        <LocalGuides/>
                    </Route>
                    <Route exact path="/AElocalGuides">
                        <EditLocalGuide/>
                    </Route>
                    <Route exact path="/articles">
                        <ArticlesList/>
                    </Route>
                    <Route path="/AEarticle">
                        <AEarticles/>
                    </Route>
                </Switch>


              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    )
}
