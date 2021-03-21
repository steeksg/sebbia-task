import React, { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  CircularProgress,
  Typography,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

import {
  fetchNews,
  setSelectedNews,
  setPaginationActivity,
} from "../redux/slices/news";

import { setNews } from "../redux/slices/details";
import { setNamePage } from "../redux/slices/design";
import Pagination from "../components/pagination/pagination";

function NewsPage(props) {
  const {
    isLoaded,
    list,
    fetchNews,
    currentCategoryID,
    setSelectedNews,
    setPaginationActivity,
    paginationActivity,
    setNamePage,
    setNews,
  } = props;

  const [currentPage, setCurrentPage] = useState(0);

  let history = useHistory();

  useEffect(() => {
    fetchNews(
      `http://testtask.sebbia.com/v1/news/categories/${currentCategoryID}/news?page=${currentPage}`
    );
  }, [currentCategoryID, currentPage]);

  useEffect(() => {
    setPaginationActivity({ ...paginationActivity, decrement: !!currentPage });
  }, [currentPage]);

  useEffect(() => {
    fetch(
      `http://testtask.sebbia.com/v1/news/categories/${currentCategoryID}/news?page=${
        currentPage + 1
      }`
    ).then((res) => {
      return res.json().then((res) => {
        if (res.list && res.list.length > 0) {
          setPaginationActivity({ increment: true });
        } else {
          setPaginationActivity({ increment: false });
        }
      });
    });
  }, [currentPage]);

  useEffect(() => {
    setNamePage("Список новостей");
  });

  const Stub = () => {
    return <CircularProgress />;
  };

  const Empty = () => {
    return <div>В данной категории пока нет новостей</div>;
  };

  const Row = ({ item }) => {
    const handleClick = () => {
      setSelectedNews(item.id);
      setNews({ title: item.title, shortDescription: item.shortDescription });
      history.push("/details");
    };

    return (
      <>
        <ListItem button onClick={handleClick}>
          <ListItemText
            primary={item.title}
            secondary={
              <React.Fragment>
                <Typography component="p" variant="body2" color="textPrimary">
                  {item.shortDescription + "  "}
                </Typography>
                <Typography component="p">{item.date}</Typography>
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider />
      </>
    );
  };

  const ListNews = () => {
    return (
      <>
        {list.length != 0 ? (
          <List>
            {list.map((item) => {
              return <Row key={item.id} item={item} />;
            })}
          </List>
        ) : (
          <Empty />
        )}
      </>
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
    </>
  );
}

function mapStateToProps(state) {
  return {
    list: state.news.list,
    isLoaded: state.news.isLoaded,
    currentCategoryID: state.news.currentCategoryID,
    paginationActivity: state.news.paginationActivity,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchNews: (endPoint) => dispatch(fetchNews(endPoint)),
    setSelectedNews: (id) => dispatch(setSelectedNews(id)),
    setPaginationActivity: (paginationActivity) =>
      dispatch(setPaginationActivity(paginationActivity)),
    setNamePage: (namePage) => dispatch(setNamePage(namePage)),
    setNews: (news) => dispatch(setNews(news)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsPage);
