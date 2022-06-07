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
let hideShow = document.getElementById("hide-div");
let dateArr = [];

const ticketMasterApiKey = "n98GKJ3ZAswvAkjGcvK9zMAoAj0ppMD8";

function hideApiDivs() {
    
    hideShow.setAttribute("style", "display: none")

}

let ticketMasterSearch = function (event) {
    event.preventDefault();
    console.log(event);
    
    let cityInput = cityName.value;
    console.log(cityInput);
    localStorage.setItem("city", JSON.stringify(cityInput));
    cityName.value = "";

    let dateInput = date.value;
    console.log(date.value);
    let splitDate = date.value.split(",");
    console.log(splitDate);
    let beforeDate = parseInt(splitDate[0].split(" ")[1]) - 1;
    let afterDate = parseInt(splitDate[0].split(" ")[1]) + 1;
    let yesterday = splitDate[0].split(" ")[0] + " " + beforeDate + "," + splitDate[1];
    let tomorrow = splitDate[0].split(" ")[0] + " " + afterDate + "," + splitDate[1];
    console.log(yesterday, tomorrow);

    //use moment to reformat datepicker into TM's format for parsing and to possible use these to move to the next date or prior one with music events
    let dateMoment = moment(dateInput).utc().format();
    let dateMomentYesterday = moment(yesterday).utc().format();
    let dateMomenttomorrow = moment(tomorrow).utc().format();
    console.log({dateMoment});
    console.log({dateMomentYesterday, dateMomenttomorrow});
    dateArr.push(dateMomentYesterday);
    dateArr.push(dateMoment);
    dateArr.push(dateMomenttomorrow);
    localStorage.setItem("vacationDates", JSON.stringify(dateArr));
    console.log(dateArr);
    date.value = "";
        
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
                // let eventId = event.id;   

                // let eventStorage = {
                //     name: eventName,
                //     id: eventId
                // };
                
                // localStorage.setItem("eventStorage", JSON.stringify(eventStorage));           
                           
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

                let venueEl = document.createElement('p');
                venueEl.textContent = "Held at the "  + eventVenue;

                let urlEl = document.createElement('a');
                urlEl.setAttribute("target", "_blank");
                let text = document.createTextNode("  Click here for more information and tickets");
                urlEl.append(text);
                urlEl.href = (eventUrl);

                let imagesEl = document.createElement('img');
                imagesEl.setAttribute("src", eventImages);
                imagesEl.setAttribute("style", "width: 50%; height: 50%;");
                imagesEl.alt = "photo of music act";

                let iconL = document.createElement("i");
                iconL.setAttribute("class", "fa fas-save");
                iconL.setAttribute("id", "search-yesterday");
                console.log(iconL);

                ticketMasterDiv.append(eventTitle, dateEl, timeEl, urlEl, venueEl, imagesEl);
                ticketmasterEl.append(ticketMasterDiv, iconL);
                }
        }) 

}

//this causes an error, so not exactly right yet. need to get local storage for this as well with the dateArr to make it work
// document.getElementById("search-yesterday").addEventListener("click", function () {
//     ticketMasterSearch(localStorage.getItem(vacationDates));
// })

citySearchBtn.addEventListener("click", ticketMasterSearch);
citySearchBtn.addEventListener("click", function () {
    hideShow.setAttribute("style", "display:block");
})
hideApiDivs();


$(document).ready(function () {
    $('.datepicker').datepicker({
        yearRange: 1
    });
    $('.sidenav').sidenav();
    $('.parallax').parallax();

});

// get saved music event data from localStorage

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

