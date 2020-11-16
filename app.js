'use strick'

const apikey = "T94milI-M0kEDXx9Stmi8fORc_GgbGcjReElzPc4odErui6e";
const searchURL = "https://api.currentsapi.services/v1/search"

function formatQueryParasms(parasms){
    const queryItems = Object.keys(parasms)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(parasms[key])}`)
    return queryItems.join('&');
}

function displayResults(responseJson){
    console.log(responseJson.news.length);
    $('#results-list').empty(); 
  for(let i=0; i<responseJson.news.length; i++){
        $('#results-list').append(
    `<li>
       
         <p>${responseJson.news[i].title}</p>
         <p>${responseJson.news[i].author}</p>  
         <p>${responseJson.news[i].description}</p>     
         
    </li>
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

    //    <p>${responseJson.news[i].title}</p>
    //    <p>${responseJson.news[i].description}</p>
        
    //    <p>${responseJson.news[i].author}</p>
       
       
    //    <div> Wikepedia and YouTube Links </div>
    //    <img src="${responseJson.news[i].image}" class="results-img">
    //    <a href="${responseJson.news[i].url}">Wikepedia</a> <br> 
