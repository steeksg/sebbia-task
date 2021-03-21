import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import "./App.scss";
import CategoriesPage from "./pages/categories";
import NewsPage from "./pages/news";
import DetailsPage from "./pages/details";
import { AppBar, Toolbar, Typography} from "@material-ui/core";

function App(props) {
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            {props.namePage}
          </Typography>
        </Toolbar>
      </AppBar>
      <BrowserRouter>
        <Switch>
          <Route path="/categories" component={CategoriesPage} />
          <Route path="/news/:id" component={NewsPage} />
          <Route path="/details" component={DetailsPage} />
          <Redirect push to="/categories" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    namePage: state.design.namePage,
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
