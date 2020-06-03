import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import axios from "axios";
import themeObject from './util/theme';

// Import Components
import Navbar from "./components/Navbar";
import AuthRoute from "./util/AuthRoute";

// Redux stuff
import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTHENTICATED } from "./redux/types";
import { logoutUser, getUserData } from './redux/actions/userActions';

// Import decoding library
import jwtDecode from "jwt-decode";

// Import all the pages
import home from "./pages/home";
import login from "./pages/login";
import signup from "./pages/signup";

const token = localStorage.FBAuthToken;

// Check if there's a token
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    window.location.href = "/login";
    store.dispatch(logoutUser())
  } else {
    store.dispatch({ type: SET_AUTHENTICATED});
    axios.defaults.headers.common['Authorization']=token;
    store.dispatch(getUserData());
  }
}

const theme = createMuiTheme(themeObject);

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={home} />
              <AuthRoute
                exact
                path="/login"
                component={login}
                />
              <AuthRoute
                exact
                path="/signup"
                component={signup}
                />
            </Switch>
          </div>
        </Router>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
