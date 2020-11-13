//jshint esversion:6
const express = require ("express");
const https = require ("https");//we dont have to install https, cuz it comes in our node bundle
const bodyParser = require("body-parser"); //bodyParser allows to look inside the body of the post request gotten by the server,
//and fetech the data based on name of the input in the HTML, here it is cityName :)
const app = express();


app.use(bodyParser.urlencoded({extended: true})); // necessary code to start parsing through the body of the post request.


app.get("/", function(req,res){
  res.sendFile(__dirname +"/index.html");
});
app.post("/", function(req, res){
  console.log(req.body.cityName);

  const query =req.body.cityName;
  const unit ="metric";
  const apiKey ="394d682e408915f3066a9fc1fb2d0b32";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;
  https.get(url, function (response){
    console.log(response.statusCode);
    response.on("data", function(data){
      console.log(data);
      const weatherData=JSON.parse(data);
      console.log(weatherData);
      const temperature = weatherData.main.temp;
      console.log(temperature);
      const weatherDescription = weatherData.weather[0].description; //weather is an array - hence wwather[0];
      console.log(weatherDescription);
      const icon = weatherData.weather[0].icon;
      const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<p>The weather is currently " + weatherDescription+ "</p>");
      res.write("<h1>The temperature in "+query+" is " + temperature + " degree Celsius.</h1>");
      res.write("<img src=" + imageUrl+ ">");
      res.send();
      // const object = {
      //   name: "Harsha",
      //   fav: "ChickenBiriyani"
      // };
      // console.log(object);
      // console.log(JSON.stringify(object));


    });
  });
  //res.send("Server is up and running, we are updating and will give you what you want in a while"); // we cant have two sends active,
  //once the send is done, it's over. Hence, commenting this to send the temperature to the customer






  //console.log("Sir, I received the post from index.html :)");
});//catching the value posted to root route via app.post









app.listen(3000, function(){
  console.log("Sir! server is up at the port 3000");
});
