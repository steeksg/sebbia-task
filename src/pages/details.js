import React, { useEffect } from "react";
import {
  Card,
  CircularProgress,
  Typography,
  CardContent,
} from "@material-ui/core";

import { connect } from "react-redux";
import { fetchDetails } from "../redux/slices/details";
import { setNamePage } from "../redux/slices/design";

function DetailsPage(props) {
  const { isLoaded, news, fetchDetails, selectedNews, setNamePage } = props;

  useEffect(() => {
    fetchDetails(
      `http://testtask.sebbia.com/v1/news/details?id=${selectedNews}`
    );
  }, [selectedNews]);

  useEffect(() => {
    setNamePage("Детали");
  });

  const Stub = () => {
    return <CircularProgress />;
  };

  const Details = () => {
    return (
      <>
        <Card>
          <CardContent>
            <Typography variant="h5" component="h2">
              {news.title}
            </Typography>
            <Typography>{news.shortDescription}</Typography>
            <Typography variant="body2" component="p">
              <div
                dangerouslySetInnerHTML={{ __html: news.fullDescription }}
              ></div>
            </Typography>
          </CardContent>
        </Card>
      </>
    );
  };

  return news ? <Details /> : <Stub />;
}

function mapStateToProps(state) {
  return {
    news: state.details.news,
    isLoaded: state.details.isLoaded,
    selectedNews: state.news.selectedNews,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchDetails: (endPoint) => dispatch(fetchDetails(endPoint)),
    setNamePage: (namePage) => dispatch(setNamePage(namePage)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailsPage);
