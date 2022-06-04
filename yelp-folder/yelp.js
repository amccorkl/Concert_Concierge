let yelpContainerEl = document.getElementById("yelp-id");
let yelpForm = document.getElementById("food-form");
let restaurantSearch = document.getElementById("restaurant");
let searchBtn = document.getElementById("submit-btn");
let restSearchResults = document.getElementById("restaurant-results");
let foodHistoryEl = document.getElementById("saved-results");
let testCity = "Denver";
let testFood = "Indian";


// let yelpQueryUrl = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search`;

// let yelpRequestURL = "https://api.yelp.com/v3/businesses/search?term=food,restaurants,drink,cafes&categories=food,All&location=${testCity}" 

let yelpApiKey = 'zjzCcRjFdB51w-cAx9BNvLkPUrZv7SxLzuEioFbVaIUNUvoYM8sekjD5xJUyqYlkA77que94UbQG8U5dv6OQprKQn_v-mRGul4UX0LUo5RULjXPqHWoKTeug5GSVYnYx';

let proxyUrl = 'https://cors-anywhere.herokuapp.com/';

let yelpQueryUrl = `https://api.yelp.com/v3/businesses/search?location=${testCity}&term=${testFood}`;
    //default is 20 restaurants
    //term=${testFood}
    //&radius=30&sort_by=rating
    
    //appending fetch headers for api request
    let myHeaders = new Headers();
    myHeaders.append("method", "GET");
    myHeaders.append("Authorization", `Bearer ${yelpApiKey}`);

    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("mode", "no-cors");
    myHeaders.append("Access-Control-Allow-Origin", "*");
    

    fetch(proxyUrl + yelpQueryUrl, {
        headers: myHeaders,
    })
        .then(function(response){
            console.log({response});
            return response.json();
        })
        .then(function(data) {
            // renderRestaurants(data);
            console.log(data);
        });
        
        
        





// 

//other callbacks
// $.ajax({
//     url: proxyUrl + yelpQueryUrl,
//     method: 'GET',
//     headers: {
//         "accept": "application/json",
//         "x-requested-with": "xmlhttprequest",
//         "Access-Control-Allow-Origin": "*",
//         "Authorization": `Bearer ${yelpApiKey}`
//     }
        
// }).then (function (response) {
//         return response.json();
// }).then(function(data) {
//         console.log(data);
// });

