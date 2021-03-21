import React, { useEffect } from "react";
import { List, ListItem, ListItemText, Divider, CircularProgress } from "@material-ui/core";
import { useHistory } from "react-router-dom";

import { connect } from "react-redux";
import { fetchCategories } from "../redux/slices/categories";
import { setCategoryID } from "../redux/slices/news";
import { setNamePage } from "../redux/slices/design";

function CategoriesPage(props) {
  const { isLoaded, categories, fetchCategories, setCategoryID, setNamePage } = props;

  let history = useHistory(); 

  useEffect(() => {
    if (!isLoaded)
      fetchCategories("http://testtask.sebbia.com/v1/news/categories");
  });

  useEffect(() => {
    setNamePage("Категории");
  });

  const Stub = () => {
    return <CircularProgress/> ;
  };

  const Row = ({ category }) => {
    const handleClick = () => {
      setCategoryID(category.id);
      history.push(`/news/${category.id}`);
    };

    return (
      <>
        <ListItem button onClick={handleClick}>
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
    setCategoryID: (id) => dispatch(setCategoryID(id)),
    setNamePage: (namePage) => dispatch(setNamePage(namePage)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesPage);
