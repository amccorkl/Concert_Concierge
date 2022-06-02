
// Create a new yelpAPI object with your API key
let yelpRequestURL = "https://api.yelp.com/v3/businesses/search?term=food,restaurants,drink,cafes&categories=food,All&location=${testCity}" 

let yelpApiKey = 'zjzCcRjFdB51w-cAx9BNvLkPUrZv7SxLzuEioFbVaIUNUvoYM8sekjD5xJUyqYlkA77que94UbQG8U5dv6OQprKQn_v-mRGul4UX0LUo5RULjXPqHWoKTeug5GSVYnYx';


fetch(yelpRequestUrl, {
    method: 'GET',
    headers: {
        Authorization: `Bearer ${yelpApiKey}`,
    }
})