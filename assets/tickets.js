//search for events
let testCity = "Denver";
let cityName = "";
let eventType = "music";
let eventTypeArr = ["Sports", "Music", "Arts & Theater", "Film", "Miscellaneous"];
const ticketMasterApiKey = "n98GKJ3ZAswvAkjGcvK9zMAoAj0ppMD8";


const ticketmasterEl = document.getElementById("ticketmaster");
//search for events
let testCity = "Denver";
let cityName = "";

//can't get the event genre to work yet
let eventGenre = "Music";
let eventTypeArr = ["Sports", "Music", "Arts & Theater", "Film", "Miscellaneous"];
const ticketMasterApiKey = "n98GKJ3ZAswvAkjGcvK9zMAoAj0ppMD8";


function userChoices() {
    //the "events" parameter allows for a search by location, date, availability" not sure if we should include a calendar before asking for the user to input a city name

    cityName = cityName.trim();
    
    let ticketMasterRequestUrl = `https://app.ticketmaster.com/discovery/v2/events.json?city=${testCity}&size=5&sort=date,name,asc&includeSpellcheck&apikey=${ticketMasterApiKey}`

    fetch(ticketMasterRequestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            
            //shorted variable for the info so I don't have to type it all out every time
            let events = data._embedded.events

            for (let i = 0; i < events.length; i++) {
                let listOfEvents = events[i];
                let eventName = listOfEvents.name;               
                let eventDate = listOfEvents.dates.start.localDate;
                //added moment()connection here once link is in
                // eventDate = moment("YYYY-MM-DD").format("MMMM Do, YYYY");
                // let eventTime = listOfEvents.dates.localTime;
               
                let eventImages = listOfEvents.images[0].url; //image not showing up yet on UI
                let eventUrl = listOfEvents.url; //doesn't link yet
                // let description = listOfEvents.description; - it is a really long description

                console.log(eventName, eventDate, eventImages, eventUrl);
                                

                //get the UI element that the ticketMaster info will go into
                let ticketMasterDiv = document.createElement('div');
                let eventTitle = document.createElement('h3');
                let dateEl = document.createElement('p');
                // let timeEl = document.createElement('p');
                let imagesEl = document.createElement('img');
                let buyNow = document.createElement('h5');
                let urlEl = document.createElement('a');

                eventTitle.textContent = eventName;
                dateEl.textContent = eventDate;
                // timeEl.textContent = eventTime;
                imagesEl.setAttribute("src", eventImages);
                imagesEl.setAttribute("style", "width: 50%; height: 50%;");
                buyNow.textContent = "Click on the link below to purchase tickets!";
                urlEl.textContent = eventUrl;
                urlEl.setAttribute("src", eventUrl);
                console.log(eventUrl);

                ticketMasterDiv.append(eventTitle, dateEl, imagesEl, buyNow, urlEl);
                ticketmasterEl.append(ticketMasterDiv);
                

                
            }
        })
        .catch((error) => {
            console.log(error);
            alert("Please check your city spelling");
        });
}

userChoices();
