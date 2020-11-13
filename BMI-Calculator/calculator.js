//jshint esversion:6
const express = require("express");
const bodyParser = require ("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended: true }));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});
app.post("/", function(req,res){
  var num1 = Number(req.body.num1); //these are parsed as text by the body-parser. We need to type cast num1 and num2 to integer.
  var num2 = Number(req.body.num2); //these are parsed as text by the body-parser. We need to type cast num1 and num2 to integer.
  var sum = num1/(num2*num2);
  res.send("The Sum of the two numbers give is "+ sum);
});
app.get("/bmicalculator", function(req, res){
  res.sendFile(__dirname + "/bmicalculator.html");
});
app.post("/bmicalculator", function(req,res){
  var num1 = parseFloat(req.body.num1); //these are parsed as text by the body-parser. We need to type cast num1 and num2 to integer.
  var num2 = parseFloat(req.body.num2); //these are parsed as text by the body-parser. We need to type cast num1 and num2 to integer.
  var sum = num1/(num2*num2);
  res.send("Your BMI is "+ sum);
});

// app.get("/bmicalculator", function(req, res){
//   res.sendFile(__dirname + "/bmicalculator.html");
// });
// app.post("/bmicalculator", function(req,res){
//   var weight = parseFloat(req.body.weight);
//   var height = parseFloat(req.body.height);
//   var bmi = (weight/(height*height));
//   res.send("Your BMI is "+ bmi);
// });



app.listen(3000, function(){
  console.log("Sir! The calculator server is now up at port 3000!");
});
//any port can be chosen. not just 3000
// line 5 checks in the current file (calculator.js file)
// location with + we can add index.html file path as shown here
