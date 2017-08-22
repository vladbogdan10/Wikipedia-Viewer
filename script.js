// Search Controller
var searchController = (function () {
    //'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&prop=extracts&exlimit=max&explaintext&exintro&exsentences=1&gsrsearch=eminem'
    
    //'https://en.wikipedia.org/w/api.php?format=json&action=query&list=search&srprop=snippet&srlimit=10&srsearch=eminem'

    var wikiURL = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&prop=extracts&exlimit=max&explaintext&exintro&exsentences=1&gsrsearch=eminem'

    document.querySelector('.submit').addEventListener('click', function() {
        
        function jsonp(uri) {
            return new Promise(function(resolve, reject) {
                var id = '_' + Math.round(10000 * Math.random());
                var callbackName = 'jsonp_callback_' + id;
                window[callbackName] = function(data) {
                    delete window[callbackName];
                    var ele = document.getElementById(id);
                    ele.parentNode.removeChild(ele);
                    resolve(data);
                };

                var src = uri + '&callback=' + callbackName;
                var script = document.createElement('script');
                script.src = src;
                script.id = id;
                script.addEventListener('error', reject);
                (document.getElementsByTagName('head')[0] || document.body || document.documentElement).appendChild(script);
            });
        };
        
        jsonp(wikiURL).then(function(data){
            console.log(data)
        });
        
    });
    
})();


// UI Controller
var UIController = (function () {

    // Some code

})();


// Global App Controller
var controller = (function () {

    // Some code

})(searchController, UIController);
