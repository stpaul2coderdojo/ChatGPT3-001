import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  TextField,
} from "@material-ui/core";
import { Link, Favorite } from "@material-ui/icons";

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("https://www.facebook.com/BreakingNews/")
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <Card key={post.id}>
          <CardActionArea component="a" href={post.link}>
            <CardMedia
              style={{ height: 0, paddingTop: "56.25%" }}
              image={post.image}
              title={post.title}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {post.title}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {post.creator}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {post.date}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary" onClick={() => window.open(post.link, "_blank")}>
              <Link />
            </Button>
            <Button size="small" color="secondary">
              <Favorite />
            </Button>
          </CardActions>
          {post.extraData && (
            <div>
              <TextField label="Extra Data" value={post.extraData} />
            </div>
          )}
        </Card>
      ))}
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
