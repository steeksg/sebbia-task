import React, { useEffect } from "react";
import { List, ListItem, ListItemText, Divider } from "@material-ui/core";

import { connect } from "react-redux";
import { fetchNews } from "../redux/slices/news";

function NewsPage(props) {
  const { isLoaded, list, fetchNews, currentCategoryID, currentPage } = props;

  useEffect(() => {
    fetchNews(
      `http://testtask.sebbia.com/v1/news/categories/${currentCategoryID}/news?page=${currentPage}`
    );
  }, [currentCategoryID]);

  const Stub = () => {
    return <div> Идёт загрузка данных... </div>;
  };

  const Row = ({ item }) => {
    return (
      <>
        <ListItem button>
          <ListItemText primary={item.title} />
        </ListItem>
        <Divider />
      </>
    );
  };

  const ListNews = () => {
    return (
      <List>
        {list.map((item) => {
          return <Row key={item.id} item={item} />;
        })}
      </List>
    );
  };

  return list ? <ListNews /> : <Stub />;
}

function mapStateToProps(state) {
  return {
    list: state.news.list,
    isLoaded: state.news.isLoaded,
    currentCategoryID: state.news.currentCategoryID,
    currentPage: state.news.currentPage,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchNews: (endPoint) => dispatch(fetchNews(endPoint)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsPage);
