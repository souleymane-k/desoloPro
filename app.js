'use strick'

const apikey = "T94milI-M0kEDXx9Stmi8fORc_GgbGcjReElzPc4odErui6e";
const searchURL = "https://api.currentsapi.services/v1/latest-news"

function formatQueryParasms(parasms){
    const queryItems = Object.keys(parasms)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(parasms[key])}`)
    return queryItems.join('&');
}
/**----------Function Display--- ------------------- */

function displayResults(responseJson){
    console.log(responseJson);
    $('#results-list').empty(); 
    for(let i=0; i<responseJson.news.length; i++){
        $('#results-list').append(
         `<li>
          <div id="listing">
          <div id="title"><p>TITLE : ${responseJson.news[i].title}.</p> </div>
          <div><p>Description:  ${responseJson.news[i].description}</p></div> 
          <img src="${responseJson.news[i].image}"> 
          <p class="detailsClick">For more details click ==> <a href="${responseJson.news[i].url}" target="_blank"> News Link </a></p>
           </li>
          <hr>
           </div>
   
           `
        )
   };

    $('#results').removeClass('hidden');
}
/**  Function -News and the query parasms and the fetch-- ------------------- */
function getLatestNews(language){
    const parasms = {
        apiKey:apikey,
        q:language     
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
/**---------------Function watchform--- ------------------- */
function watchForm(){
    $('form').submit(event => {
        event.preventDefault();
         const searchTerm = $('#js-search-term').val();
         const maxResults = $('#js-max-results').val();
         getLatestNews(searchTerm, maxResults);
        
    
      });
}
    $(watchForm);

    
       
       
 
