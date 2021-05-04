import React, { useState, useEffect } from "react";
import axios from "axios";
import "./home.css";

export default function Home() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://newsapi.org/v2/top-headlines?country=in&category=health&apiKey=cd4f72e2c6084071aab8911a8b2643a5"
      )
      .then((res) => {
        setNews(res.data.articles);
      });
  }, []);

  return (
    <div className="home">
      <div className="home_header">
        <h1>Indian Health News Headlines</h1>
      </div>
      <div className="home_news">
        {news != null ? (
          news.map((a) => (
            <div className="news_container">
              {a.urlToImage !== null ? (
                <div className="news">
                  <div className="photo">
                    <a href={a.url} target="blank">
                      <img
                        src={a.urlToImage}
                        width="160px"
                        height="100px"
                        alt=""
                      ></img>
                    </a>
                  </div>
                  <div classNam="news_text">
                    <div className="title">
                      <a href={a.url} target="blank">
                        {a.title}
                      </a>
                    </div>
                    <div className="author">
                      {a.source.name != null ? (
                        <div>source: {a.source.name}</div>
                      ) : (
                        <div></div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          ))
        ) : (
          <div>no news available</div>
        )}
      </div>

      <div className="footer"></div>
    </div>
  );
}
