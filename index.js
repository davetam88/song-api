'use strict';

function displayResults(responseJson) {
  console.log('responseJson :>> ', responseJson); // dbg.
  $('#results').empty();

//no-lyrics-msg {
  let res = responseJson.lyrics;
  let strlen = res.length;
  if(strlen == 0) 
	  res = "<p>API responsed with repsonse code of 200(ok), but the lyrics is not there, seems to work if you try other selection</p>";
  
  let htmlCode = `
  <h1> Lyric </h1> 
<p> ${res} </p>
  `;
  
  $('#results').append(htmlCode);
  $('#results').removeClass('hidden');
}

function getLyrics() {
//  let artist = $('.js-query-artist').val();
//  let title = $('.js-query-title').val();
  let both = $('#js-both').val();
  let res = both.split("--");
  let artist = encodeURIComponent(res[0]);
  let title = encodeURIComponent(res[1]);
  let url = "https://api.lyrics.ovh/v1/" + artist + "/" + title;



  fetch(url).
    then(response => {
      if (response.ok)
      {
     const contentType = response.headers.get('content-type');
	  return response.json();
      }
      let errmsg = response.statusText;
      throw new Error(errmsg);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
    })
}


function watchForm() {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    getLyrics();
  })
}

$(watchForm);

