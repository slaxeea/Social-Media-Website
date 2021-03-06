// React stuff
import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import MyButton from "../util/MyButton";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

// Mui stuff
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';

// Icons
import CloseIcon from "@material-ui/icons/Close";
import UnfoldMore from "@material-ui/icons/UnfoldMore";
import ChatIcon from '@material-ui/icons/Chat';

// Redux stuff
import { connect } from "react-redux";
import { getPost } from "../redux/actions/dataActions";
import { LikeButton } from "./LikeButton";

const styles = (theme) => ({
  //...theme,
  Separator: {
    border: "none",
    margin: 4,
  },
  profileImage:{
      maxWidth: 200,
      height: 200,
      objectFit: 'cover'
  },
  dialogContent:{
      padding: 20
  },
  closeButton: {
      position: 'absolute',
      left: '90%'
  },
  expandButton:{
      position:'absolute',
      left: '90%'
  },
  progress: {
      textAlign: 'center',
      marginTop: 50,
      marginBottom: 50
  }
});

class PostDialog extends Component {
  state = {
    open: false,
  };
  handleOpen = () => {
    this.setState({
      open: true,
    });
    this.props.getPost(this.props.postId);
  };
  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    const {
      classes,
      post: {
        postId,
        body,
        createdAt,
        likeCount,
        commentCount,
        userImage,
        userHandle,
      },
      UI: { loading },
    } = this.props;

    const dialogMarkup = loading ? (
      <div className={classes.progress}>
          <CircularProgress size={100} thickness={2} />
      </div>
    ) : (
      <Grid container spacing={2}>
        <Grid item sm={5} style={{paddingLeft: 10}}>
          <img
            src={userImage}
            alt="profile"
            className={classes.profileImage}
          />
        </Grid>
        <Grid item sm={7}>
          <Typography
            component={Link}
            color="primary"
            variant="h5"
            to={`/users/${userHandle}`}
          >
            @{userHandle}
          </Typography>
          <hr className={classes.Separator} />
          <Typography variant="body2" color="textSecondary">
              {dayjs(createdAt).format('h: mm a, MMMM DD YYYY')}
          </Typography>
          <hr className={classes.Separator}/>
          <Typography variant="body1">
              {body}
          </Typography>
          <LikeButton postId={postId}/>
          <span>
            {likeCount} {likeCount > 1 || likeCount === 0 ? "Likes" : "Like"}
          </span>
          <MyButton tip="Comments">
            <ChatIcon color="primary" />
          </MyButton>
          <span>
            {commentCount} {commentCount > 1 || commentCount === 0 ? "Comments" : "Comment"}
          </span>
        </Grid>
      </Grid>
    );

    return (
      <Fragment>
        <MyButton
          onClick={this.handleOpen}
          tip="Unfold Post"
          tipClassName={classes.expandButton}
        >
          <UnfoldMore color="primary" />
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
          <DialogContent className={classes.dialogContent}>
            {dialogMarkup}
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

PostDialog.propTypes = {
  getPost: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  post: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.data.post,
  UI: state.UI,
});

const mapActionsToProps = {
  getPost,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(PostDialog));
