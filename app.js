const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();


const items = ["Buy Food", "Cook Food", "Eat Food"]; // Initialize arrays to store items and work items
const workItems = [];


app.set('view engine', 'ejs'); // Set the view engine to EJS

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public")); // Serve static files from the 'public' directory

// Define a route for the root URL
app.get("/", function(req, res) {
  // Get the current date
  const day = date.getDate();

  // Render the 'list' template
  res.render("list", {
    listTitle: day,
    newListItems: items
  });
});

// Handle POST requests
app.post("/", function(req, res) {
   const item = req.body.newItem;

   // Check if the submitted item belongs to the 'work' list
   if (req.body.list === "work") {

     // Add the item to the workItems array
     workItems.push(item);
     // Redirect to the '/work'
     res.redirect("/work");

   }else {

     // Add the item to the items array
     items.push(item);
     // Redirect to the root ("/")
     res.redirect("/");

   }
});

// Define a route for the "/work" URL
app.get("/work", function(req, res) {
  // Render the 'list' template
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

// Define a route for the "/about" URL
app.get("/about", function(req, res) {
  // Render the 'about' template
  res.render("about");
});

// Start the server on port 3000 and show a message when it starts
app.listen(3000, function() {
  console.log("Server started on port 3000");
});
