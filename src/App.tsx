import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import "typeface-roboto";
import "./App.css";
import {
  CardContent,
  Typography,
  CardActions,
  Button,
  IconButton,
} from "@material-ui/core";
import TwitterIcon from "@material-ui/icons/Twitter";
interface RandomQuote {
  quote: string;
  author: string;
}
let randomQuotes: RandomQuote[] = [];
const App: React.FC = () => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const quotesURL =
    "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";
  const getRandomQuotes = function () {
    return fetch(quotesURL)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        return json.quotes;
      });
  };
  const setRandomQuote = function () {
    if (randomQuotes.length > 0) {
      let randomIdx = Math.round(Math.random() * randomQuotes.length);
      let randomQuote = randomQuotes[randomIdx];
      if (randomQuote) {
        setQuote(randomQuote.quote);
        setAuthor(randomQuote.author);
      }
    }
  };
  // useEffect gets called after the very first render.
  useEffect(() => {
    if (randomQuotes.length === 0) {
      getRandomQuotes().then((quotes) => {
        randomQuotes = quotes;
        setRandomQuote();
      });
    }
  }, []); // passing an empty array as second argument to useEffect makes sure that it gets called only on first render

  const postTweet = function () {
    let tweetConent = `https://twitter.com/intent/tweet?text="${quote}" - ${author}`;
    window.open(tweetConent, "_blank");
  };
  return (
    <div className="container">
      <Card id="quote-box">
        <CardContent>
          <Typography id="author" variant="h5" gutterBottom component="h2">
            {author}
          </Typography>
          <Typography id="text" variant="body1" component="h2">
            <q>{quote}</q>
          </Typography>
        </CardContent>
        <CardActions>
          <div className="actions">
            <IconButton id="tweet-quote" onClick={postTweet}>
              <TwitterIcon color="secondary" />
            </IconButton>
            <Button
              style={{ marginLeft: "auto", flexShrink: 1, height: 40 }}
              id="new-quote"
              onClick={setRandomQuote}
              color="primary"
              variant="contained"
            >
              New Quote
            </Button>
          </div>
        </CardActions>
      </Card>
      <div></div>
    </div>
  );
};

export default App;
