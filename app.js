'use strick'

const apikey = "5cf9dfd5-3449-485e-b5ae-70a60e997864";
const searchURL = "https://api.covid19api.com/summary"

function formatQueryParasms(parasms){
    const queryItems = Object.keys(parasms)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(parasms[key])}`)
    return queryItems.join('&');
}

/*function displayResults(responseJson){
    console.log(responseJson);
    $('#results-list').empty();
    
  for(let i=0; i<responseJson.Similar.Results.length; i++){
        $('#results-list').append(
    `<li class="colorKo">
    <hr>
         <div id="type">
         <p> Name and Type</p>
         <p>${responseJson.Similar.Results[i].Name}</p>
         <p>${responseJson.Similar.Results[i].Type}</p>
          </div>
          <div id="description">
         <p>${responseJson.Similar.Results[i].wTeaser}</p>
         </div>
         <div id="link">
         <div> Wikepedia and YouTube Links </div>
         <a href="${responseJson.Similar.Results[i].wUrl}">Wikepedia</a> <br> 
         <a href="${responseJson.Similar.Results[i].yUrl}">YouTube Video</a>
         </div>
    </li>
        `
      )
   };

    $('#results').removeClass('hidden');
}*/

function getInfos(query,limit){
    const parasms = {
        api_key:apikey,
        q:query,limit,
        
        
        
    }
    

    const queryString = formatQueryParasms(parasms)
    const url = searchURL+'?'+queryString;
     console.log(url);
     fetch('https://api.covid19api.com/summary?X-Access-Token=5cf9dfd5-3449-485e-b5ae-70a60e997864')
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
}
function watchForm(){
    $('form').submit(event => {
        event.preventDefault();
         const searchTerm = $('#js-search-term').val();
         const maxResults = $('#js-max-results').val();
        getInfos(searchTerm, maxResults);
        
    
      });
    }
       $(watchForm);
