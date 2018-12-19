import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import firebase from "firebase";

function TabContainer(props) {
  return <Typography component="div">{props.children}</Typography>;
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

const styles = theme => ({
  root: {
    maxWidth: "inherit"
  }
});

class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      email: "",
      password: "",
      error: null
    };
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleCreateUserSubmit = event => {
    event.preventDefault();
    const { email, password } = this.state;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        console.log(user);
        
      })
      .catch(error => {
        this.setState({ error: error });
      });
  };

  handleSignInSubmit = event => {
    event.preventDefault();
    const { email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        this.setState({
          loggedIn: true
        })
        
      })
      .catch(error => {
        this.setState({ error: error });
      });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange}>
            <Tab label="Sign In" />
            <Tab label="Sign Up" />
          </Tabs>
        </AppBar>
        {value === 0 && (
          <TabContainer>
            <SignIn handleInputChange={this.handleInputChange} handleSubmit={this.handleSignInSubmit} />
          </TabContainer>
        )}
        {value === 1 && (
          <TabContainer>
            <SignUp handleInputChange={this.handleInputChange} handleSubmit={this.handleCreateUserSubmit}/>
          </TabContainer>
        )}
      </div>
    );
  }
}

Registration.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Registration);
