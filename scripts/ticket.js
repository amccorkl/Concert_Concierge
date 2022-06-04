const ticketmasterEl = document.getElementById("ticketmaster-search");
let searchForm = document.getElementById("city-search-form");
let citySearchBtn = document.getElementById("city-submit-btn");
//search for events
let testCity = "Denver";
let cityName = document.getElementById("city-name");
let date = document.getElementById("date");
//event genre 
let eventClassification = "Music";
let segmentClassification = document.getElementById("submit-btn");

const ticketMasterApiKey = "n98GKJ3ZAswvAkjGcvK9zMAoAj0ppMD8";


//creates the buttons for the classifications search

// var activityList = ["Music", "Sports", "Film"];
// var activityBox = document.getElementById("activity-btns");
// activityList.forEach(function(activity) {
//     var btn = document.createElement('button');
//     btn.textContent = activity;
//     btn.setAttribute("value", activity);
//     btn.onclick=function() {
//         console.log(this.value);
//     }
//     document.getElementById("activity-btns").appendChild(btn);
// })


let ticketMasterSearch = function (event) {
    event.preventDefault();
    console.log(event);
    
    let cityInput = cityName.value;
    console.log(cityInput);
    cityName.value = "";

    let dateInput = date.value;
    //use moment to reformat
    let dateInputFormat = moment(dateInput, "MMMM Do, YYYY").format("YYYY-MMMM-Do")
    // eventTime = moment(eventTime, "HH:mm").format("hh:mm A");
    console.log(dateInput);
    date.value = "";
    // let segClassificationInput = segmentClassification.value; 
    
    
    let ticketMasterRequestUrl = `https://app.ticketmaster.com/discovery/v2/events.json?city=${cityInput}&classificationName=${eventClassification}&radius=30&sort=date,name,asc&includeSpellcheck&apikey=${ticketMasterApiKey}`
    // &size=5& // 
    //&classificationName${Music...}
    //&startDateTime=${dateInput}

    
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
                let segmentName = event.classifications[0].segment.name;
                let descript = event.description;
                let eventImages = event.images[0].url; 
                let eventUrl = event.url; 
                let eventVenue = event._embedded.venues[0].name;               
                
                console.log("event: ", eventName, "image: ", eventImages,  "date: ", eventDate, "time: ", eventTime,  "event description: ", descript, "link: ", eventUrl, "venue: ", eventVenue, "segment name: ", segmentName);
                
                //get the UI element that the ticketMaster info will go into
                let ticketMasterDiv = document.createElement('div');
                let eventTitle = document.createElement('h4');
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
                if(!descript) {
                    descriptionEl.textContent = "";
                } else descriptionEl.textContent = descript;
                venueEl.textContent = "Held at the "  + eventVenue;

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
        // .catch((error) => {
        //     console.log(error);
        //     alert("Please check your city spelling");
        // });
}

citySearchBtn.addEventListener("click", ticketMasterSearch);



$(document).ready(function () {
    $('.datepicker').datepicker({
        yearRange: 1
    });
    
});

