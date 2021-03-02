import React, { useEffect } from "react";
import { List, ListItem, ListItemText, Divider, CircularProgress } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

import { fetchNews, setSelectedNews } from "../redux/slices/news";

function NewsPage(props) {
  const { isLoaded, list, fetchNews, currentCategoryID, currentPage, setSelectedNews } = props;

  let history = useHistory();

  useEffect(() => {
    fetchNews(
      `http://testtask.sebbia.com/v1/news/categories/${currentCategoryID}/news?page=${currentPage}`
    );
  }, [currentCategoryID]);

  const Stub = () => {
    return <CircularProgress/>;
  };

  const Row = ({ item }) => {

    const handleClick = () => { 
      setSelectedNews(item.id);
      history.push("/details");
    }

    return (
      <>
        <ListItem button onClick={handleClick}>
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
    setSelectedNews: (id) => dispatch(setSelectedNews(id))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsPage);
