import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import axios from "axios";

import Post from "../components/Post"

export class home extends Component {
  state = {
    posts: null,
  };
  componentDidMount() {
    axios
      .get("/posts")
      .then((res) => {
        console.log(res.data);
        this.setState({
          posts: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    let recentPosts = this.state.posts ? (
        this.state.posts.map((post, i) => <Post post={post} key= {i}/>)
    ) : (
      <p>Loading posts...</p>
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
