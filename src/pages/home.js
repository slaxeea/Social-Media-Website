import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import CircularProgress from '@material-ui/core/CircularProgress';

import Post from "../components/Post"

export class home extends Component {
  state = {
    posts: null,
  };
  componentDidMount() {
    axios
      .get("/posts")
      .then((res) => {
        this.setState({
          posts: res.data,
        });
      })
      .catch((err) => {
        console.log(`There was an error fetching the data: ${err}`);
      });
  }

  render() {
    let recentPosts = this.state.posts ? (
        this.state.posts.map((post) => <Post post={post} key={post.postId}/>)
    ) : (
      <div>
      <p>Loading posts...</p>
      <CircularProgress  color="primary" size={30}></CircularProgress>
      </div>
    );
    return (
      <Grid container spacing={2}>
        <Grid item sm={8} xs={12}>
          {recentPosts}
        </Grid>
        <Grid item sm={4} xs={12}>
          <p>Profile</p>
        </Grid>
      </Grid>
    );
  }
}
  

export default home;
