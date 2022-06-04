let yelpContainerEl = document.getElementById("yelp-id");
let yelpSearchForm = document.getElementById("yelp-food-search");
let restaurantSearchInput = document.getElementById("foodType");
let searchBtn = document.getElementById("submit-btn");
let foodSearchResultsEl = document.getElementById("restaurant-results");
let foodHistoryEl = document.getElementById("food-saved-results");
let testCity = "Denver";
let cityName = document.getElementById("city-name");

let testFood = "Indian";



let searchYelpApi = function(event) {
    event.preventDefault();
    console.log(event);

    let cityInput = cityName.value;
    cityName = "";

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

            let cardInfo = data.businesses;
                console.log({cardInfo}); 


            for(let i = 0; i < data.length; i++) {
                let element = cardInfo[i];
            }
            let restaurantNameEl = document.createElement("h4");
            let phoneEl = document.createElement("p");
            let imageEl = document.createElement("img");
            let locationEl = document.createElement("p");
            let ratingEl = document.createElement("p");
            let priceEl = document.createElement("p");
            let urlEl = document.createElement("p");

            let restaurantName = element.name;
            let phone = element.phone;
            let rating = element.rating;
            let price = element.price;
            let location = element.location;
            let image = element.image_url;
            
        });
        

}
 
searchBtn.addEventListener("click", searchYelpApi);       
        




