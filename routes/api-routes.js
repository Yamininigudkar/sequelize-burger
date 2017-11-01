// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) 
{

  app.get("/", function(req, res) {
  res.redirect("/burgers");
});

  // GET route for getting all of the todos
  app.get("/burgers", function(req, res) 
  {
    // findAll returns all entries for a table when used with no options
    console.log('route working')
    db.burgers.findAll({}).then(function(result) 
    {
      // We have access to the todos as an argument inside of the callback function
      var hbsObject = {burgers: result}
      res.render("index",hbsObject);
    });
  });

  // POST route for saving a new todo
  app.post("/burgers/create", function(req, res) 
  {
    // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just we pass in an object with a text
    // and complete property
    db.burgers.create
    ({
      burger_name: req.body.burger_name,
      devoured: false
    }).then(function(result) 
    {
      // We have access to the new todo as an argument inside of the callback function
      res.redirect('/');
    });
  });

  
  // // PUT route for updating todos. We can get the updated todo data from req.body
  app.put("/burgers/update", function(req, res) 
  {
    // Use the sequelize update method to update a todo to be equal to the value of req.body
    // req.body will contain the id of the todo we need to update
    console.log("devoured",req.body)
    db.burgers.update(
      {

        devoured: true},
      {
        where:{id: req.body.burger_id}
      }).then(function(result){
        res.redirect('/')
        
      })
  });
};
