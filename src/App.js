import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import "./App.scss";
import CategoriesPage from "./pages/categories";
import NewsPage from "./pages/news";

function App(props) {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/categories">
            <CategoriesPage />
          </Route>
          <Route path="/news">
            <NewsPage />
          </Route>
          <Redirect push to="/categories" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
