import React from 'react'
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';

const Header = () => {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Journal
        </Typography>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  )
}

const useStyles = makeStyles(( theme ) => ({
  root:{
    flexGrow:1,
  },
  menuButton:{
    marginRight:theme.spacing(2),
  },
  title:{
    flexGrow:1,
  },
}));


export default Header
