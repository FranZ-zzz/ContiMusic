import "bootstrap/dist/css/bootstrap.min.css"
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from "./Login";
import Dashboard from "./Dashboard";
import Playlist from "./Playlist";
import Profile from "./Profile";
import Albums from "./Albums";
import Logout from "./Logout";

const code = new URLSearchParams(window.location.search).get("code");

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          {code ? <Dashboard code={code} /> : <Login />}
        </Route>
        <Route path="/playlist" component={Playlist} />
        <Route path="/profile" component={Profile} />
        <Route path="/albums" component={Albums} />
        <Route path="/logout" component={Logout} />
      </Switch>
    </Router>
  );
}

export default App;