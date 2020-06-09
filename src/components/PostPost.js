import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import MyButton from '../util/MyButton';
import theme from "../util/theme";

import { connect } from "react-redux";
import { postPost } from "../redux/actions/dataActions";

// Mui stuff
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from '@material-ui/core/CircularProgress'

const styles = {

}

class PostPost extends Component{
    state = {
        open: false,
        body: '',
        errors: {}
    };
    handldOpen = () => {
        this.setState({
            open: true
        })
    }
    handleClose = () => {
        this.setState({
            open: false
        })
    }
    render(){
        const { errors } = this.state;
        const { classes, UI } = this.props; 
        return;
    }
}

PostPost.propTypes = {
    postPost: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    UI: state.UI
})

export default connect((mapStateToProps, {postPost}))(withStyles(styles)(PostPost))