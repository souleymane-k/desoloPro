'use strick'

const apikey = "T94milI-M0kEDXx9Stmi8fORc_GgbGcjReElzPc4odErui6e";
const searchURL = "https://api.currentsapi.services/v1/search"

function formatQueryParasms(parasms){
    const queryItems = Object.keys(parasms)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(parasms[key])}`)
    return queryItems.join('&');
}

function displayResults(responseJson){
    console.log(responseJson);
    $('#results-list').empty(); 
  for(let i=0; i<responseJson.news.length; i++){
        $('#results-list').append(
    `<li>
    <hr>
    <div id="listing">
    <div id="title"><p>TITLE : ${responseJson.news[i].title}</p> </div>
    <div id="description> <p> DESCRIPTION: ${responseJson.news[i].description}</p></div> 
    <img src="${responseJson.news[i].image}"> 
    <p>For more details click ==> <a href="${responseJson.news[i].url}"> News Link </a></p>
    </li>
    </div>
        `
      )
   };

    $('#results').removeClass('hidden');
}

function getLatestNews(query, results=15){
    const parasms = {
        q:query,results, 
        apiKey:apikey 
    }
    
    const queryString = formatQueryParasms(parasms)
    const url = searchURL+'?'+queryString;
     console.log(url);
     fetch(url)
     .then(response =>{
         if(response.ok){
             return response.json();
         }
         throw new Error(response.statusText);
     })
     .then(responseJson => displayResults(responseJson))
     .catch(err => {
         $('#js-error-message').text(`Something went wrong: ${err.message}`);
     });
}
function watchForm(){
    $('form').submit(event => {
        event.preventDefault();
         const searchTerm = $('#js-search-term').val();
         const maxResults = $('#js-max-results').val();
        getLatestNews(searchTerm, maxResults);
        
    
      });
    }
       $(watchForm);

    
       
       
 
