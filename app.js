'use strict'

const apiKey = "mhd6khkqia4mioee6q0y7gdw"
const searchURL = "https://openapi.etsy.com/v2/listings/active"

function  formatQueryParasms(parasms){
    const queryItems =Object.keys(parasms)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(parasms[key])}`)
    return queryItems.join('&');
}

function getInfos(query, title, description, listing_id, state, limit){
       const parasms ={
           api_key:apiKey,
           q: query,limit,
           fields:title,description,listing_id,state,
        
        };

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
     .then(responseJson => console.log(responseJson))
     .catch(err => {
         $('#js-error-message').text(`Something went wrong: ${err.message}`);
     });

};



function watchForm(){
$('form').submit(event => {
    event.preventDefault();
     const searchTerm = $('#js-search-term').val();
     const maxResults = $('#js-max-results').val();
    getInfos(searchTerm, maxResults);
    

  });
}
$(watchForm);




 
