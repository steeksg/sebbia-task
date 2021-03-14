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

import { fetchNews, setSelectedNews, setPaginationActivity } from "../redux/slices/news";
import Pagination from "../components/pagination/pagination";

function NewsPage(props) {
  const {
    isLoaded,
    list,
    fetchNews,
    currentCategoryID,
    setSelectedNews,
    setPaginationActivity,
    paginationActivity
  } = props;

  const [currentPage, setCurrentPage] = useState(0);

  let history = useHistory();

  useEffect(() => {
    fetchNews(
      `http://testtask.sebbia.com/v1/news/categories/${currentCategoryID}/news?page=${currentPage}`
    );
  }, [currentCategoryID, currentPage]);

  useEffect(() => {
    setPaginationActivity({...paginationActivity, decrement: !!currentPage})
  }, [currentPage]);

  useEffect(() => {
    fetch(
      `http://testtask.sebbia.com/v1/news/categories/${currentCategoryID}/news?page=${
        currentPage + 1
      }`
    ).then((res) => {
      return res.json().then((res) => {
        if (res.list && res.list.length > 0) {
          setPaginationActivity({increment: true})
        } else {
          setPaginationActivity({increment: false})
        }
      });
    });
  }, [currentPage]);

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

  const incrementHandler = () => {
    setCurrentPage(currentPage + 1);
  };

  const decrementHandler = () => {
    if (currentPage !== 0) {
      setCurrentPage(currentPage - 1);
    } else {
      setCurrentPage(0);
    }
  };

  return (
    <>
      {list ? <ListNews /> : <Stub />}
      <Pagination
        increment={incrementHandler}
        decrement={decrementHandler}
        type={paginationActivity}
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
    paginationActivity: state.news.paginationActivity
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchNews: (endPoint) => dispatch(fetchNews(endPoint)),
    setSelectedNews: (id) => dispatch(setSelectedNews(id)),
    setPaginationActivity: (paginationActivity) =>
      dispatch(setPaginationActivity(paginationActivity)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsPage);
