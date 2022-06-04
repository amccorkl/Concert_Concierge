var cityName = document.getElementById("city-name");
var testCity = "Denver";

// Create a new yelpAPI object with your API key
var yelpRequestURL = `https://api.yelp.com/v3/businesses/search?location=Denver&term=food&categories=food`;
console.log(yelpRequestURL);

var yelpApiKey =
  "zjzCcRjFdB51w-cAx9BNvLkPUrZv7SxLzuEioFbVaIUNUvoYM8sekjD5xJUyqYlkA77que94UbQG8U5dv6OQprKQn_v-mRGul4UX0LUo5RULjXPqHWoKTeug5GSVYnYx";

fetch(yelpRequestURL, {
  method: "GET",
  headers: {
    Authorization: `Bearer ${yelpApiKey}`,
    CacheControl: 'no-cache',
    

    

  },
  mode: 'no-cors'
  // console.log("get request")
});


// fetch(yelpRequestURL)
//         .then(function (response) {
//             return response.json();
//         })
//         .then(function(data) {
//             console.log(data);
//         })
