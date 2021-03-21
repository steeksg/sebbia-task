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
  const { news, fetchDetails, selectedNews, setNamePage } = props;

  useEffect(() => {
    fetchDetails(
      `http://testtask.sebbia.com/v1/news/details?id=${selectedNews}`
    );
  }, [selectedNews, fetchDetails]);

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
            <Typography variant="h4" component="h2">
              {news.title}
            </Typography>
            <Typography variant="body1">{news.shortDescription}</Typography>
            <div
              dangerouslySetInnerHTML={{ __html: news.fullDescription }}
            ></div>
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
