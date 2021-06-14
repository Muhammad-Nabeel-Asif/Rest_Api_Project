const express = require("express");
const app = express();
const path = require("path");
const { v4: uuid } = require("uuid");
const methodOverride = require("method-override");

// parsing body with urlencoded method && json file as well
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

// setting up the views directory and joining to combine the route for file access.
app.set("/views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

let comments = [
  {
    id: uuid(),
    username: "Nabeel",
    comment: "Heheheehehhehe , here is my comment !",
  },
  {
    id: uuid(),
    username: "Asif",
    comment: "Heheheehehhehe , here is my comment !",
  },
  {
    id: uuid(),
    username: "Adeel",
    comment: "Heheheehehhehe , here is my comment !",
  },
  {
    id: uuid(),
    username: "Hadi",
    comment: "Heheheehehhehe , here is my comment !",
  },
];

// we are rendering comments from above comments array to a ejs file => index.ejs when we receive a get request for '/comments'

app.get("/comments", (req, res) => {
  res.render("comments/index", { comments });
});

// creating route for adding new comments :
// {
app.get("/comments/new", (req, res) => {
  res.render("comments/new");
});
// sending post request to retrieve data from form and do opr on it and use it :
app.post("/comments", (req, res) => {
  const { username, comment } = req.body;
  comments.push({ username, comment, id: uuid() });
  res.redirect("/comments");
});
// }

// request to take comment id from user and then find and match the id from above comments array and show the corresponding detail of that id :
app.get("/comments/:id", (req, res) => {
  const { id } = req.params;
  const comment = comments.find((c) => c.id === id);
  res.render("comments/show", { comment });
});

// to update comments , we use patch request :
app.patch("/comments/:id", (req, res) => {
  const { id } = req.params;
  const newCommentText = req.body.comment;
  const foundComment = comments.find((c) => c.id === id);
  foundComment.comment = newCommentText;
  res.redirect("/comments");
});

// update comments using form and method override http in it  :
app.get("/comments/:id/edit", (req, res) => {
  const { id } = req.params;
  const comment = comments.find((c) => c.id === id);
  res.render("comments/edit", { comment });
});

// delete the comment using the corresponding id given in req.params
app.delete("/comments/:id", (req, res) => {
  const { id } = req.params;
  comments.filter((c) => c.id !== id);
  res.redirect("/comments");
});

app.get("*", (req, res) => {
  res.send("sorry nothing found :)");
});

app.listen(3000, () => {
  console.log("listening at port 3000");
});
