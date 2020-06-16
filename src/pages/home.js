import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';

// import the post and profile sections
import Post from "../components/Post"
import Profile from "../components/Profile";

import { connect } from 'react-redux';
import {getPosts} from '../redux/actions/dataActions';

export class home extends Component {

  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    const { posts, loading } = this.props.data;
    let recentPosts = !loading && posts.lenght > 0 ? (
        posts.map((post) => <Post post={post} key={post.postId}/>)
    ) : (
      <div>
      <p>Loading posts...</p>
      <CircularProgress  color="primary" size={30}></CircularProgress>
      </div>
    );

    return (
      <Grid container spacing={6}>
        <Grid item sm={8} xs={12}>
          {recentPosts}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}

home.propTypes = {
  getPosts: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
}
  
const mapStateToProps = state => ({
  data: state.data
})

export default connect(mapStateToProps, { getPosts } )  ( home );
