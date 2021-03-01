import React, { useEffect } from "react";
import { List, ListItem, ListItemText, Divider } from "@material-ui/core";

import { connect } from "react-redux";
import { fetchCategories } from "../redux/slices/categories";

function CategoriesPage(props) {
  const { isLoaded, categories, fetchCategories } = props;

  useEffect(() => {
    if (!isLoaded)
      fetchCategories("http://testtask.sebbia.com/v1/news/categories");
  });

  const Stub = () => {
    return <div> Идёт загрузка данных... </div>;
  };

  const Row = ({ category }) => {
    return (
      <>
        <ListItem button>
          <ListItemText primary={category.name} />
        </ListItem>
        <Divider />
      </>
    );
  };

  const ListCategories = () => {
    return (
      <List>
        {categories.map((category) => {
          return <Row key={category.id} category={category} />;
        })}
      </List>
    );
  };

  return categories ? <ListCategories /> : <Stub />;
}

function mapStateToProps(state) {
  return {
    categories: state.categories.list,
    isLoaded: state.categories.isLoaded,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCategories: (endPoint) => dispatch(fetchCategories(endPoint)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesPage);
