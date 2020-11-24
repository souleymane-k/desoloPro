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
         `
          <div>
          <img src="${responseJson.news[i].image}" alt="${name}">
          <div id="title"><p> ${responseJson.news[i].title}.</p> </div>
          <div><p>  ${responseJson.news[i].description}</p></div> 
          <p class="detailsClick"> <a href="${responseJson.news[i].url}" target="_blank">More Infos</a></p>
           </div>
           <hr>
           `
        )
   };

    $('#results').removeClass('hidden');
}
/**  Function -News and the query parasms and the fetch-- ------------------- */
function getLatestNews(fr){
    const parasms = {
        language:fr, 
        apiKey:apikey,
           
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
        //  const maxResults = $('#js-max-results').val();
         getLatestNews(searchTerm);
        
    
      });
}
    $(watchForm);

    
       
       
 
