import React from "react";
import "./HomeScreen.css";
import Nav from "../Nav";
import Banner from "../Banner";
import requests from "../Request";
import Row from "../Row";

const HomeScreen = () => {
  return (
    <div className="homeScreen">
      <Nav />

      <Banner />

      <Row
        title="Trending Now"
        fetchURL={requests.fetchTrending}
        isLargeRow
        isBigger
      />

      <Row
        title="Top Rated Movies"
        fetchURL={requests.fetchTopRated}
        isLargeRow
      />
      <Row
        title="Action Movies"
        fetchURL={requests.fetchActionMovies}
        isLargeRow
      />
      <Row
        title="Comedy Movies"
        fetchURL={requests.fetchComedyMovies}
        isLargeRow
      />
      <Row
        title="Horror Movies"
        fetchURL={requests.fetchHorrorMovies}
        isLargeRow
      />
      <Row
        title="Romance Movies"
        fetchURL={requests.fetchRomanceMovies}
        isLargeRow
      />
      <Row
        title="Documentaries"
        fetchURL={requests.fetchDocumentaries}
        isLargeRow
      />
    </div>
  );
};

export default HomeScreen;
