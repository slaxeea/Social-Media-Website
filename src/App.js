import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

// Import Components
import Navbar from "./components/Navbar";

// Import all the pages
import home from "./pages/home";
import login from "./pages/login";
import signup from "./pages/signup";

const theme = createMuiTheme(
  {
    palette: {
      primary: {
        main: '#1a237e',
      },
      secondary: {
        main: '#ff6f00',
      }
    },
    typography: {
      useNextVariants: true
    }
  }
)

function App() {
  return (
    <MuiThemeProvider theme={theme} >
      <div className="App">
      <Router>
      <Navbar />
        <div className="container">         
          <Switch>
            <Route exact path="/" component={home} />
            <Route exact path="/login" component={login} />
            <Route exact path="/signup" component={signup} />
          </Switch>
        </div>
      </Router>
    </div>
    </MuiThemeProvider>
  );
}

export default App;
