const ticketmasterEl = document.getElementById("ticketmaster-search");
//search for events
let testCity = "Denver";
let cityName = document.getElementById("city-name");
let musicChoice = document.getElementById("band-name");

//can't get the event genre to work yet
let eventClassification = "Music";
let eventTypeArr = ["Sports", "Music", "Arts & Theater", "Film", "Miscellaneous"];
const ticketMasterApiKey = "n98GKJ3ZAswvAkjGcvK9zMAoAj0ppMD8";


let ticketMasterSearch = function userChoices() {
    
    //the "events" parameter allows for a search by location, date, availability" not sure if we should include a calendar before asking for the user to input a city name

    let cityInput = cityName.value;
    // let bandInput = musicChoice.value;
    
    let ticketMasterRequestUrl = `https://app.ticketmaster.com/discovery/v2/events.json?city=${testCity}&keyword=${eventClassification}&radius=30&sort=date,name,asc&includeSpellcheck&apikey=${ticketMasterApiKey}`
    // &size=5
    //${segmentName} - eventTypeArr

    
    fetch(ticketMasterRequestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            

            //shorted variable for the info so I don't have to type it all out every time
            let eventList = data._embedded.events;

            for (let i = 0; i < eventList.length; i++) {

                let event = eventList[i];
                let eventName = event.name;               
                let eventDate = event.dates.start.localDate;
                eventDate = moment(eventDate, "YYYY-MM-DD").format("MMMM Do, YYYY");
                let eventTime = event.dates.start.localTime;
                eventTime = moment(eventTime, "HH:mm").format("hh:mm A");
                //type of event
                // let segmentName = event.classifications[0].segment.name;
                let descript = event.desription;
                let eventImages = event.images[0].url; 
                let eventUrl = event.url; //doesn't link yet
                let eventVenue = event._embedded.venues[0].name;

                // if we want user to choose what type of event to look for   
                // let genreOfEvent = event.classifications.segment.genre;
                
                
                console.log("event: ", eventName, "image: ", eventImages,  "date: ", eventDate, "time: ", eventTime,  "event description: ", descript, "link: ", eventUrl, "venue: ", eventVenue);
                
                                

                //get the UI element that the ticketMaster info will go into
                let ticketMasterDiv = document.createElement('div');
                let eventTitle = document.createElement('h3');
                // let segmentNameEl = document.createElement('p');
                let descriptionEl = document.createElement('p');
                let dateEl = document.createElement('span');  
                let timeEl = document.createElement('p')       
                let venueEl = document.createElement('p');


                ticketMasterDiv.setAttribute("style", "border: 1px solid black");
                
                
                eventTitle.textContent = eventName;
                dateEl.textContent = eventDate;
                timeEl.textContent = " Start Time: " + eventTime;    
                // segmentNameEl.textContent = segmentName;           
                descriptionEl.textContent = descript;
                venueEl.textContent = "Held at "  + eventVenue;

                //open in a new tab??
                let urlEl = document.createElement('a');
                let text = document.createTextNode("  Click here for more information and tickets");
                urlEl.append(text);
                // eventUrl.addEventListener("click", () => {
                //     Object.assign()
                // })
                urlEl.href = (eventUrl);
                              

                let imagesEl = document.createElement('img');
                imagesEl.setAttribute("src", eventImages);
                imagesEl.setAttribute("style", "width: 50%; height: 50%;");

                let pleaseNote = event.pleaseNote;
                if(pleaseNote) {
                    //pleaseNote doesn't show up on all of them, some as undefined     
                    let pleaseNoteEl = document.createElement('p');  
                    pleaseNoteEl.textContent = pleaseNote;
                }

                ticketMasterDiv.append(eventTitle,  descriptionEl, dateEl, timeEl, pleaseNote, urlEl, venueEl, imagesEl);
                ticketmasterEl.append(ticketMasterDiv);
              
            }
        })
        .catch((error) => {
            console.log(error);
            alert("Please check your city spelling");
        });
}

ticketMasterSearch();
//open new window to show events 
// ticketMaster.addEventListener("click", {
//     window.open("url...", windowFeatures )
// });

// userChoices();

