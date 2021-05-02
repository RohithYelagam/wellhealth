import React, { useState,useEffect }from 'react'
import axios from "axios";
import "./home.css";


export default function Home() {
    const [news ,setNews] = useState([]);

    useEffect(() => {
        axios.get('https://newsapi.org/v2/top-headlines?country=in&category=health&apiKey=cd4f72e2c6084071aab8911a8b2643a5').then((res)=>{
            setNews(res.data.articles);
            console.log(res.data.articles[0].url);
        })
    }, [])

    return (
        <div className="home">
            <div className="home_header"><h1>Indian Health News Headlines</h1></div>
            <div className="home_news">
                {
                    news!=null?(
                            news.map((a)=>(
                                <div className="news">
                                <div className="photo"><a href={a.url} target="blank"><img src={a.urlToImage} width="160px" height="100px"></img></a></div>
                                <div classNam="news_text">
                                <div className="title"><a href={a.url} target="blank">{a.title}</a></div>
                                <div className="author">{a.author!=null?(<div>written by {a.author}</div>):(<div></div>)}</div></div>
                                </div>
                            ))
                    ):(
                        <div></div>
                    )
                }
            </div>
        </div>
    )
}
