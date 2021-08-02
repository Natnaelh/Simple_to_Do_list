// jshint esversion:6

const express = require('express');
const app = express();
const https = require('https');
const bodyParser = require('body-parser');
// const path = require('path');
const date = require(__dirname + '/date');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

let items = ["Prayer"];
let workItems = [];

app.get("/", function(req, res) {

  let day = date.getDate();
  res.render('list', {
    listTitle: day,
    newListItem: items
  });
});

app.post("/", function(req, res) {
  let item = req.body.newItem;
  if (item === "" && req.body.list === "Work") {
    res.redirect('/work')
  } else if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect('/work');
  } else if (item === "" && req.body.list !== "Work") {
    res.redirect('/');

  } else {
    items.push(item);
    res.redirect("/");

  }

});

app.get('/work', function(req, res) {
  res.render('list', {
    listTitle: "Work Items",
    newListItem: workItems
  });
});

app.get('/about', function(req, res) {
  res.render('about');
})

app.listen(5500, function() {
  console.log("Listening on port 5500.");
});









// if (currentDay === 0) {
//   day = "Sunday"
//   res.render("list", {
//     kindOfDay: day
//   })
// } else if (currentDay === 1) {
//     day = "Monday"
//     res.render("list", {
//       kindOfDay: day
//     })
// }
// else if(currentDay===2){
//   day = "Tuesday"
//   res.render("list", {
//     kindOfDay: day
//   })
// }
// else if (currentDay === 3) {
//   day = "Wednesday"
//     res.render('list',{
//       kindOfDay:day
//     })
// }
// else if(currentDay === 4){
//   day = "Thursday"
//   res.render("list",{
//     kindOfDay:day
//   })
// }
// else if (currentDay === 5) {
//   day = "Friday"
//   res.render("list",{
//     kindOfDay:day
//   })
// }
// else{
//   day = "Saturday"
//   res.render('list', {
//     kindOfDay:day
//   })
// }









// app.post("/", function(req, res){
//   const cityName = req.body.cityName;
//   const unit = "metric";
//   const API_id = "a5555d4c383feac48b16e712a84ae622";
//   var url  = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid="+API_id+"&units="+unit+"";
//   https.get(url, function(response){
//     response.on("data", function(data){
//       const WeatherData = JSON.parse(data);
//       // console.log(JSON.stringify(WeatherData));
//       const temp = WeatherData.main.temp;
//       const weatherDescription = WeatherData.weather[0].description;
//       const icon = WeatherData.weather[0].icon;
//       const imageURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
//       res.write("<h1>The weather description in "+cityName+" is "+weatherDescription+"</h1>");
//       res.write("<p>The weather in celsius is "+temp+"</p>");
//       res.write("<img src= "+ imageURL+ ">");
//       res.send();
//     });
//   });
// });
