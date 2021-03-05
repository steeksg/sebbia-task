import React, { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  CircularProgress,
} from "@material-ui/core";
// import { Pagination } from "@material-ui/lab";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

import {
  fetchNews,
  setSelectedNews,
  setCurrentPage,
} from "../redux/slices/news";
import Pagination from "../components/pagination/pagination";

function NewsPage(props) {
  const {
    isLoaded,
    list,
    fetchNews,
    currentCategoryID,
    currentPage,
    setCurrentPage,
    setSelectedNews,
  } = props;

  const [typePage, setTypePage] = useState({
    increment: true,
    decrement: false,
  });

  let history = useHistory();

  useEffect(() => {
    fetchNews(
      `http://testtask.sebbia.com/v1/news/categories/${currentCategoryID}/news?page=${currentPage}`
    );

    fetch(
      `http://testtask.sebbia.com/v1/news/categories/${currentCategoryID}/news?page=${
        currentPage - 1
      }`
    ).then((res) => {
      return res.json().then((res) => {
        if (res.list && res.list.length > 0) {
          setTypePage({ ...typePage, decrement: true });
        } else {
          setTypePage({ ...typePage, decrement: false });
        }
      });
    });

    fetch(
      `http://testtask.sebbia.com/v1/news/categories/${currentCategoryID}/news?page=${
        currentPage + 1
      }`
    ).then((res) => {
      return res.json().then((res) => {
        if (res.list && res.list.length > 0) {
          setTypePage({ ...typePage, increment: true });
        } else {
          setTypePage({ ...typePage, increment: false });
        }
      });
    });

  }, [currentCategoryID, currentPage]);

  const Stub = () => {
    return <CircularProgress />;
  };

  const Row = ({ item }) => {
    const handleClick = () => {
      setSelectedNews(item.id);
      history.push("/details");
    };

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

  return (
    <>
      {list ? <ListNews /> : <Stub />}
      <Pagination
        increment={() => setCurrentPage(currentPage + 1)}
        decrement={() => setCurrentPage(currentPage - 1)}
        type={typePage}
      />
      {/* <Pagination
        count={10}
        color="primary"
        onChange={(event, value) => setCurrentPage(value-1)}
      /> */}
    </>
  );
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
    setSelectedNews: (id) => dispatch(setSelectedNews(id)),
    setCurrentPage: (page) => dispatch(setCurrentPage(page)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsPage);
