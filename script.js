$(document).ready(function () {
  console.log("ready!");
  // This is our API key//
  var APIkey = "166a433c57516f51dfab1f7edaed8413";
  //search value//
  let searchvalue = "";
  $("#search-button").on("click", function (event) {
    event.preventDefault();
    console.log("click");
    searchvalue = $("#search-value").val();
    console.log(searchvalue);
    getWeather(searchvalue);
    getfivedays(searchvalue);
  });
  //get uv index//
  function getUvIndex(lat, lon) {
    let url =
      "https://api.openweathermap.org/data/2.5/uvi?lat=" +
      lat +
      "&lon=" +
      lon +
      "&appid=" +
      APIkey;
    $.ajax({
      url: url,
      method: "GET",
    }).then(function (response) {
      $("#uv-index").text(response.value);
      console.log(response);
    });
   //get five day forecast// 
  }
  function getfivedays(searchterm) {
    let url = `https://api.openweathermap.org/data/2.5/forecast?q=${searchterm}&appid=${APIkey}`;
    $.ajax({
      url: url,
      method: "GET",
    }).then(function (response) {
      $("#getfivedays").text(response.value);
      console.log(getfivedays);
    });
  }
  //get current weather//
  function getWeather(searchterm) {
    var queryURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      searchterm +
      "&appid=" +
      APIkey;
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
        console.log(queryURL);
        

        // Log the resulting object//
        console.log(response);
        getUvIndex(response.coord.lat, response.coord.lon);
    
        // Transfer content to HTML
        $(".city").html("<h1>" + response.name + " Weather Details</h1>");
        $(".wind").text("Wind Speed: " + response.wind.speed);
        $(".humidity").text("Humidity: " + response.main.humidity);
    
        // Convert the temp to fahrenheit
        var tempF = (response.main.temp - 273.15) * 1.8 + 32;
    
        // add temp content to html
        $(".temp").text("Temperature (K) " + response.main.temp);
        $(".tempF").text("Temperature (F) " + tempF.toFixed(2));
    
        // Log the data in the console as well
        console.log("Wind Speed: " + response.wind.speed);
        console.log("Humidity: " + response.main.humidity);
        console.log("Temperature (F): " + tempF);
    });

   
  }
});
