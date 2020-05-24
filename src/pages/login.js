import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import Icon from "../images/icon.png";
import axios from "axios";

// MUI Stuff
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
    form: {
        textAlign: "center",
      },
      image: {
        height: 90,
        width: 80,
        margin: "auto auto 20px auto",
      },
      title: {
        margin: "5px auto 5px auto",
      },
      textField: {
        margin: "10px auto 10px auto",
      },
      button: {
        margin: "10px auto 10px auto",
        position: "relative"
      },
      customError: {
          color: 'red',
          fontSize: '0.8 rem'
      },
      progress: {
          position:"absolute",
          margin:"10px auto auto 5px"
      },
  });    

class login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      loading: false,
      errors: {},
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };

    axios
      .post("/login", userData)
      .then((res) => {
        //console.log(res.data);
        localStorage.setItem('FBAuthToken', `Bearer ${res.data.token}`);
        this.setState({
          loading: false,
        });
        this.props.history.push("/");
      })
      .catch((err) => {
        this.setState({
          errors: err.response.data,
          loading: false,
        });
      });
    //this.props.loginUser(userData, this.props.history);
  };
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;
    const { errors, loading } = this.state;
    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <img src={Icon} alt="App Icon" className={classes.image} />
          <Typography variant="h3" className={classes.title}>
            Login
            
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id="email"
              name="email"
              type="email"
              label="Email"
              className={classes.textField}
              helperText={errors.email}
              error={errors.email ? true : false}
              value={this.state.email}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              id="password"
              name="password"
              type="password"
              label="Password"
              className={classes.textField}
              helperText={errors.password}
              error={errors.password ? true : false}
              value={this.state.password}
              onChange={this.handleChange}
              fullWidth
            />
            {errors.general && (
                <Typography variant="body2" className={classes.customError}>
                    {errors.general}
                </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              disabled={loading}
            >
              Login
              
            </Button>
            {loading && (
                <CircularProgress className={classes.progress} color="primary" size={30}/>
            )}
            <small>
                <p>You don't have an account? <Link to="/signup">Click here</Link></p>
            </small>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}

login.protoTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(login);
//export default connect()(withStyles(login));
