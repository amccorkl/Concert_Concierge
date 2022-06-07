const ticketmasterEl = document.getElementById("ticketmaster-search");
// let searchSubmitBtn = document.getElementById("submit-btn");
let citySearchBtn = document.getElementById("submit-btn");
//search for events
let cityName = document.getElementById("city-name");
let date = document.getElementById("date");
//event genre 
let eventClassification = "Music";
let keyword = document.getElementById("keyword");
let savedViewsDiv = document.getElementById("saved-music-views");
// let savedMusicArr =  JSON.parse(localStorage.getItem("id")) || [];


const ticketMasterApiKey = "n98GKJ3ZAswvAkjGcvK9zMAoAj0ppMD8";

// let showSavedMusic = function(savedMusicArr) {
//     for(let i = 0; i < savedMusicArr.length; i++) {
//         let musicGroup = savedMusicArr[i];
//         console.log(musicGroup);
        
//     //create a button for each event viewed
//     let musicGroupBtn = document.createElement("button");
//     musicGroupBtn.setAttribute("class", "music-btn");
//     musicGroupBtn.setAttribute("value", musicGroup);
//     musicGroupBtn.textContent = musicGroup;

//     savedViewsDiv.append(musicGroupBtn);

//         musicGroupBtn.addEventListener("click", function() {
//             console.log(this);
//             ticketMasterSearch(this.value);
//         })

//     }
// }

let ticketMasterSearch = function (event) {
    event.preventDefault();
    console.log(event);
    
    let cityInput = cityName.value;
    console.log(cityInput);
    localStorage.setItem("city", JSON.stringify(cityInput));
    cityName.value = "";

    let dateInput = date.value;
    //use moment to reformat datepicker into TM's format for parsing
    let dateMoment = moment(dateInput).utc().format();
    console.log({dateMoment});
    date.value = "";

    // let keywordInput = keyword.value;
    // if (keywordInput) {
    //     keywordInput = `&keyword${keywordInput}`;
    //     console.log(keywordInput);
    // }
        
    let ticketMasterRequestUrl = `https://app.ticketmaster.com/discovery/v2/events.json?city=${cityInput}&classificationName=${eventClassification}&startDateTime=${dateMoment}&radius=30&sort=date,name,asc&includeSpellcheck&apikey=${ticketMasterApiKey}`
    console.log(ticketMasterRequestUrl);
    //${keywordInput}
 
    
    fetch(ticketMasterRequestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            // showSavedMusic(data);
            
            let ticketMasterEl = document.createElement('div');

    
            //shorted api variable for the info  
            let eventList = data._embedded.events;

            for (let i = 0; i < eventList.length; i++) {

                let event = eventList[i];
                let eventName = event.name;               
                let eventDate = event.dates.start.localDate;
                eventDate = moment(eventDate, "YYYY-MM-DD").format("MMMM Do, YYYY");
                let eventTime = event.dates.start.localTime;
                eventTime = moment(eventTime, "HH:mm").format("hh:mm A");         
                let eventImages = event.images[0].url; 
                let eventUrl = event.url; 
                let eventVenue = event._embedded.venues[0].name;
                let id = event.id;   
                let eventId = localStorage.setItem("id", id);           
                
                console.log("event: ", eventName, "image: ", eventImages,  "date: ", eventDate, "time: ", eventTime,  "event",  "link: ", eventUrl, "venue: ", eventVenue, "id: ", eventId);
                
                //get the UI element that the ticketMaster info will go into
                let ticketMasterDiv = document.createElement('div');
                ticketMasterDiv.setAttribute("style", "border: 1px solid black");
                ticketMasterDiv.setAttribute("class", "tm-div");
                

                let eventTitle = document.createElement('h4');
                eventTitle.textContent = eventName;
                eventTitle.setAttribute("class", "music-group");              
                                
                let dateEl = document.createElement('span');  
                dateEl.textContent = eventDate;
                
                let timeEl = document.createElement('p'); 
                timeEl.textContent = " Start Time: " + eventTime;    
                
                // let pleaseNoteEl = document.createElement('p');
                // let pleaseNote = event.pleaseNote;
                // pleaseNoteEl.textContent = pleaseNote;               

                let venueEl = document.createElement('p');
                venueEl.textContent = "Held at the "  + eventVenue;

                let urlEl = document.createElement('a');
                let text = document.createTextNode("  Click here for more information and tickets");
                urlEl.append(text);
                urlEl.href = (eventUrl);


                let imagesEl = document.createElement('img');
                imagesEl.setAttribute("src", eventImages);
                imagesEl.setAttribute("style", "width: 50%; height: 50%;");
                imagesEl.alt = "photo of music act";

                ticketMasterDiv.append(eventTitle, dateEl, timeEl, urlEl, venueEl, imagesEl);
                ticketmasterEl.append(ticketMasterDiv);
                }
        }) 
}

// let saveMusicViews = function(id) {
//     let ticketMasterRequestUrl = `https://app.ticketmaster.com/discovery/v2/events?attractionId=${id}&apikey=${ticketMasterApiKey}`
//     console.log(ticketMasterRequestUrl);
//     fetch(ticketMasterRequestUrl)
//     .then(function(response) {
//         return response.json();
//     })
//     .then(function(data) {
//         showSavedMusic(data);
//         console.log(data);
//     })
//     .catch((error) => {
//         console.log(error);
//     });
    
// }



citySearchBtn.addEventListener("click", ticketMasterSearch);

<<<<<<< HEAD
=======



>>>>>>> e324d9b22953ed28578019d107037a273d6d424a
$(document).ready(function () {
    $('.datepicker').datepicker({
        yearRange: 1
    });
    $('.sidenav').sidenav();
    $('.parallax').parallax();

});

