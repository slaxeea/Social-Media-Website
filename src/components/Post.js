// Mui stuff
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";

// Icons
import ChatIcon from "@material-ui/icons/Chat";

// React stuff
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

// Libraries
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";

// Components
import MyButton from "../util/MyButton";
import DeletePost from "./DeletePost";
import PostDialog from './PostDialog';
import LikeButton from "./LikeButton";

const styles = {
  card: {
    position:"relative",
    display: "flex",
    marginBottom: 20,
  },
  image: {
    minWidth: 200,
    //height: 120,
  },
  content: {
    padding: 25,
    objecFit: "cover ",
  },
};

class Post extends Component {
 

  render() {
    dayjs.extend(relativeTime);

    const {
      classes,
      post: {
        body,
        createdAt,
        userImage,
        userHandle,
        postId,
        likeCount,
        commentCount,
      },
      user: {
        authenticated,
        credentials: { handle },
      },
    } = this.props;

    const deleteButton =
      authenticated && userHandle === handle ? (
        <DeletePost postId={postId} />
      ) : null; // Not authenticated

    return (
      <Card className={classes.card}>
        <CardMedia
          image={userImage}
          title="Profile image"
          className={classes.image}
          alt="Profile image"
        />
        <CardContent className={classes.content}>
          <Typography
            variant="h5"
            component={Link}
            to={`/users/${userHandle}`}
            color="primary"
          >
            {userHandle}
          </Typography>
          {deleteButton}
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography variant="body1">{body}</Typography>
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
          <PostDialog postId={postId} userHandle={userHandle} />
        </CardContent>
      </Card>
    );
  }
}

Post.propTypes = {
  user: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(
  mapStateToProps
)(withStyles(styles)(Post));
