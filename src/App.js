import React from "react";
import './App.css';
import Dashboard from './Pages/Dashboard';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import EditLocalGuide from "./Components/EditLocalGuide/EditLocalGuide";


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
            <Route exact path="/">
              <Dashboard/>
            </Route>
            <Route path="/AElocalGuides">
              <EditLocalGuide/>
            </Route>
          </Switch>
      </Router>
    </div>
  );
}

export default App;
