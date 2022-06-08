let yelpSearchForm = document.getElementById("yelp-food-search");
let foodSearch = document.getElementById("foodType");
let foodSearchResultsEl = document.getElementById("restaurant-results");
let foodHistoryEl = document.getElementById("food-saved-results");
let searchBtn = document.getElementById("submit-btn");

// yelp api fetch and render on page
let searchYelpApi = function(event) {
    event.preventDefault();
    console.log(event);

    let cityInput = JSON.parse(localStorage.getItem("city"));   

    let foodInput = foodSearch.value;
    console.log(foodInput);
    foodSearch = "";

    let yelpApiKey = 'zjzCcRjFdB51w-cAx9BNvLkPUrZv7SxLzuEioFbVaIUNUvoYM8sekjD5xJUyqYlkA77que94UbQG8U5dv6OQprKQn_v-mRGul4UX0LUo5RULjXPqHWoKTeug5GSVYnYx';

    let proxyUrl = 'https://cors-anywhere.herokuapp.com/';

    let yelpQueryUrl = `https://api.yelp.com/v3/businesses/search?location=${cityInput}&term=${foodInput}`;
    
    //appending fetch headers for api request for cors-anywhere to work
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
            return response.json();
        })
        .then(function(data) {
            
            let cardInfo = data.businesses;
                
            for(let i = 0; i < cardInfo.length; i++) {
                let element = cardInfo[i];

                let restaurantName = element.name;
                let phone = element.phone;
                let rating = element.rating;
                let price = element.price;
                let location = element.location.address1;
                let image = element.image_url;
                let urlLink = element.url;

                console.log(restaurantName, phone, rating, price, location, image);
               
                foodSearchResultsEl.setAttribute("class", "food-class-div");
                let yelpDiv = document.createElement('div');
                yelpDiv.setAttribute("style", "border: 1px solid black");               
                yelpDiv.setAttribute("class", "yelp-div");

                let restaurantNameEl = document.createElement("h4");
                restaurantNameEl.textContent = restaurantName;  
                
                let locationEl = document.createElement("p");
                locationEl.setAttribute("class", "address");
                locationEl.textContent = "Location: " + location;

                let ratingEl = document.createElement("p");
                ratingEl.textContent = "Rating: " + rating;

                let priceEl = document.createElement("p");
                priceEl.textContent = "Price: " + price;
                if (price === undefined){
                    priceEl.textContent = "";
                }                  
                
                let phoneEl = document.createElement("h6");
                phoneEl.setAttribute("class", "phone");
                phoneEl.textContent = "Contact: " + phone;
                // phoneEl.href = (phone);
            
                let imageEl = document.createElement("img");
                imageEl.setAttribute("class", "yelp-image");
                imageEl.setAttribute("src", image);
                imageEl.setAttribute("style", "width: 50%; height: 50%;"); 
                imageEl.alt = "photo of restaurant logo or a food dish";

                let urlEl = document.createElement("a");
                urlEl.setAttribute("target", "_blank");
                let text = document.createTextNode("Click here for more information ");
                urlEl.append(text);
                urlEl.href = (urlLink);
                
                yelpDiv.append(restaurantNameEl, ratingEl, priceEl, urlEl, locationEl, phoneEl, imageEl);
                foodSearchResultsEl.append(yelpDiv);
            }
        });
}
 
searchBtn.addEventListener("click", searchYelpApi);       
        




