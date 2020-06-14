import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import MyButton from "../util/MyButton";
import theme from "../util/theme";

import { connect } from "react-redux";
import { postPost, clearErrors } from "../redux/actions/dataActions";

// Mui stuff
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";

const styles = (theme) => ({
  //...theme,
  submitButton: {
      position:'relative',
      marginTop: 10
  },
  progress: {
      position: 'absolute',
      marginTop: 10
  },
  closeButton: {
      position: 'absolute',
      left: '90%',
      top: '6%'
  }
});

class PostPost extends Component {
  state = {
    open: false,
    body: "",
    errors: {},
  };
  componentWillReceiveProps(nextProps)  {
    if(nextProps.UI.errors){
      this.setState({
        errors: nextProps.UI.errors
      })
    };
    if(!nextProps.UI.errors && !nextProps.UI.loading){
      this.setState({ body: ''});
      this.setState({
        open: false,
        errors: {}
      });
    }
  }
  handldOpen = () => {
    this.setState({
      open: true,
    });
  };
  handleClose = () => {
    this.props.clearErrors();
    this.setState({
      open: false,
      errors: {}
    });
  };
  handleChange = (event) =>{
    this.setState({ [event.target.name]: event.target.value});
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.postPost({ body: this.state.body });
  };

  render() {
    const { errors } = this.state;
    const {
      classes,
      UI: { loading },
    } = this.props;

    return (
      <Fragment>
        <MyButton onClick={this.handldOpen} tip="Click to post">
          <AddIcon color="secondary" />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <MyButton
            tip="Close"
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon />
          </MyButton>
          <DialogTitle>Submit a new Post</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <TextField
                name="body"
                type="text"
                label="POST"
                multiline
                fullWidth
                rows="3"
                placeholder="Tell the world what's up"
                error={errors.body ? true : false}
                helperText={errors.body}
                className={classes.textField}
                onChange={this.handleChange}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submitButton}
                disable={loading}
              >
                Submit
              </Button>
              {loading && (
                <CircularProgress size={30} className={classes.progress} />
              )}
            </form>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

PostPost.propTypes = {
  postPost: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  UI: state.UI
});

export default connect(
  mapStateToProps,
  { postPost, clearErrors }
)(withStyles(styles)(PostPost));