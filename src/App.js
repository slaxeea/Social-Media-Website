import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import axios from "axios";

// Import Components
import Navbar from "./components/Navbar";
import AuthRoute from "./components/AuthRoute";

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

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#1a237e",
    },
    secondary: {
      main: "#ff6f00",
    },
  },
  typography: {
    useNextVariants: true,
  },
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
    position: "relative",
  },
  customError: {
    color: "red",
    fontSize: "0.8 rem",
  },
  progress: {
    position: "absolute",
    margin: "10px auto auto 5px",
  },
});

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
