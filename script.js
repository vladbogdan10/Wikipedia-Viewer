var loadMore;
var userInput;

function getJSONP() {
    //Create a SCRIPT element.
    var script = document.createElement('script');

    //Set the Type.
    script.type = 'text/javascript';

    //Set the source to the URL the JSON Service.
    script.src = 'https://en.wikipedia.org/w/api.php?action=query&format=json&generator=search&prop=extracts|info&exintro&exsentences=1&exlimit=max&formatversion=2&inprop=url&callback=jsonData&gsroffset=' + loadMore + '&gsrsearch=' + userInput;

    //Append the script element to the HEAD section.
    document.getElementsByTagName('head')[0].appendChild(script);
};


// Callback function to manipulate data recived from API call
function jsonData(data) {
    
    data.query.pages.forEach(function (el) {

        var wikiContent = '<a href=" ' + el.fullurl + ' " target="_blank"><div class="wiki-content" id="card-' + el + '"><h4>' + el.title + '</h4>' + el.extract + '..' + '</div></a>';

        document.querySelector('#search-results').innerHTML += wikiContent;
    });
    
    if (data.hasOwnProperty("continue")) {
        
        document.querySelector('.moreBtn').style.display = 'block';
        
        loadMore = data.continue.gsroffset;
    } 
};


function DOMControl() {
    
    userInput = document.querySelector('.input-field').value;
    
    if (userInput !== '') {
        
        getJSONP();

        document.querySelector('.wrapper').classList.add('move-input-up');

        document.getElementsByTagName("h1")[0].style.display = "none";

        document.querySelector('#search-results').innerHTML = "";
    }
    document.querySelector('.input-field').value = "";
};


function setupEventListeners() {
    
    document.querySelector('.submit').addEventListener('click', function () {
        DOMControl();
    });

    document.addEventListener('keypress', function (event) {
        if (event.keyCode === 13 || event.which === 13) {
            DOMControl();
        }
    });
    
    document.querySelector('.moreBtn').addEventListener('click', function() {
        getJSONP();
    });
};

setupEventListeners();
