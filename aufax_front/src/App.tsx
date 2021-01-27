import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import { Home } from "./feature/aufax/screen";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/x" exact component={Home} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
