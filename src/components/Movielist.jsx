import React, { useEffect, useState } from "react";
import axios from "axios";
import { Spin } from "antd";
import fakeImg from "./visual.png";
import "./style.css";
import { SearchOutlined } from "@ant-design/icons";
import AOS from "aos";
import "aos/dist/aos.css";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";

AOS.init({
  offset: 120,
  delay: 2,
  duration: 3000,
});

const Movielist = () => {
  const [movie, setmovie] = useState([]);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState("");
  const [moviename, setMoviename] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [searchimg, setSearchimg] = useState("");
  const [alert, setAlert] = useState({ showSnackbar: false });

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        "https://api.themoviedb.org/3/discover/movie?api_key=55903b004b65252bf433fb4218601d2c&language=en-US&sort_by=popularity.desc"
      )
      .then((data) => {
        console.log(data.data.results);
        setmovie(data.data.results);
        setImages(data.data.results.backdrop_path);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const searchMovie = (e) => {
    if (e.key === "Enter") {
      if (moviename === "") {
        setAlert({
          showSnackbar: true,
        });
      } else {
        setLoading(true);
        axios
          .get(
            `https://api.themoviedb.org/3/search/movie?api_key=55903b004b65252bf433fb4218601d2c&query=${moviename}`
          )
          .then((res) => {
            setSearchResult(res.data.results);
            setSearchimg(res.data.results.backdrop_path);
            setLoading(false);
            setMoviename("");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };
  const handleClose = () => {
    setAlert({
      showSnackbar: false,
    });
  };

  if (loading) {
    return (
      <div
        style={{
          margin: 0,
          padding: 0,
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#ececec",
        }}
      >
        <Spin tip="Loading..."></Spin>
      </div>
    );
  }

  return (
    <>
      <div className="search_div">
        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            type="text"
            placeholder="Enter movie name"
            className="search"
            value={moviename}
            onChange={(e) => setMoviename(e.target.value)}
            onKeyPress={(e) => searchMovie(e)}
            required
          />
          <SearchOutlined style={{ fontSize: "1.1rem" }} />
        </div>
      </div>
      <div className="main_search_div">
        {searchResult.length === 0 ? (
          <div className="main_div" data-aos="slide-down">
            {movie.map((data) => (
              <a
                href={`https://www.youtube.com/results?search_query=${data.title}`}
                target="_blank"
                rel="noreferrer"
              >
                <div className="card" key={data.id}>
                  <img
                    src={images ? images : fakeImg}
                    alt=""
                    className="movie_poster"
                  />
                  <p className="title">{data.original_title}</p>
                  <p className="rating">
                    <strong>Rating</strong> :{data.vote_average}
                  </p>
                  <p className="vote">
                    <strong>Vote </strong>: {data.vote_count}
                  </p>
                  <p className="date">
                    <strong>Release Data</strong> : {data.release_date}
                  </p>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="main_div">
            {searchResult.map((search) => (
              <a
                href={`https://www.youtube.com/results?search_query=${search.title}`}
                target="_blank"
                rel="noreferrer"
              >
                <div className="card" key={search.id} data-aos="slide-down">
                  <img
                    src={searchimg ? searchimg : fakeImg}
                    alt=""
                    className="movie_poster"
                  />
                  <p className="title">{search.original_title}</p>
                  <p className="rating">
                    <strong>Rating</strong> :{search.vote_average}
                  </p>
                  <p className="vote">
                    <strong>Vote </strong>: {search.vote_count}
                  </p>
                  <p className="date">
                    <strong>Release Data</strong> : {search.release_date}
                  </p>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
      <Snackbar
        open={alert.showSnackbar}
        message={alert.message}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        onClose={handleClose}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          Please Enter The Movie Name
        </Alert>
      </Snackbar>
    </>
  );
};

export default Movielist;
