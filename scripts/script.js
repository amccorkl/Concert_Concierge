//search for events
let testCity = "Denver";
let cityName = "";
let eventType = "music";
let eventTypeArr = ["Sports", "Music", "Arts & Theater", "Film", "Miscellaneous"];
const ticketMasterApiKey = "n98GKJ3ZAswvAkjGcvK9zMAoAj0ppMD8";


function userChoices() {

    let ticketMasterRequestUrl = `https://app.ticketmaster.com/discovery/v2/events.json?size=5&city=${testCity}&classificationName=${eventType}&sort=date,name,asc&includeSpellcheck&apikey=${ticketMasterApiKey}`

    fetch(ticketMasterRequestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            //this is where we'll add our code to show up on the UI
        })
        .catch((error) => {
            console.log(error);
            alert("Please check your spelling");
        });
}

userChoices();
